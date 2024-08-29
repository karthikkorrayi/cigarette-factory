require('globalthis').shim();
require('abortcontroller-polyfill/dist/abortcontroller-polyfill-only');
const tl = require('azure-pipelines-task-lib/task');
const { StorageManagementClient } = require('@azure/arm-storage');
const msRestNodeAuth = require('@azure/ms-rest-nodeauth');

async function run() {
    try {
        const azureSubscriptionEndpoint = tl.getInput('azureSubscriptionEndpoint', true) || '';
        const subscriptionId = tl.getEndpointDataParameter(azureSubscriptionEndpoint, 'subscriptionId', true) || '';
        const clientId = tl.getEndpointAuthorizationParameter(azureSubscriptionEndpoint, 'serviceprincipalid', false) || '';
        const secret = tl.getEndpointAuthorizationParameter(azureSubscriptionEndpoint, 'serviceprincipalkey', false) || '';
        const tenantId = tl.getEndpointAuthorizationParameter(azureSubscriptionEndpoint, 'tenantid', false) || '';
        const resourceGroupName = tl.getInput('resourceGroupName', true) || '';
        const storageAccountName = tl.getInput('storageAccountName', true) || '';

        const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(clientId, secret, tenantId);
        const client = new StorageManagementClient(creds, subscriptionId);

        const accountCheck = await client.storageAccounts.checkNameAvailability({
            name: storageAccountName,
            type: 'Microsoft.Storage/storageAccounts'
        });

        if (accountCheck.nameAvailable) {
            const storageParameters = {
                location: "Southeast Asia",
                sku: { name: 'Standard_LRS' },
                kind: 'StorageV2'
            };

            const result = await client.storageAccounts.beginCreateAndWait(resourceGroupName, storageAccountName, storageParameters);
            console.log(`Storage account ${storageAccountName} created successfully!`);
        } else {
            console.log(`Storage account named ${storageAccountName} already exists.`);
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

run();
