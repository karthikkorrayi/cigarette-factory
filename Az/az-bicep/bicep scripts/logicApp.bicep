// Define the resource group location
param location string = resourceGroup().location

// Define the Logic App name
param logicAppName string = '1422mylogicapp'

// Define the storage account for Logic App
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: '${logicAppName}storage'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

// Define the Logic App
resource logicApp 'Microsoft.Logic/workflows@2019-05-01' = {
  name: logicAppName
  location: location
  properties: {
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      'contentVersion': '1.0.0.0'
    }
    parameters: {}
    // Remove the sku property to use the consumption-based workflow
  }
}

// Output the Logic App ID
output logicAppId string = logicApp.id
