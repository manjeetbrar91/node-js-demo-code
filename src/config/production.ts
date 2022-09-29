export const production =
{
  app:
  {
    frontEndUrl: "https://manage.example.com",
    frontEndQRUrl: "https://qr.example.com",
    tinyUrl: "manageapi.example.com",
    port: 3000,
    logLevel: 'debug',
    serviceBusUrl: "Endpoint=sb://menewprod.servicebus.windows.net/;SharedAccessKeyName=xxxxxxx.com;SharedAccessKey=4CS8Z3LYXllO9l+6HDGxpvPE01m3Z1wPY/z3ca0QZHA="
  },

  aws: {
    accessKeyId: "xxxxxxx",
    secretAccessKey: "xQ/m+UI1ZOjXZ+b4NJsauRwwnt0jTrQNuvS2GRHr",
    bucketName: "euel-test"
  },
  telemetry:
  {
    enabled: true,
    statsd:
    {
      host: "13.71.84.114",
      port: 8125
    }
  },

  mongodb:
  {
    // url: 'mongodb://xxxxxxx-prod:MeNewMongo2019@menewprod-shard-00-02-oi1lo.mongodb.net:27017,menewprod-shard-00-00-oi1lo.mongodb.net:27017,menewprod-shard-00-01-oi1lo.mongodb.net:27017/xxxxxxx?ssl=true&replicaSet=MeNewProd-shard-0&authSource=admin&retryWrites=true&w=majority'
    url: 'mongodb://xxxxxxx-prod:MeNewMongo2019@menewprod-shard-00-02-oi1lo.mongodb.net:27017,menewprod-shard-00-00-oi1lo.mongodb.net:27017,menewprod-shard-00-01-oi1lo.mongodb.net:27017/menew2?ssl=true&replicaSet=MeNewProd-shard-0&authSource=admin&retryWrites=true&w=majority'
  },
  authentication:
  {
    uuidNamespace: '1b671a64-40d5-491e-99b0-xxxxxxx.com',
    secretKey: 'xxxxxxx',
    tokenExpiryInSecs: 43200,
    customerTokenExpiryInSecs: 86400
  },
  sms: {
    transactionUrl: 'https://smsapi.xxxxxxx.com/api/v2/sendsms',
    otpUrl: 'https://smsapi.xxxxxxx.com/api/v1/sendsms',
    sender: 'DMENEW',
    otpApiKey: 'xxxxxxx.com',
    transactionApiKey: 'xxxxxxx.com',
    smsCallBackUrl: 'https://manageapi.example.com/menu/updateDeliveryStatus/'
  },
  payment:
  {
    paymentProviderKey: 'xxxxxxx.com',
    paymentProviderSecret: 'xxxxxxx.com' 
  },

  urbanPiper:
  {
    url: 'https://api.xxxxxxxcom/external/api/v1/',
    actionBaseUrl: 'https://api.xxxxxxxcom/'
  },
  google: {
    clientId: "xxxxxxx-1bjri6qljrh4j62fjrkd1a6kibsc6bf7.apps.xxxxxxx.com",
    clientSecret: "GXrjhk6k80l2yeAmX-0n28-C",
    redirectUri: 'https://manageapi.example.com/menu/googlePrinter/oauth',
  },

  dunzo:
  {
    clientId: '098147b0-0422-4400-9a08-943c90eb479e',
    clientSecret: 'f6d99626-ea03-431e-8911-ac3d2f13a53e',
    redirectUri: 'https://api.dunzo.in',
  },

  rapido: {
    apikey: 'MDrGK79KODknQoFiVAynUiS1lcRcQkye',
    redirectUri: 'https://clb.xxxxxxx.com/delivery'
  },
  
  azure: 
  {
    account: 'xxxxxxx',
    secret: 'xxxxxxx+pZ5MbWmLISYDO1TAkLdDk1MMbr8aJ1tuswQRqvcxoqqKZDFP7g==',
    rootContainer: "prod"
  },
  email: 
  {
    sendGridApi: 'SG.9HmG6dKMTU2D-cZloZWW9g.xxxxxxx',
  },
  recommendation: {
    url: 'https://cartrecommendation.axxxxxxx.com/api/v1/recommend'
  },
  ezeep:
  {
    clientId: 'xxxxxxx',
    clientSecret: 'xxxxxxx',
    redirectUri: 'https://manageapi.example.com/menu/ezeepPrinter/oauth',
    accountUrl: 'https://accountxxxxxxx.com/',
    printUrl: 'https://printapixxxxxxx.com/'
  },
  printNode:
  {
    apiKey: 'xxxxxxx',
    url: 'https://api.xxxxxxx.com/'
  }
};