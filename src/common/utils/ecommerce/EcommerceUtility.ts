import { CategoryModel } from "../../../service-layer/models/ecommerce/response/CategoryModel";
import { SubCategoryModel } from "../../../service-layer/models/ecommerce/response/SubCategoryModel";
import { BusinessBankDetails, BusinessCurrencyModel, BusinessDeliveryCharges, BusinessDeliverySettings, BusinessFuelStationModel, BusinessPaymentSettings, BusinessResponseModel, BusinessTimingModel, BusinessUPIDetails } from "../../../service-layer/models/ecommerce/response/BusinessResponseModel";
import { Utility } from "../Utility";
import { Constants } from "./Constants";
import { MyError } from "../../../common/MyError";
import { BusinessListResponseModel } from "../../../service-layer/models/ecommerce/response/BusinessListResponseModel";
import { ProductModel, ProductType } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { ProductVariantModel } from "../../../service-layer/models/ecommerce/response/ProductVariantModel";
import { UserDeliveryAddressModel } from "../../../service-layer/models/ecommerce/response/UserDeliveryAddressModel";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";
import { CategoryDiscount, CustomDiscount, CustomDiscountItems, CustomerOrderModel as UserOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";
import { OrderPaymentsModel } from "../../../service-layer/models/ecommerce/OrderPaymentsModel";
import { OrderExtraCharge } from "../../../service-layer/models/ecommerce/OrderExtraCharge";
import { OrderProductsModel } from "../../../service-layer/models/ecommerce/OrderProductsModel";
import { UserDetailsModel } from "../../../service-layer/models/ecommerce/response/UserDetailsModel";
import { UserWishListModel } from "../../../service-layer/models/ecommerce/response/UserWishListModel";
import { DBConstants } from "../../../db-layer/models/DBConstants";
import { DaysEnum } from "../../../service-layer/models/ecommerce/DaysEnum";
import { ProductRatingReviewModel } from "../../../service-layer/models/ecommerce/response/ProductRatingReviewModel";
import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";
import { OrderCreatedFrom, OrderPaymentType } from "../../../service-layer/models/ecommerce/OrderStatusEnum";
import { BusinessAvailabilityEnum } from "../../../service-layer/models/ecommerce/BusinessAvailabilityEnum";

export class EcommerceUtility extends Utility {

    public static getBusinessFuelStationModel(data: any): BusinessFuelStationModel {
        let model = new BusinessFuelStationModel();

        model.setName(data.name ? data.name : "")
        model.setLatitude(data.latitude ? data.latitude : "")
        model.setLongitude(data.longitude ? data.longitude : "")
        model.setPincode(data.pincode ? data.pincode : "")
        model.setCountry(data.country ? data.country : "")
        model.setState(data.state ? data.state : "")
        model.setDealerCode(data.dealerCode ? data.dealerCode : "")
        model.setAddress(data.address ? data.address : "")
        model.setCity(data.city ? data.city : "")
        model.setMobileNumber(data.mobileNumber ? data.mobileNumber : "")
        model.setCountryCode(data.countryCode ? data.countryCode : "")
        model.setAvailability(data.availability ? data.availability : false)
        model.setFuelStationId(data.fuelStationId ? data.fuelStationId : "")
        model.setImage(data.image ? data.image : "")
        model.setIsOpen(data.isOpen ? data.isOpen : false)
        model.setFuelCompanyName(data.fuelCompanyName ? data.fuelCompanyName : "")

        return model;

    }
    public static getBusinessListResponseModelData(data: any): BusinessListResponseModel {
        let model: BusinessListResponseModel = new BusinessListResponseModel();

        if (data.distance != undefined && isNaN(Number(data.distance)) == false) {
            model.setDistanceInKM(`${(Number(data.distance) / 1000).toFixed(2)} KM`);
        }
        model.setDistance(data.distance ? data.distance : 0);
        model.setDistance(Number(model.getDistance().toFixed()));
        model.setBusinessId(data.businessId ? data.businessId : "");
        model.setBusinessLegalName(data.businessLegalName ? data.businessLegalName : "");

        model.setBusinessName(data.businessName ? data.businessName : "");
        model.setBusinessType(data.businessType ? data.businessType : "");

        model.setCountry(data.country ? data.country : "");
        model.setStartTime(data.startTime ? data.startTime : Constants.DEFAULT_START_TIME);

        model.setEndTime(data.endTime ? data.endTime : Constants.DEFAULT_END_TIME);
        model.setAddressLine1(data.addressLine1 ? data.addressLine1 : "");
        model.setAddressLine2(data.addressLine2 ? data.addressLine2 : "");
        model.setLocality(data.locality ? data.locality : "");

        model.setState(data.state ? data.state : "");
        model.setCity(data.city ? data.city : "");
        model.setLatitude(data.latitude ? data.latitude : "");
        model.setLongitude(data.longitude ? data.longitude : "");
        model.setFuelStation(data.fuelStation ? data.fuelStation : "");
        model.setAverageRating(data.averageRating ? data.averageRating : 0);
        model.setRatingCount(data.ratingCount ? data.ratingCount : 0);
        model.setBusinessTiming(EcommerceUtility.getBusinessTimingArray(data.businessTiming));
        model.setAvailabilityStatus(data.availabilityStatus ? data.availabilityStatus : BusinessAvailabilityEnum.Open);

        if (data.fs) {
            model.setFuelStationDetails(EcommerceUtility.getBusinessFuelStationModel(data.fs))
        } else {
            model.setFuelStationDetails(null)
        }

        // model.setZipCode(data.zipCode ? data.zipCode : "");
        // model.setOwnerId(data.ownerId ? data.ownerId : "");
        // model.setPhoneNumber(data.phoneNumber ? data.phoneNumber : "");
        // model.setEmailAddress(data.emailAddress ? data.emailAddress : "");
        // model.setGstNumber(data.gstNumber ? data.gstNumber : "");
        // model.setCountryAbbreviation(data.countryAbbreviation ? data.countryAbbreviation : "");
        // model.setCountryCode(data.countryCode ? data.countryCode : "");

        // model.setPrimaryCurrency(data.primaryCurrency ? data.primaryCurrency : Constants.DEFAULT_CURRENCY);
        // model.setPrimaryCurrencySymbol(data.primaryCurrencySymbol ? data.primaryCurrencySymbol : Constants.DEFAULT_CURRENCY_SYMBOL);
        // model.setPrimaryLanguage(data.primaryLanguage ? data.primaryLanguage : Constants.DEFAULT_LANGUAGE);


        Utility.setServiceObjectProperties(model, data);
        return model;
    }
    public static getBusinessTimingArray(data: any): Array<BusinessTimingModel> {
        if (data && data[0]) {

            return EcommerceUtility.getListOfItems(data, EcommerceUtility.getBusinessTimingModel)
        } else {
            return [];
        }
    }
    public static getBusinessCurrencyModelArray(data: any): Array<BusinessCurrencyModel> {
        if (data && data[0]) {

            return EcommerceUtility.getListOfItems(data, EcommerceUtility.getBusinessCurrencyModel)
        } else {
            return [];
        }
    }

    public static getBusinessTimingModel(data: any): BusinessTimingModel {
        let model = new BusinessTimingModel();
        model.setDay(data.day ? data.day : DaysEnum.Monday);
        model.setStart(data.start ? data.start : 0);
        model.setEnd(data.end ? data.end : 0);
        model.setOpen(data.open ? data.open : false);
        model.setOpen24X7(data.open24X7 ? data.open24X7 : false);
        return model;

    }
    public static getBusinessDeliveryChargesModel(data: any): BusinessDeliveryCharges {
        let model = new BusinessDeliveryCharges();
        if (data == undefined || data == null || data.baseDistanceCharges == undefined) {
            model.initDefault();
            return model;
        }
        model.setBaseDistanceCharges(data.baseDistanceCharges ? data.baseDistanceCharges : 0)
        model.setBaseDistance(data.baseDistance ? data.baseDistance : 0)
        model.setExtraPerKM(data.extraPerKM ? data.extraPerKM : 0)
        model.setBaseWeightCharges(data.baseWeightCharges ? data.baseWeightCharges : 0)
        model.setBaseWeight(data.baseWeight ? data.baseWeight : 0)
        model.setExtraPerKG(data.extraPerKG ? data.extraPerKG : 0)


        return model;
    }
    public static getBusinessDeliverySettingsModel(data: any): BusinessDeliverySettings {
        let model = new BusinessDeliverySettings();

        model.setHomeDelivery(data && data.homeDelivery ? data.homeDelivery : false);
        model.setInCarDelivery(data && data.inCarDelivery ? data.inCarDelivery : false);
        model.setInStorePickUp(data && data.inStorePickUp ? data.inStorePickUp : false);
        model.setHomeDeliveryChargesEnabled(data && data.homeDeliveryChargesEnabled ? data.homeDeliveryChargesEnabled : false);
        if (data && data.homeDeliveryCharges) {
            model.setHomeDeliveryCharges(EcommerceUtility.getBusinessDeliveryChargesModel(data.homeDeliveryCharges));
        }

        model.setFreeHomeDelivery(data && data.freeHomeDelivery ? data.freeHomeDelivery : false);
        model.setFreeHomeDeliveryOrderAmount(data && data.freeHomeDeliveryOrderAmount ? data.freeHomeDeliveryOrderAmount : 0);
        model.setMaxHomeDevliveryDistance(data && data.maxHomeDevliveryDistance ? data.maxHomeDevliveryDistance : 0);
        model.setPackagingCharges(data && data.packagingCharges ? data.packagingCharges : 0);
        model.setPackagingChargesPerItems(data && data.packagingChargesPerItems ? data.packagingChargesPerItems : false);
        model.setPackagingChargesICD(data && data.packagingChargesICD ? data.packagingChargesICD : 0);
        model.setPackagingChargesPerItemsICD(data && data.packagingChargesPerItemsICD ? data.packagingChargesPerItemsICD : false);
        model.setPackagingChargesISP(data && data.packagingChargesISP ? data.packagingChargesISP : 0);
        model.setPackagingChargesPerItemsISP(data && data.packagingChargesPerItemsISP ? data.packagingChargesPerItemsISP : false);
        return model;
    }
    public static getBusinessPaymentSettings(data: any): BusinessPaymentSettings {
        let model = new BusinessPaymentSettings();
        if (data) {
            model.setCod(data.cod ? data.cod : false);
            model.setOnline(data.online ? data.online : false);
        } else {
            model.setCod(true);
            model.setOnline(true);

        }
        if (data && data.bankDetails) {
            let bankDetails = new BusinessBankDetails();
            bankDetails.setAccountName(data.bankDetails.accountName)
            bankDetails.setAccountNumber(data.bankDetails.accountNumber)
            bankDetails.setBankBranchName(data.bankDetails.bankBranchName)
            bankDetails.setBankIFSC(data.bankDetails.bankIFSC)
            bankDetails.setBankName(data.bankDetails.bankName)
            model.setBankDetails(bankDetails);
        } else {
            model.setBankDetails(null)
        }
        if (data && data.upi) {
            model.setUpi(EcommerceUtility.getListOfItems(data.upi, EcommerceUtility.getBusinessUPIDetailsModel));
        } else {
            model.setUpi([]);
        }

        return model;
    }
    public static getBusinessUPIDetailsModel(data: any): BusinessUPIDetails {

        let model = new BusinessUPIDetails();
        if (!data) {
            return model;
        }
        model.setCurrency(data.currency ? data.currency : Constants.DEFAULT_CURRENCY);
        model.setPayeeAdress(data.payeeAdress ? data.payeeAdress.toLowerCase() : "");
        model.setPayeeName(data.payeeName ? data.payeeName : "");
        model.setUpiType(data.upiType ? data.upiType : "upi");
        model.setMerchantCode(data.merchantCode ? data.merchantCode : "");
        model.setStatus(data.status);
        model.setCurrency(data.currency ? data.currency : "");
        model.setPrimary(data.primary ? data.primary : false);
        return model;
    }
    public static getBusinessCurrencyModel(data: any): BusinessCurrencyModel {

        let model = new BusinessCurrencyModel();
        model.setCurrency(data && data.currency ? data.currency : Constants.DEFAULT_CURRENCY);
        model.setCurrencySymbol(data && data.currencySymbol ? data.currencySymbol : Constants.DEFAULT_CURRENCY_SYMBOL);
        model.setCurrencyConversion(data && data.currencyConversion ? data.currencyConversion : 1);
        model.setPrimaryCurrency(data && data.primaryCurrency ? data.primaryCurrency : false);
        model.setDeleteCurrency(data && data.deleteCurrency ? data.deleteCurrency : false);
        return model;
    }
    public static getPrimaryCurrency(data: BusinessResponseModel): BusinessCurrencyModel {
        let currencySettings = data.getBusinessCurrencySettings();
        if (currencySettings == undefined || currencySettings[0] == undefined || currencySettings.find(c => (c.isPrimaryCurrency() != undefined && c.isPrimaryCurrency() == true)) == undefined) {
            return EcommerceUtility.setDefaultBusinessCurrency(data)[0];
        } else {
            return currencySettings.find(c => (c.isPrimaryCurrency() != undefined && c.isPrimaryCurrency() == true));
        }

    }
    public static getSelectedCurrency(data: BusinessResponseModel, primaryCurrency: BusinessCurrencyModel, currency?: string): BusinessCurrencyModel {
        let currencySettings = data.getBusinessCurrencySettings();
        if (currency == undefined || currency.trim() == "" || currencySettings.find(c => (c.getCurrency() != undefined && c.getCurrency().toLowerCase() == currency.toLowerCase())) == undefined) {
            return primaryCurrency;
        } else {
            return currencySettings.find(c => (c.getCurrency() != undefined && c.getCurrency().toLowerCase() == currency.toLowerCase()))
        }

    }
    public static setDefaultBusinessCurrency(data: BusinessResponseModel): BusinessResponseModel {

        let model = new BusinessCurrencyModel();
        model.setCurrency(data.getPrimaryCurrency());
        model.setCurrencySymbol(data.getPrimaryCurrencySymbol());
        model.setCurrencyConversion(1);
        model.setPrimaryCurrency(true);
        let currencySettingsArray = [];
        currencySettingsArray.push(model);
        data.setBusinessCurrencySettings(currencySettingsArray)
        return data;
    }
    public static getBusinessData(data: any): BusinessResponseModel {
        let model: BusinessResponseModel = new BusinessResponseModel();

        model.setBusinessId(data.businessId ? data.businessId : "");
        model.setBusinessLegalName(data.businessLegalName ? data.businessLegalName : "");
        model.setAltNumber(data.altNumber ? data.altNumber : "");
        model.setBusinessName(data.businessName ? data.businessName : "");
        model.setBusinessType(data.businessType ? data.businessType : "");

        model.setGstNumber(data.gstNumber ? data.gstNumber : "");
        model.setCountry(data.country ? data.country : "");
        model.setCountryAbbreviation(data.countryAbbreviation ? data.countryAbbreviation : "");
        model.setCountryCode(data.countryCode ? data.countryCode : "");

        model.setPrimaryCurrency(data.primaryCurrency ? data.primaryCurrency : Constants.DEFAULT_CURRENCY);
        model.setPrimaryCurrencySymbol(data.primaryCurrencySymbol ? data.primaryCurrencySymbol : Constants.DEFAULT_CURRENCY_SYMBOL);
        model.setPrimaryLanguage(data.primaryLanguage ? data.primaryLanguage : Constants.DEFAULT_LANGUAGE);
        model.setStartTime(data.startTime ? data.startTime : Constants.DEFAULT_START_TIME);

        model.setEndTime(data.endTime ? data.endTime : Constants.DEFAULT_END_TIME);
        model.setAddressLine1(data.addressLine1 ? data.addressLine1 : "");
        model.setAddressLine2(data.addressLine2 ? data.addressLine2 : "");
        model.setLocality(data.locality ? data.locality : "");

        model.setState(data.state ? data.state : "");
        model.setCity(data.city ? data.city : "");
        model.setLatitude(data.latitude ? data.latitude : "");
        model.setLongitude(data.longitude ? data.longitude : "");


        model.setOwnerId(data.ownerId ? data.ownerId : "");
        model.setPhoneNumber(data.phoneNumber ? data.phoneNumber : "");
        model.setZipCode(data.zipCode ? data.zipCode : "");
        model.setFuelStation(data.fuelStation ? data.fuelStation : "");
        model.setEmailAddress(data.emailAddress ? data.emailAddress : "");
        model.setAverageRating(data.averageRating ? data.averageRating : 0);
        model.setRatingCount(data.ratingCount ? data.ratingCount : 0);
        model.setOrderSequenceNumber(data.orderSequenceNumber ? data.orderSequenceNumber : 0);
        model.setOrderSequenceNumberPrefix(data.orderSequenceNumberPrefix ? data.orderSequenceNumberPrefix : DBConstants.defaultSequenceNumberPreFix);
        model.setBusinessTiming(EcommerceUtility.getBusinessTimingArray(data.businessTiming));
        model.setDeliverySettings(EcommerceUtility.getBusinessDeliverySettingsModel(data.deliverySettings));
        model.setPaymentSettings(EcommerceUtility.getBusinessPaymentSettings(data.paymentSettings));
        model.setAvailabilityStatus(data.availabilityStatus ? data.availabilityStatus : BusinessAvailabilityEnum.Open);
        model.setBusinessCurrencySettings(EcommerceUtility.getBusinessCurrencyModelArray(data.businessCurrencySettings));
        if (data.fs) {
            model.setFuelStationDetails(EcommerceUtility.getBusinessFuelStationModel(data.fs))
        } else {
            model.setFuelStationDetails(null)
        }
        Utility.setServiceObjectProperties(model, data);
        return model;
    }


    public static getCategoryData(data: any): CategoryModel {
        let model: CategoryModel = new CategoryModel();
        model.setBusinessType(data.businessType ? data.businessType : "");

        model.setCategoryName((data.categoryName ? data.categoryName : "").trim())
        model.setCategoryStatus(data.categoryStatus ? data.categoryStatus : "")
        model.setDefaultImage(data.defaultImage ? data.defaultImage : "")
        model.setIcon(data.icon ? data.icon : "")
        model.setPhotos(data.photos ? data.photos : []);
        model.setCreatedBy(data.createdBy ? data.createdBy : "")
        model.setSortingOrder(data.sortingOrder ? data.sortingOrder : 1)
        model.setRemarks(data.remarks ? data.remarks : "")
        Utility.setServiceObjectProperties(model, data);
        return model;
    }

    public static getSubCategoryData(data: any): SubCategoryModel {
        let model: SubCategoryModel = new SubCategoryModel();
        model.setBusinessType(data.businessType ? data.businessType : "");

        model.setSubCategoryName(data.subCategoryName ? data.subCategoryName : "")
        model.setCategoryId(data.categoryId ? data.categoryId : "")
        model.setCategoryStatus(data.categoryStatus ? data.categoryStatus : "")
        model.setDefaultImage(data.defaultImage ? data.defaultImage : "")
        model.setIcon(data.icon ? data.icon : "")
        model.setPhotos(data.photos ? data.photos : []);
        model.setCreatedBy(data.createdBy ? data.createdBy : "")
        model.setSortingOrder(data.sortingOrder ? data.sortingOrder : 1)
        model.setRemarks(data.remarks ? data.remarks : "")
        Utility.setServiceObjectProperties(model, data);
        return model;
    }
    public static validateUpdateBusinessData(data: BusinessResponseModel): BusinessResponseModel {
        if (data.getId() == undefined || data.getId() == "") {
            throw new MyError("Id is required field");
        }

        if (data.getBusinessName() == undefined || data.getBusinessName() == "") {
            throw new MyError("Business Name is required.");
        }


        // if (data.getStartTime() == undefined || data.getStartTime() == "") {
        //     throw new MyError("Start time is required.");
        // }


        // if (data.getEndTime() == undefined || data.getEndTime() == "") {
        //     throw new MyError("End time is required.");
        // }


        if (data.getPhoneNumber() == undefined || data.getPhoneNumber() == "") {
            throw new MyError("Phone number is required.");
        }

        // if (data.getEmailAddress() == undefined || data.getEmailAddress() == "") {
        //     throw new MyError("Email address is required.");
        // }
        // if (data.getAltNumber() == undefined || data.getAltNumber() == "") {
        //     throw new MyError("Alternative  required field");
        // }

        return data;
    }
    public static validateCreateSubCategoryData(data: SubCategoryModel): SubCategoryModel {
        if (data.getCategoryId() == undefined || data.getCategoryId().trim() == "") {
            throw new MyError("Category Id is required field");
        }
        if (data.getSubCategoryName() == undefined || data.getSubCategoryName().trim() == "") {
            throw new MyError("Sub category name is required field");
        }

        // if (data.getBusinessType() == undefined || data.getBusinessType().trim() == "") {
        //     throw new MyError("Business Type is required field");
        // }



        return data;
    }
    public static validateCreateCategoryData(data: CategoryModel): CategoryModel {

        if (data.getCategoryName() == undefined || data.getCategoryName().trim() == "") {
            throw new MyError("Category name is required field");
        }

        if (data.getBusinessType() == undefined || data.getBusinessType().trim() == "") {
            throw new MyError("Business Type is required field");
        }

        return data;
    }


    public static getUserWishListModel(data: any): UserWishListModel {
        let model = new UserWishListModel();

        model.setUserId(data.userId ? data.userId : "");
        model.setProducts(data.products ? data.products : []);
        return model;

    }
    public static getAllProductsModelByBusinessId(data: any, wishListProducts?: string[]): ProductModel {

        let model: ProductModel = new ProductModel();
        model.setBusinessId(data.businessId ? data.businessId : '')
        model.setCategoryId(data.categoryId ? data.categoryId : "")
        model.setSubCategoryId(data.subCategoryId ? data.subCategoryId : "")
        model.setProductType(data.productType ? data.productType : ProductType.Regular);
        model.setProductBrand(data.productBrand ? data.productBrand : "")
        model.setSku(data.sku ? data.sku : "")
        model.setProductName(data.productName ? data.productName : "")
        model.setDescription(data.description ? data.description : "")
        model.setMrp(data.mrp ? data.mrp : 0)
        model.setSellingPrice(data.sellingPrice ? data.sellingPrice : 0)
        model.setAverageRating(data.averageRating ? data.averageRating : 0)
        model.setNoOfReviews(data.noOfReviews ? data.noOfReviews : 0)
        model.setDefaultImage(data.defaultImage ? data.defaultImage : "")
        model.setStockAlertAt(data.stockAlertAt ? data.stockAlertAt : 0)
        model.setGstRate(data.gstRate ? data.gstRate : 0)
        model.setInWishList(false);
        model.setEstimatedTime(data.estimatedTime ? data.estimatedTime : 0)
        model.setAppointmentRequired(data.appointmentRequired != undefined ? data.appointmentRequired : false)
        model.setQty(data.qty ? data.qty : -1)
        model.setQtyUnit(data.qtyUnit ? data.qtyUnit : "")
        if (data.business) {
            model.setBusiness(EcommerceUtility.getBusinessListResponseModelData(data.business))
        }
        Utility.setServiceObjectProperties(model, data);
        if (wishListProducts && wishListProducts.findIndex(r => r.toString() == model.getId().toString()) > -1) {
            model.setInWishList(true);
        }
        return model;
    }
    public static getProductRatingReviewModelData(data: any): ProductRatingReviewModel {
        let model = new ProductRatingReviewModel();
        model.setUserId(data.userId ? data.userId : "");
        model.setProductId(data.productId ? data.productId : "");
        model.setRating(data.rating ? data.rating : 0);
        model.setReview(data.review ? data.review : "");
        model.setFirstName(data.firstName ? data.firstName : "");
        model.setLastName(data.lastName ? data.lastName : "");
        model.setImage(data.image ? data.image : "");
        Utility.setServiceObjectProperties(model, data);
        return model;
    }
    public static getProductModelData(data: any): ProductModel {
        let model: ProductModel = new ProductModel();
        model.setBusinessId(data.businessId ? data.businessId : '')
        model.setCategoryId(data.categoryId ? data.categoryId : "")
        model.setSubCategoryId(data.subCategoryId ? data.subCategoryId : "")
        model.setProductType(data.productType ? data.productType : ProductType.Regular);
        model.setIsVeg(data.isVeg)
        model.setCountryOfOrigin(data.countryOfOrigin ? data.countryOfOrigin : "")
        model.setProductBrand(data.productBrand ? data.productBrand : "")
        model.setSku(data.sku ? data.sku : "")
        model.setShowInTopProduct(data.showInTopProduct ? data.showInTopProduct : false)
        model.setShowRecommend(data.showRecommend ? data.showRecommend : false)
        model.setProductName(data.productName ? data.productName : "")
        model.setProductCode(data.productCode ? data.productCode : "")
        model.setProductWeight(data.productWeight ? data.productWeight : 0)
        model.setDescription(data.description ? data.description : "")
        model.setProductFeatures(data.productFeatures ? data.productFeatures : "")
        model.setHowToUse(data.howToUse ? data.howToUse : "")
        model.setMsp(data.msp ? data.msp : 0)
        model.setMrp(data.mrp ? data.mrp : 0)
        model.setSellingPrice(data.sellingPrice ? data.sellingPrice : 0)
        model.setDeliveryCharges(data.deliveryCharges ? data.deliveryCharges : 0)
        model.setQuantityAvailable(data.quantityAvailable ? data.quantityAvailable : 0)
        model.setAverageRating(data.averageRating ? data.averageRating : 0)
        model.setNoOfReviews(data.noOfReviews ? data.noOfReviews : 0)
        // model.setThumbnailImage(data.thumbnailImage ? data.thumbnailImage : "")
        model.setDefaultImage(data.defaultImage ? data.defaultImage : "")
        model.setTotalViews(data.totalViews ? data.totalViews : 0)
        model.setStockAlertAt(data.stockAlertAt ? data.stockAlertAt : 0)
        model.setCreatedBy(data.createdBy ? data.createdBy : "")
        model.setUpdatedBy(data.updatedBy ? data.updatedBy : null)
        model.setPhotos(data.photos ? data.photos : [])
        model.setVariants(EcommerceUtility.getListOfItems((data.variants ? data.variants : []), EcommerceUtility.getProductVariantModel));
        model.setGstRate(data.gstRate ? data.gstRate : 0)
        model.setEnableInventory(data.enableInventory ? data.enableInventory : false)
        model.setEstimatedTime(data.estimatedTime ? data.estimatedTime : 0)
        model.setAppointmentRequired(data.appointmentRequired != undefined ? data.appointmentRequired : false)
        model.setCategoryName(data.categoryName)
        model.setSubCategoryName(data.subCategoryName)
        model.setQty(data.qty ? data.qty : -1)
        model.setQtyUnit(data.qtyUnit ? data.qtyUnit : "")
        Utility.setServiceObjectProperties(model, data);
        return model;
    }
    public static getCartResponseModel(data: any): CartResponseModel {
        var model = new CartResponseModel()
        model.setMrp(data.mrp ? data.mrp : 0)
        model.setSellingPrice(data.sellingPrice ? data.sellingPrice : 0)
        model.setDeliveryCharges(data.deliveryCharges ? data.deliveryCharges : 0)
        model.setCategoryId(data.categoryId ? data.categoryId : "")
        if (data.productId != undefined && data.productId.toString() != "") {
            model.setProductId(data.productId ? data.productId : "");
        } else {
            if (data._id != undefined && data._id != "") {
                model.setProductId(data._id.toString())
            } else {
                model.setProductId(data.productId ? data.productId : "");
            }
        }
        let productWeight = 0
        if (data.productWeight != undefined) {
            productWeight = Number.parseFloat(data.productWeight);
            if (isNaN(productWeight)) {
                productWeight = 0;
            }
        }
        model.setProductWeight(productWeight);
        model.setVariantId(data.variantId ? data.variantId : "");
        model.setVariantName(data.variantName ? data.variantName : "")
        model.setProductName(data.productName ? data.productName : "")
        model.setDefaultImage(data.defaultImage ? data.defaultImage : "")
        model.setGstRate(data.gstRate ? data.gstRate : 0)
        model.setBusinessId(data.businessId ? data.businessId : "")
        model.setQuantityAvailable(data.quantityAvailable ? data.quantityAvailable : 0)
        model.setEnableInventory(data.enableInventory ? data.enableInventory : false)
        model.setAppointmentRequired(data.appointmentRequired  !=undefined ? data.appointmentRequired : false)
        // model.setQty(data.qty ? data.qty : -1)
        // model.setQtyUnit(data.qtyUnit ? data.qtyUnit : "")
        return model;

    }
    public static getProductVariantModel(data: any): ProductVariantModel {
        let model: ProductVariantModel = new ProductVariantModel();

        model.setSku(data.sku ? data.sku : "")
        model.setProductWeight(data.productWeight ? data.productWeight : 0)
        model.setMsp(data.msp ? data.msp : 0)
        model.setMrp(data.mrp ? data.mrp : 0)

        model.setSellingPrice(data.sellingPrice ? data.sellingPrice : 0)
        model.setDeliveryCharges(data.deliveryCharges ? data.deliveryCharges : 0)
        model.setQuantityAvailable(data.quantityAvailable ? data.quantityAvailable : 0)
        model.setStockAlertAt(data.stockAlertAt ? data.stockAlertAt : 0)

        model.setEnableInventory(data.enableInventory ? data.enableInventory : false)
        model.setProductId(data.productId ? data.productId : "");
        model.setVariantName(data.variantName ? data.variantName : "")
        model.setVariantType(data.variantType ? data.variantType : "")
        model.setQty(data.qty ? data.qty : -1)
        model.setQtyUnit(data.qtyUnit ? data.qtyUnit : "")



        Utility.setServiceObjectProperties(model, data);
        return model;

    }


    public static getUserDeliveryAddressData(data: any): UserDeliveryAddressModel {
        let model: UserDeliveryAddressModel = new UserDeliveryAddressModel();


        model.setUserId(data.userId ? data.userId : "");
        model.setFirstName(data.firstName ? data.firstName : "");
        model.setLastName(data.lastName ? data.lastName : "");
        model.setAddressType(data.addressType ? data.addressType : "");

        model.setCountry(data.country ? data.country : "");
        model.setCountryAbbreviation(data.countryAbbreviation ? data.countryAbbreviation : "");
        model.setCountryCode(data.countryCode ? data.countryCode : "");
        model.setAddressLine1(data.addressLine1 ? data.addressLine1 : "");

        model.setAddressLine2(data.addressLine2 ? data.addressLine2 : "");
        model.setLocality(data.locality ? data.locality : "");
        model.setState(data.state ? data.state : "");
        model.setCity(data.city ? data.city : "");

        model.setLatitude(data.latitude ? data.latitude : "");
        model.setLongitude(data.longitude ? data.longitude : "");
        model.setPhoneNumber(data.phoneNumber ? data.phoneNumber : "");
        model.setZipCode(data.zipCode ? data.zipCode : "");
        model.setPrimaryAddress(data.primaryAddress ? data.primaryAddress : false);

        Utility.setServiceObjectProperties(model, data);
        return model;
    }

    public static getOrderUserDetailsModel(data): UserDetailsModel {
        let model = new UserDetailsModel();
        model.setFirstName(data.firstName ? data.firstName : "");
        model.setLastName(data.lastName ? data.lastName : "");
        model.setCountryCode(data.countryCode ? data.countryCode : "");
        model.setMobileNumber(data.mobileNumber ? data.mobileNumber : "");
        model.setEmail(data.email ? data.email : "");
        model.setImage(data.image ? data.image : "");
        Utility.setServiceObjectProperties(model, data);
        return model;
    }

    public static getUserOrderDataModel(orderData): UserOrderModel {
        let orderModel: UserOrderModel = new UserOrderModel();
        orderData.deliveryAddress && orderModel.setDeliveryAddress(EcommerceUtility.getUserDeliveryAddressData(orderData.deliveryAddress));
        orderModel.setBillNumber(orderData.billNumber ? orderData.billNumber : "");
        orderData.notes && orderModel.setNotes(orderData.notes);
        orderData.pickUpTime && orderModel.setPickUpTime(orderData.pickUpTime);
        orderData.pickUpDate && orderModel.setPickUpDate(orderData.pickUpDate);
        orderModel.setPayments(EcommerceUtility.getOrderPaymentsData(orderData.payments));
        orderData.status && orderModel.setStatus(orderData.status);
        orderData.paymentStatus && orderModel.setPaymentStatus(orderData.paymentStatus);
        orderModel.setPaymentType(orderData.paymentType ? orderData.paymentType : OrderPaymentType.ONLINE);
        orderModel.setOnlinePayment(orderData.onlinePayment != undefined ? orderData.onlinePayment : false);
        orderData.userId && orderModel.setUserId(orderData.userId);
        orderModel.setUnread(orderData.unread);
        orderModel.setRoundedOffValue(orderData.roundedoffValue ? orderData.roundedoffValue : 0);
        orderModel.setTotalBill(orderData.totalBill ? orderData.totalBill : 0);
        orderModel.setNetRevenue(orderData.netRevenue ? orderData.netRevenue : 0);
        orderModel.setGrossRevenue(orderData.grossRevenue ? orderData.grossRevenue : 0);
        orderModel.setTotalTax(orderData.totalTax ? orderData.totalTax : 0);
        orderModel.setSubTotal(orderData.subTotal ? orderData.subTotal : 0);
        orderData.extraCharges && orderModel.setExtraCharges(EcommerceUtility.getOrderExtraCharges(orderData.extraCharges));
        orderModel.setTotalDiscount(orderData.totalDiscount ? orderData.totalDiscount : 0);
        orderData.channelOrderStatus && orderModel.setChannelOrderStatus(orderData.channelOrderStatus);
        orderData.createdAt && orderModel.setCreatedAt(orderData.createdAt);
        orderData.orderStatus && orderModel.setOrderStatus(orderData.orderStatus);
        orderModel.setDeliveryCharges(orderData.deliveryCharges ? orderData.deliveryCharges : 0);
        orderModel.setPackingCharges(orderData.packingCharges ? orderData.packingCharges : 0);
        orderData.cancellationReason && orderModel.setCancellationReason(orderData.cancellationReason);
        orderData.gstName && orderModel.setGstName(orderData.gstName);
        orderData.gstNumber && orderModel.setGstNumber(orderData.gstNumber);
        orderData.orderType && orderModel.setOrderType(orderData.orderType);
        orderData.userId && orderModel.setUserId(orderData.userId);
        orderData.businessId && orderModel.setBusinessId(orderData.businessId);
        orderData.vehicleNo && orderModel.setVehicleNo(orderData.vehicleNo);
        orderData.mobileNo && orderModel.setMobileNo(orderData.mobileNo);
        orderData.deliveryDate && orderModel.setDeliveryDate(orderData.deliveryDate);

        orderModel.setProducts(EcommerceUtility.getOrderProductsModelList(orderData.products));

        orderData.businessName && orderModel.setBusinessName(orderData.businessName)
        orderData.businessContactNumber && orderModel.setBusinessContactNumber(orderData.businessContactNumber)
        orderData.businessCountryCode && orderModel.setBusinessCountryCode(orderData.businessCountryCode)
        orderData.businessLatitude && orderModel.setBusinessLatitude(orderData.businessLatitude)
        orderData.businessLongitude && orderModel.setBusinessLongitude(orderData.businessLongitude)

        orderModel.setCurrency(orderData && orderData.currency ? orderData.currency : Constants.DEFAULT_CURRENCY);
        orderModel.setCurrencySymbol(orderData && orderData.currencySymbol ? orderData.currencySymbol : Constants.DEFAULT_CURRENCY_SYMBOL);
        orderModel.setExtraFeeUser(orderData && orderData.extraFeeUser ? orderData.extraFeeUser : 0);
        orderModel.setExtraFeeBusiness(orderData && orderData.extraFeeBusiness ? orderData.extraFeeBusiness : 0);
        if (orderData != undefined && orderData.currencyConversion != undefined && isNaN(Number.parseFloat(orderData.currencyConversion)) == false) {
            orderModel.setCurrencyConversion(Number.parseFloat(orderData.currencyConversion));

        } else {
            orderModel.setCurrencyConversion(orderData && orderData.currencyConversion ? orderData.currencyConversion : 1);
        }

        if (orderData.user != undefined && orderData.user.firstName != undefined) {
            orderModel.setUser(EcommerceUtility.getOrderUserDetailsModel(orderData.user))
        }


        orderData.apptDate && orderModel.setApptDate(orderData.apptDate)
        orderData.apptTime && orderModel.setApptTime(orderData.apptTime)
        orderData.apptStatus && orderModel.setApptStatus(orderData.apptStatus)
        orderData.apptRemarksByUser && orderModel.setApptRemarksByUser(orderData.apptRemarksByUser)
        orderData.apptRemarksByBusiness && orderModel.setApptRemarksByBusiness(orderData.apptRemarksByBusiness)
        orderData.apptSuggestedDate && orderModel.setApptSuggestedDate(orderData.apptSuggestedDate)
        orderData.apptSuggestedTime && orderModel.setApptSuggestedTime(orderData.apptSuggestedTime)
        orderModel.setAlreadyReached(orderData.alreadyReached != undefined ? orderData.alreadyReached : false)
        orderModel.setCreatedFrom(orderData.createdFrom != undefined ? orderData.createdFrom : OrderCreatedFrom.User)
        orderModel.setEmployeeId(orderData.employeeId != undefined ? orderData.employeeId : "")
        orderModel.setEmployeeName(orderData.employeeName != undefined ? orderData.employeeName : "")
        orderModel.setCouponCode(orderData.couponCode != undefined ? orderData.couponCode : "")

        orderModel.setCustomDiscountPercentage(orderData.customDiscountPercentage != undefined ? orderData.customDiscountPercentage : 0);
        orderModel.setCustomDiscountAmount(orderData.customDiscountAmount != undefined ? orderData.customDiscountAmount : 0);
        orderModel.setCustomDiscount(EcommerceUtility.getCustomDiscountData(orderData.customDiscount));

        Utility.setServiceObjectProperties(orderModel, orderData);
        return orderModel;
    }



    public static getOrderPaymentsData(payments): Array<OrderPaymentsModel> {
        if (payments == undefined || payments[0] == undefined) {
            return [];
        }
        let orderPaymentData: Array<OrderPaymentsModel> = payments.map(item => {
            return this.getOrderPaymentData(item);
        });
        return orderPaymentData;
    }

    public static getOrderPaymentData(payment): OrderPaymentsModel {
        let orderPayment: OrderPaymentsModel = new OrderPaymentsModel();
        orderPayment.setPaymentAmount(payment.paymentAmount);
        orderPayment.setPaymentDetails(payment.paymentDetails);
        orderPayment.setPaymentMethod(payment.paymentMethod);
        return orderPayment;
    }
    public static getOrderProductsModel(data): OrderProductsModel {
        let model: OrderProductsModel = new OrderProductsModel();

        model.setProductId(data.productId ? data.productId : "");
        model.setVariantId(data.variantId ? data.variantId : "");
        model.setVariantName(data.variantName ? data.variantName : "")
        model.setProductName(data.productName ? data.productName : "")

        model.setMrp(data.mrp ? data.mrp : 0)
        model.setSellingPrice(data.sellingPrice ? data.sellingPrice : 0)
        model.setDeliveryCharges(data.deliveryCharges ? data.deliveryCharges : 0)
        model.setPackingCharges(data.packingCharges ? data.packingCharges : 0)


        model.setSubTotal(data.subTotal ? data.subTotal : 0)
        model.setQuantity(data.quantity ? data.quantity : 0)
        model.setTaxAmount(data.taxAmount ? data.taxAmount : 0)
        model.setTax(data.tax ? data.tax : 0)

        model.setTotalAmount(data.totalAmount ? data.totalAmount : 0)

        model.setCurrency(data && data.currency ? data.currency : Constants.DEFAULT_CURRENCY);
        model.setCurrencySymbol(data && data.currencySymbol ? data.currencySymbol : Constants.DEFAULT_CURRENCY_SYMBOL);
        model.setCurrencyConversion(data && data.currencyConversion ? data.currencyConversion : 1);
        model.setDefaultImage(data.defaultImage ? data.defaultImage : "");
        model.setUpdateInventory(data.updateInventory != undefined ? data.updateInventory : false)
        return model;
    }
    public static getOrderProductsModelList(productsData): OrderProductsModel[] {
        if (productsData == undefined || productsData[0] == undefined) {
            return []
        }

        return Utility.getListOfItems(productsData, EcommerceUtility.getOrderProductsModel)
    }

    public static getOrderExtraCharges(extraCharges: any): OrderExtraCharge[] {
        const orderExtraCharges: OrderExtraCharge[] = [];
        if (extraCharges) {
            for (let extraCharge of extraCharges) {
                const orderExtraCharge: OrderExtraCharge = new OrderExtraCharge((extraCharge.name ? extraCharge.name : ""), (extraCharge.value ? extraCharge.value : 0));
                orderExtraCharge.setIsFixed(extraCharge.isFixed);
                orderExtraCharge.setAmount(extraCharge.amount);
                orderExtraCharge.setTaxableAmount(extraCharge.taxableAmount);
                orderExtraCharge.setAggregatorPaid(extraCharge.aggregatorPaid);
                orderExtraCharges.push(orderExtraCharge);
            }
        }
        return orderExtraCharges;
    }

    public static getPushNotificationBaseModel(data: any): PushNotificationBaseModel {
        let model = new PushNotificationBaseModel(data.title, data.message, data.clickAction);

        return model;
    }

    public static getCustomDiscountData(customDiscountData): CustomDiscount {
        if (customDiscountData == undefined) {
            return new CustomDiscount(0, 0);
        }
        let customDis = new CustomDiscount(customDiscountData.amount, customDiscountData.percentage);
        customDis.setDiscountNotes(customDiscountData.discountNotes ? customDiscountData.discountNotes : "");
        customDis.setDiscountType(customDiscountData.discountType ? customDiscountData.discountType : "");
        if (customDiscountData.isFixed == undefined) {
            customDis.setIsFixed(false);
        } else {
            customDis.setIsFixed(customDiscountData.isFixed);
        }

        customDis.setMainDiscountType(customDiscountData.mainDiscountType != undefined ? customDiscountData.mainDiscountType : "");
        customDis.setDiscountCoupon(customDiscountData.discountCoupon != undefined ? customDiscountData.discountCoupon : "");
        customDis.setPromotionDiscount(customDiscountData.promotionDiscount != undefined ? customDiscountData.promotionDiscount : false);
        customDis.setPromotionId(customDiscountData.promotionId);
        customDis.setCategory(EcommerceUtility.getCustomDiscountCategoryData(customDiscountData.category));
        // customDis.setPrinterTag(Utility.getCustomDiscountPrintTagData(customDiscountData.printerTag));
        customDis.setCustomDiscountItemsList(EcommerceUtility.getCustomDiscountItems(customDiscountData.items));
        customDis.setCategoryCustomDiscountItemsList(EcommerceUtility.getCustomDiscountItems(customDiscountData.categoryItemsList));
        customDis.setTagCustomDiscountItemsList(EcommerceUtility.getCustomDiscountItems(customDiscountData.tagItemsList));



        return customDis;
    }


    public static getCustomDiscountCategoryData(data): Array<CategoryDiscount> {
        let categoryList = new Array<CategoryDiscount>();
        data && data.forEach(element => {
            let category = new CategoryDiscount();
            category.setAmount(element.amount ? element.amount : 0)
            category.setPercentage(element.percentage ? element.percentage : 0)
            category.setCategoryId(element.categoryId)
            if (element.isFixed != undefined) {
                category.setIsFixed(element.isFixed)
            } else {
                category.setIsFixed(false)
            }
            categoryList.push(category);
        });
        return categoryList;
    }
    public static getCustomDiscountItems(items): Array<CustomDiscountItems> {
        let itemArray = new Array<CustomDiscountItems>();
        items = items ? items : [];
        items.forEach(it => {
            let item = new CustomDiscountItems();
            item.setAmount(it.amount ? it.amount : 0);
            item.setPercentage(it.percentage ? it.percentage : 0);
            item.setItemId(it.itemId);
            item.setItemName(it.itemName ? it.itemName : '');
            item.setDishAddOns(it.dishAddOns ? it.dishAddOns : []);
            item.setDiscountNotes(it.discountNotes ? it.discountNotes : '');
            if (it.isFixed != undefined) {
                item.setIsFixed(it.isFixed)
            } else {
                item.setIsFixed(false)
            }

            itemArray.push(item);
        });
        return itemArray;
    }
    public static getBillItemIdList(items: Array<OrderProductsModel>): Array<string> {
        let itemIdList = new Array<string>();
        items.forEach(element => {
            if (element.getProductId() != undefined && element.getProductId() != "") {
                itemIdList.push(element.getProductId());
            }
        });
        return itemIdList;
    }
    public static getCategoryIdList(category: Array<CategoryDiscount>): Array<string> {
        let categoryIdList = new Array<string>();
        category.forEach(element => {
            if (element.getCategoryId() != undefined && element.getCategoryId() != "") {
                categoryIdList.push(element.getCategoryId());
            }
        });
        return categoryIdList;
    }
}