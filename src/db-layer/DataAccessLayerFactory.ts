
import { ISMSProvider } from "./interfaces/ISMSProvider";
import { IPaymentProvider } from "./interfaces/IPaymentProvider";
import { IPaymentDBManager } from "./interfaces/IPaymentDBManager";
import { ITinyUrlDBManager } from "./interfaces/ITinyUrlDBManager";
import { IInventoryStoreStockClosingDBManager } from "./interfaces/inventory/IInventoryStoreStockClosingDBManager";
import { IBusinessDBManager } from "./interfaces/ecommerce/IBusinessDBManager";
import { ICategoryDBManager } from "./interfaces/ecommerce/ICategoryDBManager";
import { IProductsDBManager } from "./interfaces/ecommerce/IProductsDBManager";
import { IUserDeliveryAddressDBManager } from "./interfaces/ecommerce/IUserDeliveryAddressDBManager";
import { IOrderDBManager } from "./interfaces/ecommerce/IOrderDBManager";
import { IUserWishListDBManager } from "./interfaces/ecommerce/IUserWishListDBManager";
import { IProductRatingReviewDBManager } from "./interfaces/ecommerce/IProductRatingReviewDBManager";
import { ICountryDBManager } from "./interfaces/ICountryDBManager";
import { INotificationDBManager } from "./interfaces/ecommerce/INotificationDBManager";
import { IOrderAuditLogDBManager } from "./interfaces/ecommerce/IOrderAuditLogDBManager";
import { IECommerceCommisionSettingsDBManager } from "./interfaces/ecommerce/IECommerceCommisionSettingsDBManager";
import { IDiscountDBManager } from "./interfaces/ecommerce/IDiscountDBManager";
import { IFuelDiscountDBManager } from "./interfaces/fuel/IFuelDiscountDBManager";
import { IBusinessUsersDBManager } from "./interfaces/fuel/IBusinessUsersDBManager";

export class DBManagerFactory {



    private static paymentProvider: IPaymentProvider;
    private static smsProvider: ISMSProvider;

    private static paymentDBManager: IPaymentDBManager;
    private static tinyURLDBManager: ITinyUrlDBManager;
    private static inventoryStoreStockClosingDBManager: IInventoryStoreStockClosingDBManager;





    private static businessDBManager: IBusinessDBManager;
    private static categoryDBManager: ICategoryDBManager;
    private static productsDBManager: IProductsDBManager;
    private static userDeliveryAddressDBManager: IUserDeliveryAddressDBManager;
    private static orderDBManager: IOrderDBManager;
    private static userWishListDBManager: IUserWishListDBManager;
    private static productRatingReviewDBManager: IProductRatingReviewDBManager;
    private static countryDBManager: ICountryDBManager;
    private static notificationDBManager: INotificationDBManager;
    private static orderAuditLogDBManager: IOrderAuditLogDBManager;
    private static commisionSettingsDBManager: IECommerceCommisionSettingsDBManager;
    private static discountDBManager: IDiscountDBManager;
    private static fuelDiscountDBManager: IFuelDiscountDBManager;
    private static businessUsersDBManager: IBusinessUsersDBManager;

    public static getBusinessUsersDBManager(): IBusinessUsersDBManager {
        return this.businessUsersDBManager;
    }

    public static setBusinessUsersDBManager(businessUsersDBManager: IBusinessUsersDBManager): void {
        this.businessUsersDBManager = businessUsersDBManager;
    }


    public static getFuelDiscountDBManager(): IFuelDiscountDBManager {
        return this.fuelDiscountDBManager;
    }

    public static setFuelDiscountDBManager(fuelDiscountDBManager: IFuelDiscountDBManager): void {
        this.fuelDiscountDBManager = fuelDiscountDBManager;
    }


    public static getDiscountDBManager(): IDiscountDBManager {
        return this.discountDBManager;
    }

    public static setDiscountDBManager(discountDBManager: IDiscountDBManager): void {
        this.discountDBManager = discountDBManager;
    }


    public static getCommisionSettingsDBManager(): IECommerceCommisionSettingsDBManager {
        return this.commisionSettingsDBManager;
    }

    public static setCommisionSettingsDBManager(commisionSettingsDBManager: IECommerceCommisionSettingsDBManager): void {
        this.commisionSettingsDBManager = commisionSettingsDBManager;
    }


    public static getOrderAuditLogDBManager(): IOrderAuditLogDBManager {
        return this.orderAuditLogDBManager;
    }

    public static setOrderAuditLogDBManager(orderAuditLogDBManager: IOrderAuditLogDBManager): void {
        this.orderAuditLogDBManager = orderAuditLogDBManager;
    }


    public static getNotificationDBManager(): INotificationDBManager {
        return this.notificationDBManager;
    }

    public static setNotificationDBManager(notificationDBManager: INotificationDBManager): void {
        this.notificationDBManager = notificationDBManager;
    }


    public static getCountryDBManager(): ICountryDBManager {
        return this.countryDBManager;
    }

    public static setCountryDBManager(countryDBManager: ICountryDBManager): void {
        this.countryDBManager = countryDBManager;
    }


    public static getProductRatingReviewDBManager(): IProductRatingReviewDBManager {
        return this.productRatingReviewDBManager;
    }

    public static setProductRatingReviewDBManager(productRatingReviewDBManager: IProductRatingReviewDBManager): void {
        this.productRatingReviewDBManager = productRatingReviewDBManager;
    }


    public static getUserWishListDBManager(): IUserWishListDBManager {
        return this.userWishListDBManager;
    }

    public static setUserWishListDBManager(userWishListDBManager: IUserWishListDBManager): void {
        this.userWishListDBManager = userWishListDBManager;
    }


    public static getOrderDBManager(): IOrderDBManager {
        return this.orderDBManager;
    }

    public static setOrderDBManager(orderDBManager: IOrderDBManager): void {
        this.orderDBManager = orderDBManager;
    }


    public static getUserDeliveryAddressDBManager(): IUserDeliveryAddressDBManager {
        return this.userDeliveryAddressDBManager;
    }

    public static setUserDeliveryAddressDBManager(userDeliveryAddressDBManager: IUserDeliveryAddressDBManager): void {
        this.userDeliveryAddressDBManager = userDeliveryAddressDBManager;
    }


    public static getProductsDBManager(): IProductsDBManager {
        return this.productsDBManager;
    }

    public static setProductsDBManager(productsDBManager: IProductsDBManager): void {
        this.productsDBManager = productsDBManager;
    }


    public static getCategoryDBManager(): ICategoryDBManager {
        return this.categoryDBManager;
    }

    public static setCategoryDBManager(categoryDBManager: ICategoryDBManager): void {
        this.categoryDBManager = categoryDBManager;
    }


    public static getBusinessDBManager(): IBusinessDBManager {
        return this.businessDBManager;
    }

    public static setBusinessDBManager(businessDBManager: IBusinessDBManager): void {
        this.businessDBManager = businessDBManager;
    }


    public static getInventoryStoreStockClosingDBManager(): IInventoryStoreStockClosingDBManager {
        return this.inventoryStoreStockClosingDBManager;
    }

    public static setInventoryStoreStockClosingDBManager(inventoryStoreStockClosingDBManager: IInventoryStoreStockClosingDBManager): void {
        this.inventoryStoreStockClosingDBManager = inventoryStoreStockClosingDBManager;
    }




    public static getTinyURLDBManager(): ITinyUrlDBManager {
        return this.tinyURLDBManager;
    }

    public static setTinyURLDBManager(tinyURLDBManager: ITinyUrlDBManager): void {
        this.tinyURLDBManager = tinyURLDBManager;
    }



    public static getSMSProvider(): ISMSProvider {
        return DBManagerFactory.smsProvider;
    }

    public static setSMSprovider(smsProvider: ISMSProvider): void {
        DBManagerFactory.smsProvider = smsProvider;
    }


    public static getPaymentDBManager(): IPaymentDBManager {
        return DBManagerFactory.paymentDBManager;
    }

    public static setPaymentDBManager(paymentDBManager: IPaymentDBManager): void {
        DBManagerFactory.paymentDBManager = paymentDBManager;
    }

    public static getPaymentProvider(): IPaymentProvider {
        return DBManagerFactory.paymentProvider;
    }

    public static setPaymentProvider(paymentProvider: IPaymentProvider): void {
        DBManagerFactory.paymentProvider = paymentProvider;
    }

}
