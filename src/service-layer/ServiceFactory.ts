import { IEmailProviderSMTP } from "db-layer/interfaces/IEmailProviderSMTP";
import { IBusinessService } from "./interfaces/ecommerce/IBusinessService";
import { ICategoryService } from "./interfaces/ecommerce/ICategoryService";
import { ICountryStateCityService } from "./interfaces/ecommerce/ICountryStateCityService";
import { IEcommerceNotificationService } from "./interfaces/ecommerce/IEcommerceNotificationService";
import { IProductRatingReviewService } from "./interfaces/ecommerce/IProductRatingReviewService";
import { IProductsService } from "./interfaces/ecommerce/IProductsService";
import { IPushNotificationService } from "./interfaces/ecommerce/IPushNotificationService";
import { IUserDeliveryAddressService } from "./interfaces/ecommerce/IUserDeliveryAddressService";
import { IUserOrderService } from "./interfaces/ecommerce/IUserOrderService";
import { IUserWishListService } from "./interfaces/ecommerce/IUserWishListService";
import { IAuthService } from "./interfaces/IAuthService";
import { IAWSS3Service } from "./interfaces/IAWSS3Service";
import { IInventoryCostCenterService } from "./interfaces/inventory/IInventoryCostCenterService";
import { IInventoryItemService } from "./interfaces/inventory/IInventoryItemService";
import { IInventoryPurchaseOrderService } from "./interfaces/inventory/IInventoryPurchaseOrderService";
import { IInventoryRecipeService } from "./interfaces/inventory/IInventoryRecipeService";
import { IInventoryStockClosingService } from "./interfaces/inventory/IInventoryStockClosingService";
import { IInventoryStockService } from "./interfaces/inventory/IInventoryStockService";
import { IInventoryStoreService } from "./interfaces/inventory/IInventoryStoreService";
import { IInventoryVendorsService } from "./interfaces/inventory/IInventoryVendorsService";
import { IPaymentService } from "./interfaces/IPaymentService";
import { ITinyURLService } from "./interfaces/ITinyURLService";
import { IOrderAuditLogService } from "./interfaces/ecommerce/IOrderAuditLogService";
import { IECommerceCommisionSettingsService } from "./interfaces/ecommerce/IECommerceCommisionSettingsService";
import { IDiscountService } from "./interfaces/ecommerce/IDiscountService";
import { IFuelDiscountService } from "./interfaces/fuel/IFuelDiscountService";
import { IBusinessUsersService } from "./interfaces/fuel/IBusinessUsersService";
export class ServiceFactory {
    private static inventoryStoreService: IInventoryStoreService;
    private static inventoryItemService: IInventoryItemService;
    private static inventoryVendorsService: IInventoryVendorsService;
    private static inventoryRecipeService: IInventoryRecipeService;
    private static inventoryPOService: IInventoryPurchaseOrderService;
    private static inventoryStockService: IInventoryStockService;
    private static inventoryCostCenterService: IInventoryCostCenterService;
    // private static orderServiceV1: IOrderServiceV1;
    private static inventoryStockClosingService: IInventoryStockClosingService;
    private static authService: IAuthService;
    private static businessService: IBusinessService;
    private static tinyURLService: ITinyURLService;
    private static categoryService: ICategoryService;
    private static awsS3Service: IAWSS3Service;
    private static productsService: IProductsService;
    private static userDeliveryAddressService: IUserDeliveryAddressService;
    private static userOrderService: IUserOrderService;
    private static paymentService: IPaymentService;
    private static userWishListService: IUserWishListService;
    private static productRatingReviewService: IProductRatingReviewService;
    private static countryStateCityService: ICountryStateCityService;
    private static ecommerceNotificationService: IEcommerceNotificationService;
    private static pushNotificationService: IPushNotificationService;
    private static emailProviderSMTP: IEmailProviderSMTP;
    private static orderAuditLogService: IOrderAuditLogService;
    private static commisionSettingsService: IECommerceCommisionSettingsService;
    private static discountService: IDiscountService;
    private static fuelDiscountService: IFuelDiscountService;
    private static businessUsersService: IBusinessUsersService;

    public static getBusinessUsersService(): IBusinessUsersService {
        return this.businessUsersService;
    }

    public static setBusinessUsersService(businessUsersService: IBusinessUsersService): void {
        this.businessUsersService = businessUsersService;
    }


    public static getFuelDiscountService(): IFuelDiscountService {
        return this.fuelDiscountService;
    }

    public static setFuelDiscountService(fuelDiscountService: IFuelDiscountService): void {
        this.fuelDiscountService = fuelDiscountService;
    }


    public static getDiscountService(): IDiscountService {
        return this.discountService;
    }

    public static setDiscountService(discountService: IDiscountService): void {
        this.discountService = discountService;
    }


    public static getCommisionSettingsService(): IECommerceCommisionSettingsService {
        return this.commisionSettingsService;
    }

    public static setCommisionSettingsService(commisionSettingsService: IECommerceCommisionSettingsService): void {
        this.commisionSettingsService = commisionSettingsService;
    }


    public static getOrderAuditLogService(): IOrderAuditLogService {
        return this.orderAuditLogService;
    }

    public static setOrderAuditLogService(orderAuditLogService: IOrderAuditLogService): void {
        this.orderAuditLogService = orderAuditLogService;
    }


    public static getEmailProviderSMTP(): IEmailProviderSMTP {
        return this.emailProviderSMTP;
    }

    public static setEmailProviderSMTP(emailProviderSMTP: IEmailProviderSMTP): void {
        this.emailProviderSMTP = emailProviderSMTP;
    }


    public static getPushNotificationService(): IPushNotificationService {
        return this.pushNotificationService;
    }

    public static setPushNotificationService(pushNotificationService: IPushNotificationService): void {
        this.pushNotificationService = pushNotificationService;
    }


    public static getEcommerceNotificationService(): IEcommerceNotificationService {
        return this.ecommerceNotificationService;
    }

    public static setEcommerceNotificationService(ecommerceNotificationService: IEcommerceNotificationService): void {
        this.ecommerceNotificationService = ecommerceNotificationService;
    }


    public static getCountryStateCityService(): ICountryStateCityService {
        return this.countryStateCityService;
    }

    public static setCountryStateCityService(countryStateCityService: ICountryStateCityService): void {
        this.countryStateCityService = countryStateCityService;
    }


    public static getProductRatingReviewService(): IProductRatingReviewService {
        return this.productRatingReviewService;
    }

    public static setProductRatingReviewService(productRatingReviewService: IProductRatingReviewService): void {
        this.productRatingReviewService = productRatingReviewService;
    }


    public static getUserWishListService(): IUserWishListService {
        return this.userWishListService;
    }

    public static setUserWishListService(userWishListService: IUserWishListService): void {
        this.userWishListService = userWishListService;
    }

    public static getPaymentService(): IPaymentService {
        return this.paymentService;
    }

    public static setPaymentService(paymentService: IPaymentService): void {
        this.paymentService = paymentService;
    }


    public static getUserOrderService(): IUserOrderService {
        return this.userOrderService;
    }

    public static setUserOrderService(userOrderService: IUserOrderService): void {
        this.userOrderService = userOrderService;
    }


    public static getUserDeliveryAddressService(): IUserDeliveryAddressService {
        return this.userDeliveryAddressService;
    }

    public static setUserDeliveryAddressService(userDeliveryAddressService: IUserDeliveryAddressService): void {
        this.userDeliveryAddressService = userDeliveryAddressService;
    }


    public static getProductsService(): IProductsService {
        return this.productsService;
    }

    public static setProductsService(productsService: IProductsService): void {
        this.productsService = productsService;
    }


    public static getAwsS3Service(): IAWSS3Service {
        return this.awsS3Service;
    }

    public static setAwsS3Service(awsS3Service: IAWSS3Service): void {
        this.awsS3Service = awsS3Service;
    }


    public static getCategoryService(): ICategoryService {
        return this.categoryService;
    }

    public static setCategoryService(categoryService: ICategoryService): void {
        this.categoryService = categoryService;
    }


    public static getTinyURLService(): ITinyURLService {
        return this.tinyURLService;
    }

    public static setTinyURLService(tinyURLService: ITinyURLService): void {
        this.tinyURLService = tinyURLService;
    }


    public static getBusinessService(): IBusinessService {
        return this.businessService;
    }

    public static setBusinessService(businessService: IBusinessService): void {
        this.businessService = businessService;
    }


    public static getAuthService(): IAuthService {
        return this.authService;
    }

    public static setAuthService(authService: IAuthService): void {
        this.authService = authService;
    }


    public static getInventoryStockClosingService(): IInventoryStockClosingService {
        return this.inventoryStockClosingService;
    }

    public static setInventoryStockClosingService(inventoryStockClosingService: IInventoryStockClosingService): void {
        this.inventoryStockClosingService = inventoryStockClosingService;
    }


    public static getInventoryCostCenterService(): IInventoryCostCenterService {
        return this.inventoryCostCenterService;
    }

    public static setInventoryCostCenterService(inventoryCostCenterService: IInventoryCostCenterService): void {
        this.inventoryCostCenterService = inventoryCostCenterService;
    }


    public static getInventoryStockService(): IInventoryStockService {
        return this.inventoryStockService;
    }

    public static setInventoryStockService(inventoryStockService: IInventoryStockService): void {
        this.inventoryStockService = inventoryStockService;
    }

    public static getInventoryPOService(): IInventoryPurchaseOrderService {
        return this.inventoryPOService;
    }

    public static setInventoryPOService(inventoryPOService: IInventoryPurchaseOrderService): void {
        this.inventoryPOService = inventoryPOService;
    }


    public static getInventoryVendorsService(): IInventoryVendorsService {
        return this.inventoryVendorsService;
    }

    public static setInventoryVendorsService(inventoryVendorsService: IInventoryVendorsService): void {
        this.inventoryVendorsService = inventoryVendorsService;
    }

    public static getInventoryRecipeService(): IInventoryRecipeService {
        return this.inventoryRecipeService;
    }

    public static setInventoryRecipeService(inventoryRecipeService: IInventoryRecipeService): void {
        this.inventoryRecipeService = inventoryRecipeService;
    }

    public static getInventoryItemService(): IInventoryItemService {
        return ServiceFactory.inventoryItemService;
    }
    public static setInventoryItemService(inventoryItemService: IInventoryItemService): void {
        ServiceFactory.inventoryItemService = inventoryItemService;
    }

    public static getInventoryStoreService(): IInventoryStoreService {
        return ServiceFactory.inventoryStoreService;
    }
    public static setInventoryStoreService(inventoryStoreService: IInventoryStoreService): void {
        ServiceFactory.inventoryStoreService = inventoryStoreService;
    }

}
