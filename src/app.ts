import * as bodyParser from "body-parser";
import "class-transformer";
import * as cors from "cors";
import { EmailProviderSMTP } from "./db-layer/implementations/EmailProviderSMTP";
// import { MongoDBManager } from "db-layer/implementations/implementations/MongoDBManager";
import * as express from "express";
import * as expressWinston from "express-winston";
import * as expressWs from 'express-ws';
import "reflect-metadata"; // this is required
import { useExpressServer } from "routing-controllers";
import * as winston from "winston";
import { Config } from "./config/Config";
import { DBManagerFactory } from "./db-layer/DataAccessLayerFactory";
import { MongoBusinessDBManager } from "./db-layer/implementations/ecommerce/MongoBusinessDBManager";
import { MongoCategoryDBManager } from "./db-layer/implementations/ecommerce/MongoCategoryDBManager";
import { MongoNotificationDBManager } from "./db-layer/implementations/ecommerce/MongoNotificationDBManager";
import { MongoOrderDBManager } from "./db-layer/implementations/ecommerce/MongoOrderDBManager";
import { MongoProductRatingReviewDBManager } from "./db-layer/implementations/ecommerce/MongoProductRatingReviewDBManager";
import { MongoProductsDBManager } from "./db-layer/implementations/ecommerce/MongoProductsDBManager";
import { MongoUserDeliveryAddressDBManager } from "./db-layer/implementations/ecommerce/MongoUserAddressDBManager";
import { MongoUserWishListDBManager } from "./db-layer/implementations/ecommerce/MongoUserWishListDBManager";
import { MongoDBManager } from "./db-layer/implementations/implementations/MongoDBManager";
import { MongoCountryDBManager } from "./db-layer/implementations/MongoCountryDBManager";
import { MongoPaymentDBManager } from "./db-layer/implementations/MongoPaymentDBManager";
import { MongoTinyUrlDBManager } from "./db-layer/implementations/MongoTinyUrlDBManager";
import { PaymentProviderRazorPay } from "./db-layer/implementations/PaymentProviderRazorPay";
import { SMSProvider } from "./db-layer/implementations/SMSProviderEdumarc";
import { logger } from './logs';
import { AWSS3Service } from "./service-layer/implementations/AWSS3Service";
import { BusinessService } from "./service-layer/implementations/ecommerce/BusinessService";
import { CategoryService } from "./service-layer/implementations/ecommerce/CategoryService";
import { CountryStateCityService } from "./service-layer/implementations/ecommerce/CountryStateCityService";
import { EcommerceNotificationService } from "./service-layer/implementations/ecommerce/EcommerceNotificationService";
import { ProductRatingReviewService } from "./service-layer/implementations/ecommerce/ProductRatingReviewService";
import { ProductsService } from "./service-layer/implementations/ecommerce/ProductsService";
import { PushNotificationService } from "./service-layer/implementations/ecommerce/PushNotificationService";
import { UserDeliveryAddressService } from "./service-layer/implementations/ecommerce/UserDeliveryAddressService";
import { UserOrderService } from "./service-layer/implementations/ecommerce/UserOrderService";
import { UserWishListService } from "./service-layer/implementations/ecommerce/UserWishListService";
import { InventoryStockClosingService } from "./service-layer/implementations/inventory/InventoryStockClosingService";
import { PaymentService } from "./service-layer/implementations/PaymentService";
import { ServiceFactory } from "./service-layer/ServiceFactory";
import { AuthorizationChecker } from "./web-layer/middlewares/AuthorizationChecker";
import { httpTelemetry } from './web-layer/middlewares/HttpTelemetry';
import { logRequestHandler } from "./web-layer/middlewares/LoggingRequestHandler";
import { MenuWSRoute } from "./web-layer/websocket/MenewWSRouter";
import { MongoOrderAuditLogManager } from "./db-layer/implementations/ecommerce/MongoOrderAuditLogManager";
import { OrderAuditLogService } from "./service-layer/implementations/ecommerce/OrderAuditLogService";
import { MongoECommerceCommisionSettingsManager } from "./db-layer/implementations/ecommerce/MongoECommerceCommisionSettingsManager";
import { MongoDiscountDBManager } from "./db-layer/implementations/ecommerce/MongoDiscountDBManager";
import { ECommerceCommisionSettingsService } from "./service-layer/implementations/ecommerce/ECommerceCommisionSettingsService";
import { DiscountService } from "./service-layer/implementations/ecommerce/DiscountService";
import { MongoFuelDiscountDBManager } from "./db-layer/implementations/fuel/MongoFuelDiscountDBManager";
import { FuelDiscountService } from "./service-layer/implementations/fuel/FuelDiscountService";
import { BusinessUsersService } from "./service-layer/implementations/fuel/BusinessUsersService";
import { MongoBusinessUsersDBManager } from "./db-layer/implementations/fuel/MongoBusinessUsersDBManager";

var multer = require('multer');
var forms = multer();

const upload = multer({ dest: 'uploads/xx/' }).single('avatar')


var compression = require('compression')

export class App {

  public app: express.Application;
  public appWs: expressWs.Instance;
  public menuWSRoute: MenuWSRoute = new MenuWSRoute();
  public mongoUrl: string;
  private routingControllersOptions = {};
  private publicRoutingControllersOptions = {};

  constructor() {
    logger.info('Loading server using configurations: %j', Config.getInstance());
    this.app = express();
    this.appWs = expressWs(this.app);
    this.mongoUrl = Config.getInstance().getMongoUrl();
    this.setup();
    // Once all services initialization done then bind on HTTP interface
    this.config();
  }

  private config(): void {
    // Middleware to track all http request response timings
    this.app.use(httpTelemetry());
    // compress all responses
    this.app.use(compression())
    this.app.use(cors());
    this.app.options('*', cors());

    // support application/json type post data
    // this.app.use(multer);
    // this.app.use(forms.array());
    this.app.use(bodyParser.json());
    // this.app.use(upload);

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: true }));


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }
    });
    const upload = multer({ storage })


    this.app.post('/profile', upload.single('avatar'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any

      console.log(req.file);

      res.json({ a: "a" })
    })

    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    if (Config.getInstance().isDevelopment()) {
      //winston HTTP Logger
      var requestLoggingFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' })
      );
      var requestLoggingTransport = new winston.transports.Console({
        format: requestLoggingFormat,
        handleExceptions: false,
      });

      // add logger to app
      this.app.use(expressWinston.logger({
        transports: [
          requestLoggingTransport
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
      }));

    }
    this.app.use(logRequestHandler);
    //API routers
    this.routingControllersOptions = {
      development: false,
      classTransformer: false,
      validation: {
        skipMissingProperties: false,
        whitelist: true
      },
      cors: true,
      routePrefix: "/",
      authorizationChecker: new AuthorizationChecker().check,
      currentUserChecker: new AuthorizationChecker().getCurrentUserClaims,
      defaults:
      {

        //with this option, null will return 404 by default
        nullResultCode: 404,

        //with this option, void or Promise<void> will return 204 by default 
        undefinedResultCode: 204,

        paramOptions: {
          //with this option, argument will be required by default
          required: true
        }
      },


      // controllers: [__dirname + "/web-layer/controllers/*.js", __dirname + "/web-layer/public-controller/PublicController.js"],
      // middlewares: [__dirname + "/web-layer/middlewares/*.js"]
      controllers: [__dirname + "/web-layer/controllers/*.ts", __dirname + "/web-layer/public-controller/PublicController.ts"],
      middlewares: [__dirname + "/web-layer/middlewares/*.ts"]

    }
    useExpressServer(this.app, this.routingControllersOptions);

    // this.publicRoutingControllersOptions = {
    //   development: false,
    //   classTransformer: false,
    //   validation: {
    //     skipMissingProperties: false,
    //     whitelist: true
    //   },
    //   cors: true,
    //   routePrefix: "/",
    //   authorizationChecker: new AuthorizationChecker().check,
    //   currentUserChecker: new AuthorizationChecker().getCurrentUserClaims,
    //   defaults:
    //   {

    //     //with this option, null will return 404 by default
    //     nullResultCode: 404,

    //     //with this option, void or Promise<void> will return 204 by default 
    //     undefinedResultCode: 204,

    //     paramOptions: {
    //       //with this option, argument will be required by default
    //       required: true
    //     }
    //   },



    //   controllers: [__dirname + "/web-layer/public-controller/PublicController.ts"],
    //   middlewares: [__dirname + "/web-layer/middlewares/*.ts"]
    //   // controllers: [__dirname + "/web-layer/public-controller/PublicController.js"],
    //   // middlewares: [__dirname + "/web-layer/middlewares/*.js"]
    // }
    // useExpressServer(this.app, this.publicRoutingControllersOptions);
    // websocket router  
    this.app.use('/menuws', this.menuWSRoute.routes(this.app));

  }

  public getRoutingControllersOptions() {
    return this.routingControllersOptions;
  }

  private setup(): void {

    // create singleton instance of db and connect to database before starting app
    const dbManager: MongoDBManager = new MongoDBManager(this.mongoUrl);
    dbManager.connect();

    // PubSubManagerFactory.setPubSubManager(new ServiceBusPubSubManager());
    DBManagerFactory.setBusinessUsersDBManager(new MongoBusinessUsersDBManager())
    DBManagerFactory.setCommisionSettingsDBManager(new MongoECommerceCommisionSettingsManager())
    DBManagerFactory.setOrderAuditLogDBManager(new MongoOrderAuditLogManager())
    DBManagerFactory.setCountryDBManager(new MongoCountryDBManager())
    DBManagerFactory.setTinyURLDBManager(new MongoTinyUrlDBManager())

    DBManagerFactory.setPaymentDBManager(new MongoPaymentDBManager());
    DBManagerFactory.setPaymentProvider(new PaymentProviderRazorPay());
    DBManagerFactory.setSMSprovider(new SMSProvider());
    DBManagerFactory.setBusinessDBManager(new MongoBusinessDBManager());
    DBManagerFactory.setCategoryDBManager(new MongoCategoryDBManager());
    DBManagerFactory.setProductsDBManager(new MongoProductsDBManager());
    DBManagerFactory.setProductRatingReviewDBManager(new MongoProductRatingReviewDBManager());
    DBManagerFactory.setUserDeliveryAddressDBManager(new MongoUserDeliveryAddressDBManager());
    DBManagerFactory.setOrderDBManager(new MongoOrderDBManager());
    DBManagerFactory.setUserWishListDBManager(new MongoUserWishListDBManager());
    DBManagerFactory.setDiscountDBManager(new MongoDiscountDBManager());
    DBManagerFactory.setFuelDiscountDBManager(new MongoFuelDiscountDBManager());



    DBManagerFactory.setNotificationDBManager(new MongoNotificationDBManager());
    ServiceFactory.setBusinessUsersService(new BusinessUsersService());
    ServiceFactory.setCommisionSettingsService(new ECommerceCommisionSettingsService());
    ServiceFactory.setOrderAuditLogService(new OrderAuditLogService());
    ServiceFactory.setEmailProviderSMTP(new EmailProviderSMTP());
    ServiceFactory.setCountryStateCityService(new CountryStateCityService());
    ServiceFactory.setAwsS3Service(new AWSS3Service());
    ServiceFactory.setPaymentService(new PaymentService());



    ServiceFactory.setBusinessService(new BusinessService());
    ServiceFactory.setCategoryService(new CategoryService());
    ServiceFactory.setProductsService(new ProductsService());
    ServiceFactory.setProductRatingReviewService(new ProductRatingReviewService());
    ServiceFactory.setUserDeliveryAddressService(new UserDeliveryAddressService());
    ServiceFactory.setDiscountService(new DiscountService());
    ServiceFactory.setFuelDiscountService(new FuelDiscountService());
    ServiceFactory.setUserOrderService(new UserOrderService());
    ServiceFactory.setUserWishListService(new UserWishListService());
    // DBManagerFactory.setEmailProvider(new EmailProvider()); 


    // ServiceFactory.setHostService(new HostService());

    //Services dependent on other service

    // ServiceFactory.setPaymentService(new PaymentService());


    ServiceFactory.setInventoryStockClosingService(new InventoryStockClosingService());

    ServiceFactory.setPushNotificationService(new PushNotificationService());
    ServiceFactory.setEcommerceNotificationService(new EcommerceNotificationService());

  }
}
