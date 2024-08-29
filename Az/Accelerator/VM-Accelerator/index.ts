import { ComputeManagementClient } from "@azure/arm-compute";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { NetworkManagementClient, NetworkInterface, Subnet, PublicIPAddress } from "@azure/arm-network";
import { ClientSecretCredential } from "@azure/identity";
import * as util from "util";
import * as tl from "azure-pipelines-task-lib/task";
import * as deasync from "deasync";

// Variables to store retrieved inputs
let nicInfo: NetworkInterface | undefined;

// Retrieve task inputs
const azureSubscriptionEndpoint = tl.getInput("azureSubscriptionEndpoint", true) as string;
const resourceGroupName = tl.getInput("resourceGroupName", true) as string;
const vmName = tl.getInput("vmName", true) as string;
const vmSize = tl.getInput("vmSize", true) as string;
const adminUsername = tl.getInput("adminUsername", true) as string;
const adminPassword = tl.getInput("adminPassword", true) as string;
const confirmPassword = tl.getInput("confirmPassword", true) as string;
const nicName = tl.getInput("nicName", true) as string;
const subnetName = tl.getInput("subnetName", true) as string;
const publicIPName = tl.getInput("publicIPName", true) as string;
const vnetName = tl.getInput("vnetName", true) as string;
const osDiskName = tl.getInput("osDiskName", true) as string;
const osDiskSizeGB = tl.getInput("osDiskSizeGB", true) as string;
const osType = tl.getInput("osType", true) as string;

// Check for missing inputs
if (!resourceGroupName || !vmName || !vmSize || !adminUsername || !adminPassword || !confirmPassword || !nicName || !subnetName || !publicIPName || !vnetName || !osDiskName || !osDiskSizeGB || !osType) {
    throw new Error("One or more required inputs are missing.");
}

if (adminPassword !== confirmPassword) {
    throw new Error("Admin password and confirm password do not match.");
}

// Get service principal details from the Azure subscription endpoint
const endpointAuth = tl.getEndpointAuthorization(azureSubscriptionEndpoint, true);
if (!endpointAuth) {
    throw new Error("Failed to get endpoint authorization.");
}

const tenantId = endpointAuth.parameters["tenantid"];
const clientId = endpointAuth.parameters["serviceprincipalid"];
const secret = endpointAuth.parameters["serviceprincipalkey"];
const subscriptionId = tl.getEndpointDataParameter(azureSubscriptionEndpoint, "subscriptionId", true);

if (!tenantId || !clientId || !secret || !subscriptionId) {
    throw new Error("One or more required endpoint authorization parameters are missing.");
}

// Azure credentials using service principal
const credentials = new ClientSecretCredential(tenantId, clientId, secret);

// Azure clients for different services
const resourceClient = new ResourceManagementClient(credentials, subscriptionId);
const computeClient = new ComputeManagementClient(credentials, subscriptionId);
const storageClient = new StorageManagementClient(credentials, subscriptionId);
const networkClient = new NetworkManagementClient(credentials, subscriptionId);

// Function to create resource group
function createResourceGroup() {
    console.log("\n1. Creating resource group: " + resourceGroupName);
    const groupParameters = {
        location: "Southeast Asia",
        tags: { project: "azure-samples-create-vm" },
    };
    let done = false;
    let result;
    resourceClient.resourceGroups.createOrUpdate(resourceGroupName, groupParameters)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Function to create storage account
function createStorageAccount() {
    const storageAccountName = `${resourceGroupName.toLowerCase()}storage`.replace(/-/g, '');
    console.log("\n2. Creating storage account: " + storageAccountName);
    const createParameters = {
        location: "Southeast Asia",
        sku: { name: "Standard_LRS" },
        kind: "Storage",
        tags: { project: "azure-samples-create-vm" },
    };
    let done = false;
    let result;
    storageClient.storageAccounts.beginCreateAndWait(resourceGroupName, storageAccountName, createParameters)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Function to create virtual network
function createVnet() {
    console.log("\n3. Creating vnet: " + vnetName);
    const vnetParameters = {
        location: "Southeast Asia",
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        subnets: [{ name: subnetName, addressPrefix: "10.0.0.0/24" }],
    };
    let done = false;
    let result;
    networkClient.virtualNetworks.beginCreateOrUpdateAndWait(resourceGroupName, vnetName, vnetParameters)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Function to get subnet information
function getSubnetInfo(): Subnet {
    console.log("\nGetting subnet info for: " + subnetName);
    let done = false;
    let result: Subnet = {} as Subnet;
    networkClient.subnets.get(resourceGroupName, vnetName, subnetName)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Function to create public IP address
function createPublicIP(): PublicIPAddress {
    console.log("\n4. Creating public IP: " + publicIPName);
    const publicIPParameters = {
        location: "Southeast Asia",
        publicIPAllocationMethod: "Dynamic",
        dnsSettings: { domainNameLabel: publicIPName },
    };
    let done = false;
    let result: PublicIPAddress = {} as PublicIPAddress;
    networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(resourceGroupName, publicIPName, publicIPParameters)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Function to create network interface
function createNIC(subnetInfo: Subnet, publicIPInfo: PublicIPAddress): NetworkInterface {
    console.log("\n5. Creating Network Interface: " + nicName);
    const nicParameters = {
        location: "Southeast Asia",
        ipConfigurations: [{
            name: nicName + "-ipConfig",
            privateIPAllocationMethod: "Dynamic",
            subnet: subnetInfo,
            publicIPAddress: publicIPInfo,
        }],
    };
    let done = false;
    let result: NetworkInterface = {} as NetworkInterface;
    networkClient.networkInterfaces.beginCreateOrUpdateAndWait(resourceGroupName, nicName, nicParameters)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Function to create virtual machine
function createVirtualMachine(nicId: string) {
    const vmParameters = {
        location: "Southeast Asia",
        osProfile: {
            computerName: vmName,
            adminUsername: adminUsername,
            adminPassword: adminPassword,
        },
        hardwareProfile: { vmSize: vmSize },
        storageProfile: {
            imageReference: {
                publisher: "MicrosoftWindowsServer",
                offer: "WindowsServer",
                sku: "2019-Datacenter",
                version: "latest"
            },
            osDisk: {
                name: osDiskName,
                createOption: "FromImage",
                diskSizeGB: parseInt(osDiskSizeGB),
            },
        },
        networkProfile: {
            networkInterfaces: [{ id: nicId, primary: true }],
        },
    };
    console.log("6. Creating Virtual Machine: " + vmName);
    console.log(" VM create parameters: " + util.inspect(vmParameters, { depth: null }));
    let done = false;
    let result;
    computeClient.virtualMachines.beginCreateOrUpdateAndWait(resourceGroupName, vmName, vmParameters)
        .then(res => { result = res; done = true; })
        .catch(err => { throw err; });
    deasync.loopWhile(() => !done);
    return result;
}

// Main function to orchestrate creation process
function main() {
    try {
        createResourceGroup();
        createStorageAccount();
        createVnet();
        const subnetInfo = getSubnetInfo();
        const publicIPInfo = createPublicIP();
        nicInfo = createNIC(subnetInfo, publicIPInfo);
        if (!nicInfo || !nicInfo.id) {
            throw new Error("Failed to create Network Interface or ID is undefined.");
        }
        createVirtualMachine(nicInfo.id);
        console.log(`VM with name ${vmName} has been created.`);
    } catch (err) {
        if (err instanceof Error) {
            console.error("An error occurred:", err);
            tl.setResult(tl.TaskResult.Failed, err.message);
        } else {
            console.error("An unknown error occurred:", err);
            tl.setResult(tl.TaskResult.Failed, "Unknown error occurred");
        }
        throw err;
    }
}

// Execute the main function
main();
