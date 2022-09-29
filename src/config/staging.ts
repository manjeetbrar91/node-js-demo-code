export const staging =
{
  app:
  {
    frontEndQRUrl: "https://stagingqr.example.com",
    frontEndUrl: "https://stagingapp.example.com",
    tinyUrl: "stagingapi.example.com",
    port: 3000,
    logLevel: 'debug',
    serviceBusUrl: "Endpoint=sb://xxxxxxx-staging.servicebus.windows.net/;SharedAccessKeyName=xxxxxxx.com;SharedAccessKey=2mpweUzhYDR09K9FlqRZyvnm0/uUM+sJ9MjF6dIuDhA="
  },

  aws: {
    accessKeyId: "xxxxxxx",
    secretAccessKey: "xQ/m+UI1ZOjXZ+b4NJsauRwwnt0jTrQNuvS2GRHr",
    bucketName: "euel-test"
  },
  telemetry:
  {
    enabled: false,
    statsd:
    {
      host: "13.71.84.114",
      port: 8125
    }
  },

  mongodb:
  {
    // url: 'mongodb://xxxxxxx-staging:UpI2fD4jaj56FXbz@xxxxxxx-shard-00-00-oi1lo.mongodb.net:27017,xxxxxxx-shard-00-01-oi1lo.mongodb.net:27017,xxxxxxx-shard-00-02-oi1lo.mongodb.net:27017/menewstaging?ssl=true&replicaSet=MenewStagingAndDev-shard-0&authSource=admin&retryWrites=true&w=majority'
    url: 'mongodb://xxxxxxx-staging:UpI2fD4jaj56FXbz@xxxxxxx-shard-00-00-oi1lo.mongodb.net:27017,xxxxxxx-shard-00-01-oi1lo.mongodb.net:27017,xxxxxxx-shard-00-02-oi1lo.mongodb.net:27017/menewstaging2?ssl=true&replicaSet=MenewStagingAndDev-shard-0&authSource=admin&retryWrites=true&w=majority'
  },

  authentication:
  {
    uuidNamespace: '1b671a64-40d5-491e-99b0-xxxxxxx.com',
    secretKey: 'xxxxxxx',
    tokenExpiryInSecs: 86400,
    customerTokenExpiryInSecs: 86400
  },
  sms: {
    transactionUrl: 'https://smsapi.xxxxxxx.com/api/v2/sendsms',
    otpUrl: 'https://smsapi.xxxxxxx.com/api/v1/sendsms',
    sender: 'DMENEW',
    otpApiKey: 'xxxxxxx.com',
    transactionApiKey: 'xxxxxxx.com',
    smsCallBackUrl: 'https://stagingapi.example.com/menu/updateDeliveryStatus/'
  },
  payment:
  {
    paymentProviderKey: 'xxxxxxx.com',
    paymentProviderSecret: 'xxxxxxx.com' 
  },

  urbanPiper:
  {
    url: 'https://pos-int.xxxxxxxcom/external/api/v1/',
    actionBaseUrl: 'https://pos-int.xxxxxxxcom/'
  },

  google:
  {
    clientId: 'xxxxxxx-867v9hsdqh3mk7fpicsvmg9p1a13io37.apps.xxxxxxx.com',
    clientSecret: 'xxxxxxx.com',
    redirectUri: 'https://stagingapi.example.com/menu/googlePrinter/oauth',
  },

  dunzo:
  {
    clientId: '1f09679e-2573-4928-a870-xxxxxxx',
    clientSecret: '0b0c44a7-5f7b-41f6-8686-xxxxxxx',
    redirectUri: 'https://apis-staging.dunzo.in',
  },

  rapido: {
    apikey: 'ySX4EEb5YsLzMuOGV3LIskBcUV3zBRww',
    redirectUri: 'https://customer.xxxxxxxxxxxxxx.dev/delivery'
  },

  azure: 
  {
    account: 'xxxxxxx',
    secret: 'xxxxxxx+pZ5MbWmLISYDO1TAkLdDk1MMbr8aJ1tuswQRqvcxoqqKZDFP7g==',
    rootContainer: "staging"
  },
  email: 
  {
    sendGridApi: 'SG.9HmG6dKMTU2D-cZloZWW9g.xxxxxxx',
  },
  recommendation: {
    url: ''
  },
  ezeep:
  {
    clientId: 'xxxxxxx',
    clientSecret: 'xxxxxxx',
    redirectUri: 'https://stagingapi.example.com/menu/ezeepPrinter/oauth',
    accountUrl: 'https://accountxxxxxxx.com/',
    printUrl: 'https://printapixxxxxxx.com/'
  },
  printNode:
  {
    apiKey: 'xxxxxxx',
    url: 'https://api.xxxxxxx.com/'
  }
};
