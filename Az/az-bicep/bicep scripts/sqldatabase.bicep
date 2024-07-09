param location string = resourceGroup().location
param sqlServerName string = 'kkSqlServer'
param administratorLogin string = 'adminuser'
param administratorLoginPassword string = 'P@ssw0rd123!'

resource sqlServer 'Microsoft.Sql/servers@2021-02-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
  }
  sku: {
    name: 'S0'
    tier: 'Standard'
  }
  tags: {
    Environment: 'Dev'
    Department: 'TechCoE'
    CreatedBy: 'Korrayi Karthik'
    Region: 'ap-south-1'
    Approver: 'Swetha Yalamanchili'
  }
}

output sqlServerNameOutput string = sqlServer.name
output sqlServerIdOutput string = sqlServer.id
