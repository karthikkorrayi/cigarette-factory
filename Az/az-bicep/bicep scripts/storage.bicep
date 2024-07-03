param location string = resourceGroup().location
param storageAccountName string = 'kkazstores1422'

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

output storageAccountNameOutput string = storageAccount.name
output storageAccountIdOutput string = storageAccount.id
