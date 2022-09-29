import { InventoryCostCenterConsumptionOrderItemModel } from "../../web-layer/models/inventory/request/InventoryCostCenterConsumptionOrderItemModel";
import { Address } from "../../service-layer/models/Address";
import { Country } from "../../service-layer/models/CountryModel";
import { BaseRecipe } from "../../service-layer/models/inventory/BaseRecipe";
import { InventoryCostCenterItemStockModel } from "../../service-layer/models/inventory/InventoryCostCenterItemStockModel";
import { InventoryCostCenterMapping, InventoryCostCenters } from "../../service-layer/models/inventory/InventoryCostCenters";
import { InventoryCostCenterStockHistoryModel } from "../../service-layer/models/inventory/InventoryCostCenterStockHistoryModel";
import { InventoryKitchenStockItemsModel, InventoryKitchenStockModel } from "../../service-layer/models/inventory/InventoryKitchenStockModel";
import { InventoryLocations, LocationType } from "../../service-layer/models/inventory/InventoryLocations";
import { InventoryRecipe, RecipeType } from "../../service-layer/models/inventory/InventoryRecipe";
import { InventoryStore } from "../../service-layer/models/inventory/InventoryStore";
import { InventorySubRecipe } from "../../service-layer/models/inventory/InventorySubRecipe";
import { Item } from "../../service-layer/models/inventory/Item";
import { ItemStock } from "../../service-layer/models/inventory/ItemStock";
import { InventoryItemTypes } from "../../service-layer/models/inventory/ItemTypes";
import { ItemVariant } from "../../service-layer/models/inventory/ItemVariant";
import { InventoryMeasurementUnitConverstions } from "../../service-layer/models/inventory/MeasurementUnitConverstions";
import { InventoryMeasurementUnits } from "../../service-layer/models/inventory/MeasurementUnits";
import { PersonDetail } from "../../service-layer/models/inventory/PersonDetail";
import { PurchaseOrderStatus } from "../../service-layer/models/inventory/PurchaseHistory";
import { InventoryPurchaseOrder } from "../../service-layer/models/inventory/PurchaseOrder";
import { InventoryPurchaseOrderItem } from "../../service-layer/models/inventory/PurchaseOrderItem";
import { RecipeItem } from "../../service-layer/models/inventory/RecipeItem";
import { Stock } from "../../service-layer/models/inventory/Stock";
import { InventoryCategories } from "../../service-layer/models/inventory/StoreCategories";
import { SubStore } from "../../service-layer/models/inventory/SubStore";
import { Vendor } from "../../service-layer/models/inventory/Vendor";
import { InventoryPriceCalculationMode, InventorySettings } from "../../service-layer/models/InventorySettings";
import { ObjectStatus } from "../../service-layer/models/ObjectStatus";
import { OrderPayment } from "../../service-layer/models/OrderPayment";
import { City, States } from "../../service-layer/models/StateModel";
import { UserType } from "../../service-layer/models/User";
import { InventoryCategoryRequest } from "../../web-layer/models/inventory/request/InventoryCategoryRequest";
import { InventoryCostCenterCategoryConsumptionModel, InventoryCostCenterConsumptionItem } from "../../web-layer/models/inventory/request/InventoryCostCenterCategoryConsumptionModel";
import { InventoryLocationRequest } from "../../web-layer/models/inventory/request/InventoryLocationRequest";
import { InventoryPurchaseOrderRequest } from "../../web-layer/models/inventory/request/InventoryPurchaseOrderRequest";
import { InventorySettingsRequest } from "../../web-layer/models/inventory/request/InventorySettingsRequest";
import { InventoryStoreRequest } from "../../web-layer/models/inventory/request/InventoryStoreRequest";
import { InventorySubStoreRequest } from "../../web-layer/models/inventory/request/InventorySubStoreRequest";
import { InventoryVendorsRequest } from "../../web-layer/models/inventory/request/InventoryVendorsRequest";
import { KitchenStockRequestModel } from "../../web-layer/models/inventory/request/KitchenStockRequestModel";
import { InventoryPurchaseOrderResponseModel } from "../../web-layer/models/inventory/response/InventoryPurchaseOrderResponseModel";
import { Utility } from "../utils/Utility";
import { Utils } from "./Utils";
import { InventoryCostCenterItemStockReportModel } from "../../service-layer/models/inventory/InventoryCostCenterItemStockReportModel";
import { InventoryCostCenterStockReportBaseModel } from "../../service-layer/models/inventory/InventoryCostCenterStockReportBaseModel";
import { InventoryStoreStockClosingModel } from "../../service-layer/models/inventory/InventoryStoreStockClosingModel";
import { InventoryStockClosingReportBaseModel, InventoryStoreStockClosingItemsModel } from "../../service-layer/models/inventory/InventoryStockClosingReportBaseModel";


export class InventoryUtilityV2 {
    public static dbToAllUnits(units: any): Array<InventoryMeasurementUnitConverstions> {
        if (units != undefined && units.length > 0) {
            return Utility.getListOfItems(units, InventoryUtilityV2.dbToUnit);
        } else {
            return []
        }
    }
    public static dbToUnit(unit: any): InventoryMeasurementUnitConverstions {
        let uomc = new InventoryMeasurementUnitConverstions();
        uomc.setConversionName(unit.conversionName ? unit.conversionName : "");
        uomc.setId(unit.id ? unit.id : unit._id);
        if (unit.units && unit.units.length > 0) {
            uomc.setUnits(Utility.getListOfItems(unit.units, InventoryUtilityV2.dbUnitConverstionToUnits));
        } else {
            uomc.setUnits(new Array());
        }
        return uomc;
    }
    public static dbUnitConverstionToUnits(unit: any): InventoryMeasurementUnits {
        let uom = new InventoryMeasurementUnits();
        uom.setUnitName(unit.unitName ? unit.unitName : "");
        uom.setUnitShortName(unit.unitShortName ? unit.unitShortName : "");;
        uom.setFactor(unit.factor ? unit.factor : 0);
        return uom;
    }
    public static dbToCountryList(dbCountryList: any): Array<Country> {
        if (dbCountryList != undefined && dbCountryList.length > 0) {
            return Utility.getListOfItems(dbCountryList, InventoryUtilityV2.dbToCountry);
        } else {
            return []
        }
    }
    public static dbToCountry(dbCountry: any): Country {
        let country = new Country();
        country.setName(dbCountry.name ? dbCountry.name : "");
        country.setId(dbCountry.id ? dbCountry.id : "");
        country.setCapital(dbCountry.capital ? dbCountry.capital : "");
        country.setCurrency(dbCountry.currency ? dbCountry.currency : "");
        country.setIso2(dbCountry.iso2 ? dbCountry.iso2 : "");
        country.setIso3(dbCountry.iso3 ? dbCountry.iso3 : "");
        country.setCurrency_symbol(dbCountry.currency_symbol ? dbCountry.currency_symbol : "");
        country.setPhone_code(dbCountry.phone_code ? dbCountry.phone_code : "");
        country.setNative(dbCountry.native ? dbCountry.native : "");

        return country;
    }
    public static dbToAllStatesList(states: any): Array<States> {
        if (states != undefined && states.length > 0) {
            return Utility.getListOfItems(states, InventoryUtilityV2.dbToState);
        } else {
            return []
        }
    }
    public static dbToAllCityList(dbCityList: any): Array<City> {
        if (dbCityList != undefined && dbCityList.length > 0) {
            return Utility.getListOfItems(dbCityList, InventoryUtilityV2.dbToCitiy);
        } else {
            return []
        }
    }

    public static dbToState(state: any): States {
        let stateObj = new States();
        stateObj.setName(state.name ? state.name : "");
        stateObj.setId(state.id ? state.id : "");
        stateObj.setState_code(state.state_code ? state.state_code : "");;
        if (state.cities != undefined && state.cities.length > 0) {
            stateObj.setCities(Utility.getListOfItems(state.cities, InventoryUtilityV2.dbToCitiy));
        } else {
            stateObj.setCities([]);
        }

        return stateObj;
    }
    public static dbToCitiy(city: any): City {
        let cityObj = new City();
        cityObj.setName(city.name ? city.name : "");
        return cityObj;

    }

    public static dbToAllStoreList(stores: any): Array<InventoryStore> {
        if (stores != undefined && stores.length > 0) {
            return Utility.getListOfItems(stores, InventoryUtilityV2.dbToStoreModel);
        } else {
            return []
        }
    }

    public static dbToAllItemTypes(stores: any): Array<InventoryItemTypes> {
        if (stores != undefined && stores.length > 0) {
            return Utility.getListOfItems(stores, InventoryUtilityV2.dbToItemType);
        } else {
            return []
        }
    }

    public static dbToItemType(type: any): InventoryItemTypes {
        let itemType = new InventoryItemTypes();
        itemType.setItemType(type.itemType ? type.itemType : "");
        itemType.setRestaurantId(type.restaurantId ? type.restaurantId : "");
        itemType.setId(type.id ? type.id : "");
        return itemType;
    }
    public static dbToAllSubStoreList(substores: any): Array<SubStore> {
        if (substores != undefined && substores.length > 0) {
            return Utility.getListOfItems(substores, InventoryUtilityV2.dbToSubStores);
        } else {
            return []
        }
    }
    public static dbToStoreModel(store: any): InventoryStore {
        let inventoryStore: InventoryStore = new InventoryStore();
        inventoryStore.setRestaurantId(store.restaurantId);
        inventoryStore.setStoreName(store.storeName);
        inventoryStore.setId(store.id);

        if (store.subStores != undefined && store.subStores.length > 0) {
            inventoryStore.setSubStores(Utility.getListOfItems(store.subStores, InventoryUtilityV2.dbToSubStores));
        } else {
            inventoryStore.setSubStores(new Array());
        }

        if (store.storeCategory != undefined && store.storeCategory.length > 0) {
            inventoryStore.setStoreCategory(Utility.getListOfItems(store.storeCategory, InventoryUtilityV2.dbDataToStoreCategory));
        } else {
            inventoryStore.setStoreCategory(new Array());
        }
        return inventoryStore;
    }

    public static dbToSubStores(subStoreData: any): SubStore {
        const subStore = new SubStore();
        subStore.setSubStoreName(subStoreData.subStoreName);
        subStore.setId(subStoreData.id);
        if (subStoreData.storeCategory != undefined && subStoreData.storeCategory.length > 0) {
            subStore.setStoreCategory(Utility.getListOfItems(subStoreData.storeCategory, InventoryUtilityV2.dbDataToStoreCategory));
        } else {
            subStore.setStoreCategory(new Array());
        }
        return subStore;
    }

    public static dbDataToStoreCategory(categoryData: any): InventoryCategories {
        const category = new InventoryCategories();
        category.setCategoryName(categoryData.categoryName ? categoryData.categoryName : "")
        category.setId(categoryData.id ? categoryData.id : categoryData._id)
        category.setStoreId(categoryData.storeId ? categoryData.storeId : "")
        return category;
    }

    public static getPOStatus(status: string) {
        status = status.toLowerCase();
        switch (status) {
            case "sent": {
                return PurchaseOrderStatus.Sent
            }
            case "draft": {
                return PurchaseOrderStatus.Draft
            }
            case "closed": {
                return PurchaseOrderStatus.Closed
            }
        }
        return PurchaseOrderStatus.Draft
    }
    public static convertAddPORequest(req: InventoryPurchaseOrderRequest): InventoryPurchaseOrder {
        let model = new InventoryPurchaseOrder();
        model.setVendorId(req.vendorId);
        model.setId(req.id);
        model.setOrderExpectedOn(req.orderExpectedOn);
        model.setOrderRecievedOn(req.orderRecievedOn);
        model.setInvoiceNumber(req.invoiceNumber);
        model.setOrderStatus(InventoryUtilityV2.getPOStatus(req.orderStatus ? req.orderStatus : ""));
        model.setRemarks(req.remarks ? req.remarks : "");
        model.setItems([]);
        if (req.items == undefined || req.items.length == 0) {
            throw new Error("Bad Request.Empty Item list.");
        } else {
            let total = 0;
            let subTotal = 0;
            let totalTax = 0;
            req.items.forEach(element => {
                let item = new InventoryPurchaseOrderItem();
                item.setItemId(element.itemId);
                if (element.item != undefined && element.item.name != undefined) {
                    item.setItemName(element.item.name);
                } else {
                    item.setItemName("");
                }
                item.setIsDeleted(element.isDeleted != undefined ? element.isDeleted : false);
                item.setGstAmount(0);
                item.setUnitId(element.unitId ? element.unitId : "");
                item.setQtyRequested(element.qtyRequested ? element.qtyRequested : 0)
                item.setQty(item.getQtyRequested())
                item.setPrice(element.price ? element.price : 0)
                item.setGst(element.gst ? element.gst : 0);
                item.setGstAmount(item.getPrice() * (item.getGst() / 100));
                item.setGstAmount(item.getGstAmount() * item.getQtyRequested());

                item.setSubTotal(item.getQtyRequested() * element.price);
                item.setTotalAmount(item.getSubTotal() + item.getGstAmount());
                item.setQtyUnit(element.qtyUnit ? element.qtyUnit : "");
                item.setQtySubUnit(element.qtySubUnit ? element.qtySubUnit : "");
                item.setVariantRequested(element.variantRequested ? element.variantRequested : 0);
                item.setVariantId(element.variantId ? element.variantId : "");
                model.getItems().push(item);
                total += item.getTotalAmount();
                subTotal += item.getSubTotal();
                totalTax += item.getGstAmount();
            });
            model.setSubTotal(subTotal);
            model.setTotalTax(totalTax);
            model.setTotalAmount(total);
            model.setTotalItems(model.getItems().length);
            model.setCharges(req.charges ? req.charges : 0);
            model.setTotalAmount(total + model.getCharges());

        }

        return model;
    }
    public static convertAddVendorRequest(model: InventoryVendorsRequest): Vendor {
        let vendor: Vendor = new Vendor();
        vendor.setId(model.id);
        vendor.setRestaurantId(model.restaurant);
        vendor.setName(model.vendorName)
        vendor.setEmail(model.vendorEmail)
        // vendor.setCategory(model.category)
        vendor.setCategoryId(model.category)
        vendor.setGstNumber(model.gstNumber)
        vendor.setPhoneNumber1(model.vendorPhoneNumber)
        vendor.setPhoneNumber2(model.vendorAltPhoneNumber)
        vendor.setPurchaseActive(model.vendorPurchaseActive)
        let address = new Address();
        address.setAddressLine1(model.address);
        address.setAddressLine2("");
        address.setCountry(model.country);
        address.setState(model.state)
        address.setCity(model.city)
        address.setPinCode(model.zipCode);
        vendor.setAddress(address);
        let user = new PersonDetail(UserType.Vendor);
        user.setFirstName(model.contactPersonName);;
        user.setDesignation(model.contactPersonDesignation);
        user.setPhoneNumber(model.contactPersonPhoneNumber);
        let arr = new Array();
        arr.push(user);
        vendor.setContactPersonDetails(arr);


        let pay = new OrderPayment();
        pay.setPaymentMethod(model.paymentType);
        pay.setPaymentDetails(model.paymentDetails);
        let paymentArray = new Array();
        paymentArray.push(pay);
        vendor.setPayments(paymentArray);

        vendor.setBankAccountNumber(model.bankAccountNumber ? model.bankAccountNumber : "")
        vendor.setBankBranchName(model.bankBranchName ? model.bankBranchName : "")
        vendor.setBankIFSC(model.bankIFSC ? model.bankIFSC : "")
        vendor.setBankName(model.bankName ? model.bankName : "")
        return vendor;
    }
    public static convertAddStoreRequest(model: InventoryStoreRequest): InventoryStore {
        let inventoryStore: InventoryStore = new InventoryStore();
        inventoryStore.setRestaurantId(model.restaurant);
        inventoryStore.setStoreName(model.storeName);
        inventoryStore.setId(model.id);
        return inventoryStore;
    }
    public static convertAddSubStoreStoreRequest(model: InventorySubStoreRequest): InventoryStore {
        let inventoryStore: InventoryStore = new InventoryStore();
        inventoryStore.setRestaurantId(model.restaurant);
        inventoryStore.setId(model.mainStoreId);
        return inventoryStore;
    }
    public static convertAddCategoryRequest(model: InventoryCategoryRequest): InventoryStore {
        let inventoryStore: InventoryStore = new InventoryStore();
        inventoryStore.setRestaurantId(model.restaurant);
        inventoryStore.setId(model.storeId);
        return inventoryStore;
    }
    public static getInventoryItem(item: any): Item {
        let inventoryItem: Item = new Item();
        inventoryItem.setId(item._id ? item._id : item.id);
        inventoryItem.setRestaurantId(item.restaurantId);
        inventoryItem.setName(item.name);
        inventoryItem.setType(item.type);
        inventoryItem.setStatus(item.status);
        inventoryItem.setStoreName(item.storeName);
        inventoryItem.setStoreId(item.storeId);
        inventoryItem.setCategory(item.category);
        inventoryItem.setUnits(item.units);
        inventoryItem.setYieldPercentage(item.yieldPercentage);
        inventoryItem.setUnitId(item.unitId);
        inventoryItem.setCategoryId(item.categoryId);
        inventoryItem.setItemTypeId(item.itemTypeId);
        inventoryItem.setQtyUnitForPrice(item.qtyUnitForPrice);
        inventoryItem.setMinQty(item.minQty);
        inventoryItem.setMinQtyUnit(item.minQtyUnit);
        inventoryItem.setMaxQtyUnit(item.maxQtyUnit);
        inventoryItem.setMaxQty(item.maxQty);
        inventoryItem.setMinOrderPeriod(item.minOrderPeriod);
        inventoryItem.setItemCurrentStock(InventoryUtilityV2.dbToItemStockHistory(item.itemCurrentStock));
        inventoryItem.setItemInitialStock(InventoryUtilityV2.dbToItemStockHistory(item.itemInitialStock));
        inventoryItem.setStockableItem(item.stockableItem);
        inventoryItem.setItemExpiry(item.itemExpiry);
        inventoryItem.setPurchaseFrom(item.purchaseFrom);
        inventoryItem.setCreatedAt(item.createdAt);
        inventoryItem.setItemVariants([]);
        if (item.itemVariants != undefined && item.itemVariants) {
            for (let variant of item.itemVariants) {
                if (variant != undefined && (variant.uniId == undefined || variant.uniId == "")) {
                    variant.unitId = inventoryItem.getUnitId();
                }
                inventoryItem.getItemVariants().push(InventoryUtilityV2.getInventoryItemVariant(variant, inventoryItem.getId(), inventoryItem.getRestaurantId()));
            }
        }
        return inventoryItem;
    }
    public static getInventoryItemV2(dbItem: any): Item {
        let item = InventoryUtilityV2.getInventoryItem(dbItem);
        item.setUnitDetails(InventoryUtilityV2.getItemUnit(dbItem.unitsArray));
        dbItem.categoriesArray && item.setCategory(dbItem.categoriesArray[0].categoryName);
        dbItem.itemTypesArray && item.setType(dbItem.itemTypesArray[0].itemType);
        dbItem.storesArray && item.setStoreName(dbItem.storesArray[0].storeName);
        dbItem.kitchenId && item.setKitchenId(dbItem.kitchenId);
        return item;
    }

    public static getItemUnit(dbUnits): InventoryMeasurementUnitConverstions {
        if (dbUnits == undefined || dbUnits == null || dbUnits.length == 0) {
            let units = new InventoryMeasurementUnitConverstions();
            units.setConversionName("")
            units.setUnits([]);
            units.setId("");
            return units;
        } else {
            return InventoryUtilityV2.dbToUnit(dbUnits[0]);
        }

    }

    public static getInventoryRecipe(item: any): BaseRecipe {
        const recipeType = Utils.parseDefaultEnum(item.type, RecipeType, RecipeType.Main);
        let recipe = null;
        if (recipeType === RecipeType.Main) {
            recipe = new InventoryRecipe();
            recipe.setDescription(item.description);
            recipe.setVariantName(item.variantName);
            recipe.setVariantValue(item.variantValue);
            recipe.setProcessingTime(item.processingTime);
            recipe.setSellingPrice(item.sellingPrice);
            recipe.setCostValue(item.costValue);
            recipe.setKitchen(item.kitchen);
            recipe.setCostPercentage(item.costPercentage);
            recipe.setItems(Utility.getListOfItems(item.items, InventoryUtilityV2.getRecipeItem));
            if (item.unitDetails != undefined) {
                recipe.setUnitDetails(InventoryUtilityV2.dbToUnit(item.unitDetails));
            }
            if (item.inventoryItems != undefined) {
                let ret = Utility.getListOfItems(item.inventoryItems, InventoryUtilityV2.getInventoryItemV2);
                recipe.setInventoryItems(ret)
            }
            if (item.recipeitems != undefined) {
                let ret = Utility.getListOfItems(item.recipeitems, InventoryUtilityV2.getInventoryItemV2);
                recipe.setRecipeitems(ret)
            }
            if (item.recipeList != undefined) {
                let ret = Utility.getListOfItems(item.recipeList, InventoryUtilityV2.getInventoryRecipe);
                recipe.setRecipeList(ret)
            }
        } else if (recipeType === RecipeType.SubRecipe) {
            recipe = new InventorySubRecipe();
            recipe.setRate(item.rate);
            recipe.setTotalValue(item.totalValue);
            recipe.setUnits(item.units);
            recipe.setItems(Utility.getListOfItems(item.items, InventoryUtilityV2.getRecipeItem));
            recipe.setUnitId(item.unitId);
            recipe.setQty(item.qty);
            recipe.setQtyUnit(item.qtyUnit);
            if (item.unitDetails != undefined) {
                recipe.setUnitDetails(InventoryUtilityV2.dbToUnit(item.unitDetails));
            }
            if (item.inventoryItems != undefined) {
                let ret = Utility.getListOfItems(item.inventoryItems, InventoryUtilityV2.getInventoryItemV2);
                recipe.setInventoryItems(ret)
            }
        } else {
            throw "Invalid DishType";
        }
        InventoryUtilityV2.setBaseRecipeProperties(recipe, item);
        return recipe;
    }

    public static getRecipeItem(item: any): RecipeItem {
        const recipeType = Utils.parseDefaultEnum(item.type, RecipeType, RecipeType.Main);
        let recipeItem: RecipeItem = new RecipeItem(recipeType);
        recipeItem.setType(recipeType);
        recipeItem.setQuantity(item.quantity);
        recipeItem.setRate(item.rate);
        recipeItem.setTotalValue(item.totalValue);
        recipeItem.setUnits(item.units);
        if (recipeType === RecipeType.Main) {
            recipeItem.setItemId(item.itemId);
            recipeItem.setStoreName(item.storeName);
            recipeItem.setStoreId(item.storeId);
            recipeItem.setItem(item.item);
        } else {
            recipeItem.setRecipeId(item.recipeId);
            recipeItem.setRecipe(item.recipe);
        }
        return recipeItem;
    }

    public static setBaseRecipeProperties(recipe: BaseRecipe, item: any) {
        recipe.setId(item.id ? item.id : item._id);
        recipe.setCreatedAt(item.createdAt);
        recipe.setRestaurantId(item.restaurantId);
        recipe.setStatus(item.status);
        recipe.setName(item.name);
        recipe.setItemId(item.itemId);
        recipe.setType(item.type);
    }

    public static dbToAllVendorList(dbVendors: any): Array<Vendor> {
        if (dbVendors != undefined && dbVendors.length > 0) {
            return Utility.getListOfItems(dbVendors, InventoryUtilityV2.dbToVednorModel);
        } else {
            return []
        }
    }

    public static dbToVednorModel(dbVendor: any): Vendor {
        let vendor: Vendor = new Vendor();
        vendor.setRestaurantId(dbVendor.restaurantId);
        vendor.setId(dbVendor.id ? dbVendor.id : dbVendor._id);
        vendor.setName(dbVendor.name ? dbVendor.name : "");
        vendor.setEmail(dbVendor.email ? dbVendor.email : "");
        vendor.setPhoneNumber1(dbVendor.phoneNumber1 ? dbVendor.phoneNumber1 : "");
        vendor.setPhoneNumber2(dbVendor.phoneNumber2 ? dbVendor.phoneNumber2 : "");
        vendor.setGstNumber(dbVendor.gstNumber ? dbVendor.gstNumber : "");
        vendor.setPurchaseActive(dbVendor.purchaseActive ? dbVendor.purchaseActive : false);
        vendor.setCreatedAt(dbVendor.createdAt ? dbVendor.createdAt : "");
        vendor.setBankAccountNumber(dbVendor.bankAccountNumber ? dbVendor.bankAccountNumber : "")
        vendor.setBankBranchName(dbVendor.bankBranchName ? dbVendor.bankBranchName : "")
        vendor.setBankIFSC(dbVendor.bankIFSC ? dbVendor.bankIFSC : "")
        vendor.setBankName(dbVendor.bankName ? dbVendor.bankName : "")
        vendor.setStatus(dbVendor.status ? dbVendor.status : ObjectStatus.Active);
        if (dbVendor.categoryList != undefined && dbVendor.categoryList.length > 0) {
            vendor.setCategory(Utility.getListOfItems(dbVendor.categoryList, InventoryUtilityV2.dbDataToStoreCategory))
        }
        vendor.setAddress(Utility.getAddress(dbVendor.address))
        if (dbVendor.contactPersonDetails && dbVendor.contactPersonDetails.length > 0) {
            vendor.setContactPersonDetails(Utility.getListOfItems(dbVendor.contactPersonDetails, InventoryUtilityV2.setPersonDetail))
        } else {
            vendor.setContactPersonDetails([])
        }
        if (dbVendor.payments && dbVendor.payments.length > 0) {
            vendor.setPayments(Utility.getOrderPaymentsData(dbVendor.payments))
        } else {

            vendor.setPayments([])
        }
        vendor.setTotalOrders(0);
        vendor.setOrderTotalAmount(0);
        return vendor;
    }
    public static setPersonDetail(item): PersonDetail {
        let user = new PersonDetail(UserType.Vendor);
        user.setPhoneNumber(item.phoneNumber);
        user.setDesignation(item.designation ? item.designation : "");
        user.setFirstName(item.firstName);
        return user;

    }
    public static dbToLocationList(dbLocationList: any): Array<InventoryLocations> {
        if (dbLocationList != undefined && dbLocationList.length > 0) {
            return Utility.getListOfItems(dbLocationList, InventoryUtilityV2.dbToLocation);
        } else {
            return []
        }
    }
    public static dbToLocation(dbLocation: any): InventoryLocations {
        let location = new InventoryLocations();
        location.setLocationName(dbLocation.locationName ? dbLocation.locationName : "");
        location.setLocationType(dbLocation.locationType ? dbLocation.locationType : "");
        location.setId(dbLocation.id ? dbLocation.id : dbLocation._id);
        location.setRestaurantId(dbLocation.restaurantId);
        return location;
    }
    public static dbToCostCenter(dbLocation: any): InventoryCostCenters {
        let location = new InventoryCostCenters();
        location.setLocationName(dbLocation.locationName ? dbLocation.locationName : "");
        location.setLocationType(dbLocation.locationType ? dbLocation.locationType : "");
        location.setId(dbLocation.id ? dbLocation.id : dbLocation._id);
        location.setRestaurantId(dbLocation.restaurantId);
        location.setCostCenterMapping(InventoryUtilityV2.dbToCostCenterMapping(dbLocation.costCenterMapping));
        return location;
    }
    public static dbToCostCenterMapping(dbCostCenterMappingArray: any): Array<InventoryCostCenterMapping> {
        let arr = new Array<InventoryCostCenterMapping>();

        if (dbCostCenterMappingArray != undefined && dbCostCenterMappingArray.length > 0) {
            for (let dbCCM of dbCostCenterMappingArray) {
                let objCCM = new InventoryCostCenterMapping();
                objCCM.setPrintTag(dbCCM.printTag ? dbCCM.printTag : "");
                objCCM.setTables(dbCCM.tables ? dbCCM.tables : []);
                arr.push(objCCM);
            }
        }
        return arr;

    }
    public static dishToInventoryItem(dish: any): InventoryRecipe {
        let recipe: InventoryRecipe = new InventoryRecipe();
        recipe.setName(dish.name);
        recipe.setSellingPrice(dish.prices ? Utility.getPrice(dish.prices) : null);
        recipe.setItemId(dish.id);
        recipe.setVariantName(dish.dishVariants)
        return recipe;
    }
    public static dishToInventoryVariantItem(dish: any): InventoryRecipe {
        let recipe: InventoryRecipe = new InventoryRecipe();
        recipe.setName(dish.name);
        if (dish.dishVariants && dish.dishVariants[0] != undefined) {
            let v = dish.dishVariants[0];
            if (v.variant && v.variant.displayName) {
                recipe.setVariantName(v.variant.displayName)
            }
            if (v.variant && v.variant.value) {
                recipe.setVariantValue(v.variant.value)
            }
            recipe.setSellingPrice(v.prices ? Utility.getPrice(v.prices) : null);
        } else {
            recipe.setSellingPrice(dish.prices ? Utility.getPrice(dish.prices) : null);
        }
        recipe.setItemId(dish.id);

        return recipe;
    }

    public static dbToInventoryResponse(dbPOList: any): Array<InventoryPurchaseOrderResponseModel> {
        if (dbPOList != undefined && dbPOList.length > 0) {

            return Utility.getListOfItems(dbPOList, InventoryUtilityV2.dbToPurchaseOrderResponseModel);
        } else {
            return []
        }

    }

    public static dbToPurchaseOrderModel(dbPO: any): InventoryPurchaseOrder {
        let model = new InventoryPurchaseOrder();
        model.setRemarks(dbPO.remarks ? dbPO.remarks : "");
        model.setOrderType(dbPO.orderType ? dbPO.orderType : "");
        model.setStatus(dbPO.status ? dbPO.status : "");
        model.setId(dbPO.id ? dbPO.id : dbPO._id);
        model.setTotalItems(dbPO.totalItems ? dbPO.totalItems : 0);
        model.setTotalTax(dbPO.totalTax ? dbPO.totalTax : 0);
        model.setRestaurantId(dbPO.restaurantId ? dbPO.restaurantId : "");
        model.setVendorId(dbPO.vendorId ? dbPO.vendorId : "");
        model.setManagerId(dbPO.managerId ? dbPO.managerId : "");
        model.setOrderDate(dbPO.orderDate ? dbPO.orderDate : "");
        model.setOrderExpectedOn(dbPO.orderExpectedOn ? dbPO.orderExpectedOn : "");
        model.setOrderRecievedOn(dbPO.orderRecievedOn ? dbPO.orderRecievedOn : "");
        model.setInvoiceNumber(dbPO.invoiceNumber ? dbPO.invoiceNumber : "");

        model.setSubTotal(dbPO.subTotal ? dbPO.subTotal : 0);
        model.setTotalAmount(dbPO.totalAmount ? dbPO.totalAmount : 0);
        model.setTotalTax(dbPO.totalTax ? dbPO.totalTax : 0);
        model.setCharges(dbPO.charges ? dbPO.charges : 0);
        if (dbPO.items != undefined && dbPO.items.length > 0) {
            model.setItems(Utility.getListOfItems(dbPO.items, InventoryUtilityV2.dbToPOItem));

        } else {
            model.setItems([]);

        }

        model.setOrderStatus(dbPO.orderStatus ? dbPO.orderStatus : 0);
        model.setPurchaseOrderNumber(dbPO.purchaseOrderNumber ? dbPO.purchaseOrderNumber : 0);

        return model;

    }

    public static dbToPOItem(dbItem): InventoryPurchaseOrderItem {
        let item = new InventoryPurchaseOrderItem();
        item.setGst(dbItem.gst ? dbItem.gst : 0)
        item.setGstAmount(dbItem.gstAmount ? dbItem.gstAmount : 0)
        item.setItemId(dbItem.itemId ? dbItem.itemId : "")
        item.setItemName(dbItem.itemName ? dbItem.itemName : "")
        item.setPrice(dbItem.price ? dbItem.price : 0)
        item.setPriceQtyUnit(dbItem.priceQtyUnit ? dbItem.priceQtyUnit : 0)
        item.setPriceQtyUnit(dbItem.priceQtyUnit ? dbItem.priceQtyUnit : 0)
        item.setPriceInclusiveTax(dbItem.priceInclusiveTax ? dbItem.priceInclusiveTax : false)
        item.setQty(dbItem.qty ? dbItem.qty : 0)
        item.setQtyRequested(dbItem.qtyRequested ? dbItem.qtyRequested : 0)
        item.setQtySubUnit(dbItem.qtySubUnit ? dbItem.qtySubUnit : "")
        item.setQtyUnit(dbItem.qtyUnit ? dbItem.qtyUnit : "")
        item.setSubTotal(dbItem.subTotal ? dbItem.subTotal : 0)
        item.setTotalAmount(dbItem.totalAmount ? dbItem.totalAmount : 0)
        item.setVariantRequested(dbItem.variantRequested ? dbItem.variantRequested : 0)
        item.setUnitId(dbItem.unitId ? dbItem.unitId : "")
        item.setVariantId(dbItem.variantId ? dbItem.variantId : "")

        return item;
    }

    // public static dbToPurchaseOrderItemModel(dbPO: any): InventoryPurchaseOrderItem {
    //     let item = new InventoryPurchaseOrderItem();
    //     item
    // }


    public static dbToPurchaseOrderResponseModel(dbLocation: any): InventoryPurchaseOrderResponseModel {
        let x = JSON.parse(JSON.stringify(InventoryUtilityV2.dbToPurchaseOrderModel(dbLocation)))
        if (dbLocation.vendors != undefined && dbLocation.vendors.length > 0) {
            let dbVendor = dbLocation.vendors[0];
            let vendor = new Vendor();
            vendor.setName(dbVendor.name ? dbVendor.name : "");
            x.vendorDetails = vendor;
        }

        return x;
    }

    // public static getInventoryStockResponse(item): ItemResponse {
    //     let response: ItemResponse = new ItemResponse();
    //     response.setName(item.name);
    //     response.setItem(InventoryUtilityV2.getInventoryItem(item));
    //     response.setCategory(item.category);
    //     response.setUnitDetails(InventoryUtilityV2.getItemUnit(item.unitsArray));
    //     response.setQuantity(item.itemCurrentStock ? item.itemCurrentStock.qty : 0);
    //     response.setQtyUnit(item.itemCurrentStock ? item.itemCurrentStock.qtyUnit : 0);
    //     response.setRate(item.itemCurrentStock ? item.itemCurrentStock.price : 0);
    //     response.setValue(item.itemCurrentStock ? (item.itemCurrentStock.qty * item.itemCurrentStock.price) : 0);
    //     if (item.categoryList && item.categoryList.length > 0) {
    //         response.setCategory(item.categoryList[0].categoryName);
    //     }
    //     return response;
    // }

    public static getInventoryStockHistory(item): ItemStock {
        let stockHistory: ItemStock = new ItemStock();
        stockHistory.setRestaurantId(item.restaurantId);
        stockHistory.setItemId(item.itemId);
        stockHistory.setId(item.id ? item.id : item._id);
        stockHistory.setType(item.type);
        stockHistory.setVendorId(item.vendorId);
        stockHistory.setChefId(item.chefId);
        stockHistory.setManagerId(item.managerId);
        stockHistory.setStockRequestDate(item.stockRequestDate);
        stockHistory.setStockApprovedBy(item.stockApprovedBy);
        stockHistory.setStockRequestedBy(item.stockRequestedBy);
        stockHistory.setStockApprovalDate(item.stockApprovalDate);
        stockHistory.setQty(item.qty);
        stockHistory.setQtyUnit(item.qtyUnit);
        stockHistory.setPrice(item.price);
        stockHistory.setPriceQtyUnit(item.priceQtyUnit ? item.priceQtyUnit : 0);
        stockHistory.setBalance(item.balance);
        stockHistory.setBalanceUnit(item.balanceUnit);
        stockHistory.setStatus(item.status);
        stockHistory.setDescription(item.description);
        stockHistory.setPurchaseDate(item.purchaseDate);
        stockHistory.setCreatedAt(item.createdAt);
        stockHistory.setVariant(item.variant);
        stockHistory.setVariantId(item.variantId ? item.variantId : "");
        stockHistory.setVariantQty(item.variantQty ? item.variantQty : "");
        stockHistory.setVariantQtyUnit(item.variantQtyUnit ? item.variantQtyUnit : "");
        return stockHistory;
    }

    public static convertUnitsToQtyUnit(units: InventoryMeasurementUnitConverstions[], currentQtyUnit: string, value: number): number {
        //compare conversionName if matches check units to n from
        for (let element of units) {
            const i = element.getUnits().findIndex(unit => currentQtyUnit === unit.getUnitName());
            return (value * element.getUnits()[i].getFactor());
        }
    }

    public static convertUnitsToMaxValue(units: InventoryMeasurementUnitConverstions[], currentQtyUnit: string, value: number): any {
        for (let element of units) {
            const index = element.getUnits().findIndex(unit => currentQtyUnit === unit.getUnitName());
            if (index > -1) {
                if (element.getUnits()[element.getUnits().length - 1].getUnitName() === currentQtyUnit) {
                    return value ? value : 0;
                } else
                    return (value / element.getUnits()[element.getUnits().length - 1].getFactor());
            } else
                return 0;
        }
    }

    public static getMaxQty(units: InventoryMeasurementUnitConverstions[], currentQtyUnit: string): any {
        for (let element of units) {
            const index = element.getUnits().findIndex(unit => currentQtyUnit === unit.getUnitName());
            if (index > -1) {
                return (element.getUnits()[element.getUnits().length - 1].getUnitName());
            }
        }
    }

    public static dbToItemStockHistory(item): Stock {
        let stockHistory: Stock = new Stock();
        if (item == undefined) {
            return stockHistory;
        }
        stockHistory.setId(item.id ? item.id : item._id);
        stockHistory.setQty(item.qty);
        stockHistory.setQtyUnit(item.qtyUnit);
        stockHistory.setPrice(item.price);
        stockHistory.setAveragePrice(item.averagePrice);
        stockHistory.setPriceQtyUnit(item.priceQtyUnit ? item.priceQtyUnit : 0);

        stockHistory.setBalance(item.balance);
        stockHistory.setStatus(item.status);
        stockHistory.setDescription(item.description);
        stockHistory.setPurchaseDate(item.purchaseDate);
        stockHistory.setCreatedAt(item.createdAt);
        return stockHistory;
    }


    public static convertAddCostCenterRequest(requestModel: InventoryLocationRequest): InventoryCostCenters {
        let costCenterModel: InventoryCostCenters = new InventoryCostCenters();
        costCenterModel.setRestaurantId(requestModel.restaurant);
        costCenterModel.setLocationName(requestModel.locationName);
        costCenterModel.setId(requestModel.id ? requestModel.id : "");
        if (costCenterModel.getLocationName() == undefined || costCenterModel.getLocationName() == "") {
            throw new Error("Bad request. Enter valid name of Cost Center.");
        }
        costCenterModel.setLocationType(LocationType.CostCenter);
        costCenterModel.setId(requestModel.id);
        costCenterModel.setCostCenterMapping(InventoryUtilityV2.convertAddCostCenterMappingRequest(requestModel))
        return costCenterModel;
    }
    public static convertAddCostCenterMappingRequest(model: InventoryLocationRequest): Array<InventoryCostCenterMapping> {
        let arr = new Array<InventoryCostCenterMapping>();
        if (model.costCenterMapping != undefined && model.costCenterMapping.length > 0) {
            model.costCenterMapping.forEach(element => {
                let ccm = new InventoryCostCenterMapping();
                ccm.setPrintTag(element.printTag ? element.printTag : "");
                ccm.setTables(element.tables ? element.tables : []);
                if (ccm.getPrintTag() == undefined || ccm.getPrintTag() == "") {
                    throw new Error("Bad request. print tag missing");
                }
                if (ccm.getTables() == undefined || ccm.getTables().length == 0) {
                    throw new Error("Bad request. Table mapping is missing for " + ccm.getPrintTag() + " Tag");
                }
                arr.push(ccm);
            });
        }
        return arr;
    }
    public static convertInventorySettingsRequest(req: InventorySettingsRequest): InventorySettings {
        let model = new InventorySettings();
        model.setPriceCalculation(req.priceCalculation ? req.priceCalculation : InventoryPriceCalculationMode.Average);
        model.setStoreForceAdjustment(req.storeForceAdjustment ? req.storeForceAdjustment : false);
        model.setCostCenterForceAdjustment(req.costCenterForceAdjustment ? req.costCenterForceAdjustment : false);
        model.setAutoTransferToCostCenter(req.autoTransferToCostCenter ? req.autoTransferToCostCenter : false);
        model.setAutoTransferToCostCenterId(req.autoTransferToCostCenterId ? req.autoTransferToCostCenterId : "");
        return model;
    }

    public static covertRatePerQTY(qty: number, price: number): number {
        let paise = price * 100;
        let pricePerQty = paise / qty
        return pricePerQty;
    }


    public static convertKitchenStockRequest(req: KitchenStockRequestModel, fromCreateTemplate?: boolean): InventoryKitchenStockModel {
        let model: InventoryKitchenStockModel = new InventoryKitchenStockModel();
        model.setId(req.id);
        model.setKitchenId(req.kitchenId);
        model.setKitchenId(req.kitchenId);
        model.setOrderCreatedOn(req.orderCreatedOn);
        model.setOrderExpectedOn(req.orderExpectedOn);
        model.setOrderRecievedOn(req.orderRecievedOn);
        model.setTxnId(req.txnId);
        model.setSaveAsTemplate(req.saveAsTemplate ? req.saveAsTemplate : false);
        model.setTemplateName(req.templateName ? req.templateName : "");
        model.setItems([]);
        if (req.items && req.items.length > 0) {
            req.items.forEach(item => {
                item.isDeleted = item.isDeleted == undefined ? false : item.isDeleted;
                if (item.itemId != undefined && item.itemId != "") {
                    if (fromCreateTemplate == undefined || fromCreateTemplate == false) {

                        if (item.variantId == undefined || item.variantId == "" || item.variantId == null) {
                            throw new Error("Bad Request. Invalid item variant.");
                        }
                        if (item.qty == undefined || item.qty <= 0) {
                            throw new Error("Bad Request. Invalid item quantity.");
                        }
                        if (item.qtyUnit == undefined || item.qtyUnit == "") {
                            throw new Error("Bad Request. Invalid item unit.");
                        }
                    }
                    let itemModel = new InventoryKitchenStockItemsModel();
                    itemModel.setItemId(item.itemId)
                    itemModel.setStoreId(item.storeId)
                    itemModel.setQty(item.qty)
                    itemModel.setQtyUnit(item.qtyUnit)
                    itemModel.setVariantId(item.variantId)
                    model.getItems().push(itemModel);
                }
            })
            if (model.getItems().length == 0) {
                throw new Error("Bad Request. add atlest one item.")
            }
        }
        return model;
    }


    public static dbToKitchenStockRequestList(dbVendors: any): Array<InventoryKitchenStockModel> {
        if (dbVendors != undefined && dbVendors.length > 0) {
            return Utility.getListOfItems(dbVendors, InventoryUtilityV2.dbToInventoryKitchenStockModel);
        } else {
            return []
        }
    }

    public static dbToInventoryKitchenStockModel(dbData: any): InventoryKitchenStockModel {
        let model = new InventoryKitchenStockModel();
        model.setId(dbData.id ? dbData.id : dbData._id);
        model.setKitchenId(dbData.kitchenId ? dbData.kitchenId : "");
        model.setRequestCreatedBy(dbData.requestCreatedBy)
        model.setRequestedByUserType(dbData.requestedByUserType ? dbData.requestedByUserType : "")
        model.setApprovedBy(dbData.approvedBy ? dbData.approvedBy : "");
        model.setIssuedBy(dbData.issuedBy ? dbData.issuedBy : "");
        model.setOrderCreatedOn(dbData.orderCreatedOn ? dbData.orderCreatedOn : "");
        model.setOrderExpectedOn(dbData.orderExpectedOn ? dbData.orderExpectedOn : "");
        model.setRequestStatus(dbData.requestStatus ? dbData.requestStatus : "");
        model.setTxnId(dbData.txnId);
        model.setTemplateName(dbData.templateName);
        if (dbData.items != undefined) {
            model.setItems(Utility.getListOfItems(dbData.items, InventoryUtilityV2.dbToInventoryKitchenStockItemsModel))
        } else {
            model.setItems([]);
        }
        //model.setRequestCreatedByUser(Utility.getEmployee(dbData.));
        if (dbData.costCenterDetails != undefined && dbData.costCenterDetails.length > 0) {
            let location = dbData.costCenterDetails[0];
            if (location != undefined) {
                model.setKitchenName(location.locationName ? location.locationName : "-");
                model.setKitchenModel(InventoryUtilityV2.dbToCostCenter(location))
            }
        }

        return model;

    }
    public static dbToInventoryKitchenStockItemsModel(dbItem: any): InventoryKitchenStockItemsModel {
        let model = new InventoryKitchenStockItemsModel();
        model.setItemId(dbItem.itemId ? dbItem.itemId : "");
        model.setQty(dbItem.qty ? dbItem.qty : 0);
        model.setQtyUnit(dbItem.qtyUnit ? dbItem.qtyUnit : 0);
        model.setStoreId(dbItem.storeId ? dbItem.storeId : "");
        model.setVariantId(dbItem.variantId ? dbItem.variantId : "");
        return model;
    }

    public static dbTOInventoryItemVariant(variant: any): ItemVariant {
        return InventoryUtilityV2.getInventoryItemVariant(variant, undefined, undefined);
    }
    public static getInventoryItemVariant(variant: any, itemId: string, restaurantId: string): ItemVariant {
        let model = new ItemVariant();

        model.setId(variant.id ? variant.id : (variant._id ? variant._id : ""));
        if (itemId == undefined || itemId == null || itemId == "") {
            model.setItemId(variant.itemId ? variant.itemId : "")
        } else {
            model.setItemId(itemId)
        }
        if (restaurantId == undefined || restaurantId == null || restaurantId == "") {
            model.setRestaurantId(variant.restaurantId ? variant.restaurantId : "")
        } else {
            model.setRestaurantId(restaurantId);
        }

        model.setVariantName(variant.variantName ? variant.variantName : "");
        model.setVariantQTY(variant.variantQTY ? variant.variantQTY : 0);
        model.setVariantQTYUnit(variant.variantQTYUnit ? variant.variantQTYUnit : "");
        model.setUnitId(variant.unitId ? variant.unitId : "");
        model.setMinStockQTY(variant.minStockQTY ? variant.minStockQTY : 0);
        model.setMaxStockQTY(variant.maxStockQTY ? variant.maxStockQTY : 0);
        model.setCurrentStock(variant.currentStock ? variant.currentStock : 0);
        model.setAveragePricePerQty(variant.averagePricePerQty ? variant.averagePricePerQty : 0);
        model.setLatestPricePerQty(variant.latestPricePerQty ? variant.latestPricePerQty : 0);
        model.setLastPurchaseDate(variant.lastPurchaseDate);

        model.setCurrentStockQTY(variant.currentStockQTY ? variant.currentStockQTY : 0);
        model.setStatus(variant.status ? variant.status : "");
        model.setCreatedAt(variant.createdAt);
        model.setItemName(variant.itemName ? variant.itemName : "");
        model.setCategoryName(variant.categoryName ? variant.categoryName : "");
        model.setCategoryId(variant.categoryId ? variant.categoryId : "");
        model.setStoreId(variant.storeId ? variant.storeId : "");
        if (variant.currentStock == undefined) {
            let stock = new Stock();
            stock.setQty(0);
            stock.setQtyUnit("");
            stock.setAveragePrice(0)
            stock.setPrice(0);
            model.setCurrentStock(stock);
        } else {
            model.setCurrentStock(InventoryUtilityV2.dbToItemStockHistory(variant.currentStock));
        }
        if (variant.initialStock == undefined) {
            let stock = new Stock();
            stock.setQty(0);
            stock.setQtyUnit("");
            model.setInitialStock(stock);
        } else {
            model.setInitialStock(InventoryUtilityV2.dbToItemStockHistory(variant.initialStock));
        }

        return model;
    }

    public static dbToCostCenterStockModelList(dbVendors: any): Array<InventoryCostCenterItemStockModel> {
        if (dbVendors != undefined && dbVendors.length > 0) {
            return Utility.getListOfItems(dbVendors, InventoryUtilityV2.dbToCostCenterStockModel);
        } else {
            return []
        }
    }
    public static dbToCostCenterStockModel(dbItem: any): InventoryCostCenterItemStockModel {
        let model = new InventoryCostCenterItemStockModel();
        model.setId(dbItem._id ? dbItem._id : dbItem.id);
        model.setKitchenId(dbItem.kitchenId ? dbItem.kitchenId : "");
        model.setItemId(dbItem.itemId ? dbItem.itemId : "");

        model.setPricePerQty(dbItem.pricePerQty ? dbItem.pricePerQty : 0);
        model.setAveragePricePerQTY(dbItem.averagePricePerQTY ? dbItem.averagePricePerQTY : 0);
        model.setRestaurantId(dbItem.restaurantId ? dbItem.restaurantId : "");

        model.setStockQty(dbItem.stockQty ? dbItem.stockQty : 0);
        model.setStockQtyUnit(dbItem.stockQtyUnit ? dbItem.stockQtyUnit : "");
        model.setUnitId(dbItem.unitId ? dbItem.unitId : 0);
        model.setDescription(dbItem.description ? dbItem.description : "");
        model.setStatus(dbItem.status ? dbItem.status : "");
        model.setCreatedAt(dbItem.createdAt ? dbItem.createdAt : "");
        model.setLastModifiedAt(dbItem.updatedAt ? dbItem.updatedAt : "");

        model.setItemName(dbItem.itemName ? dbItem.itemName : "");
        model.setCategoryName(dbItem.categoryName ? dbItem.categoryName : "");
        model.setCategoryId(dbItem.categoryId ? dbItem.categoryId : "");
        model.setStoreId(dbItem.storeId ? dbItem.storeId : "");
        model.setKitchenName(dbItem.kitchenName ? dbItem.kitchenName : "");
        if (dbItem.unitDetails != undefined) {
            model.setUnitDetails(InventoryUtilityV2.dbToUnit(dbItem.unitDetails));

        }
        if (dbItem.itemCurrentStock != undefined) {
            model.setItemCurrentStock(InventoryUtilityV2.dbToItemStockHistory(dbItem.itemCurrentStock));
        }
        return model;
    }
    public static getInventoryCostCenterStockHistory(item): InventoryCostCenterStockHistoryModel {
        let stockHistory: InventoryCostCenterStockHistoryModel = new InventoryCostCenterStockHistoryModel();
        stockHistory.setRestaurantId(item.restaurantId);
        stockHistory.setItemId(item.itemId);
        stockHistory.setKitchenId(item.kitchenId);
        stockHistory.setId(item.id ? item.id : item._id);
        stockHistory.setType(item.type);
        // stockHistory.setVendorId(item.vendorId);
        // stockHistory.setChefId(item.chefId);
        // stockHistory.setManagerId(item.managerId);
        // stockHistory.setStockRequestDate(item.stockRequestDate);
        // stockHistory.setStockApprovedBy(item.stockApprovedBy);
        // stockHistory.setStockRequestedBy(item.stockRequestedBy);
        // stockHistory.setStockApprovalDate(item.stockApprovalDate);
        stockHistory.setQty(item.qty);
        stockHistory.setQtyUnit(item.qtyUnit);
        stockHistory.setPrice(item.price);
        stockHistory.setPriceQtyUnit(item.priceQtyUnit ? item.priceQtyUnit : 0);
        stockHistory.setBalance(item.balance);
        stockHistory.setBalanceUnit(item.balanceUnit);
        stockHistory.setStatus(item.status);
        stockHistory.setDescription(item.description);
        stockHistory.setPurchaseDate(item.purchaseDate);
        stockHistory.setCreatedAt(item.createdAt);
        stockHistory.setVariantId(item.variantId);
        stockHistory.setVariantQty(item.variantQty ? item.variantQty : 0);
        stockHistory.setVariantQtyUnit(item.variantQtyUnit ? item.variantQtyUnit : "");

        stockHistory.setItemName(item.itemName ? item.itemName : "");
        stockHistory.setCategoryName(item.categoryName ? item.categoryName : "");
        stockHistory.setCategoryId(item.categoryId ? item.categoryId : "");
        stockHistory.setStoreId(item.storeId ? item.storeId : "");
        stockHistory.setKitchenName(item.kitchenName ? item.kitchenName : "");
        if (item.unitDetails != undefined) {
            stockHistory.setUnitDetails(InventoryUtilityV2.dbToUnit(item.unitDetails));

        }
        if (item.itemCurrentStock != undefined) {
            stockHistory.setItemCurrentStock(InventoryUtilityV2.dbToItemStockHistory(item.itemCurrentStock));
        }
        return stockHistory;
    }
    public static getInventoryCostCenterCategoryConsumptionModel(item): InventoryCostCenterCategoryConsumptionModel {
        let model: InventoryCostCenterCategoryConsumptionModel = new InventoryCostCenterCategoryConsumptionModel();
        model.setTotalPrice(item.totalPrice);
        model.setTotalQty(item.totalQty);
        model.setCategoryId(item._id ? item._id : item.id);
        model.setCategoryName(item.categoryName);
        if (item.items) {
            model.setItems(Utility.getListOfItems(item.items, InventoryUtilityV2.getInventoryCostCenterCategoryConsumptionItemsModel))
        }

        return model;
    }
    public static getInventoryCostCenterCategoryConsumptionItemsModel(item): InventoryCostCenterConsumptionItem {
        let model: InventoryCostCenterConsumptionItem = new InventoryCostCenterConsumptionItem();
        model.setItemId(item.itemId);
        model.setItemName(item.itemName);
        model.setItemCost(item.itemCost ? item.itemCost : 0)
        model.setItemCost(model.getItemCost() / 100);
        model.setItemQty(item.itemQty ? item.itemQty : 0)
        model.setItemQtyUnit(item.itemQtyUnit ? item.itemQtyUnit : "")
        return model;
    }


    public static getInventoryCostCenterConsumptionOrderItemModel(item): InventoryCostCenterConsumptionOrderItemModel {
        let model: InventoryCostCenterConsumptionOrderItemModel = new InventoryCostCenterConsumptionOrderItemModel();
        model.setTotalPrice(item.totalPrice);
        model.setTotalQty(item.totalQty);
        model.setOrderItemId(item.orderItemId ? item.orderItemId : "");


        return model;
    }


    public static getInventoryCostCenterStockIssueReport(item): InventoryCostCenterItemStockReportModel {
        let stockHistory: InventoryCostCenterItemStockReportModel = new InventoryCostCenterItemStockReportModel();
        stockHistory.setRestaurantId(item.restaurantId);
        stockHistory.setItemId(item.itemId);
        stockHistory.setKitchenId(item.kitchenId);
        stockHistory.setId(item.id ? item.id : item._id);

        stockHistory.setQtyUnit(item.qtyUnit);
        stockHistory.setQuantity(item.quantity);
        stockHistory.setPrice(item.price);
        stockHistory.setStatus(item.status);

        stockHistory.setCreatedAt(item.createdAt);
        stockHistory.setVariantName(item.variantName);
        stockHistory.setVariantId(item.variantId);
        stockHistory.setVariantQty(item.variantQty ? item.variantQty : 0);
        stockHistory.setVariantUnit(item.variantUnit ? item.variantUnit : "");
        stockHistory.setItemName(item.itemName ? item.itemName : "");
        stockHistory.setCategoryName(item.categoryName ? item.categoryName : "");
        stockHistory.setCategoryId(item.categoryId ? item.categoryId : "");
        stockHistory.setKitchenName(item.kitchenName ? item.kitchenName : "");
        stockHistory.setSubTotal(item.subTotal ? item.subTotal : 0);
        stockHistory.setTotalAmount(item.totalAmount ? item.totalAmount : 0);
        stockHistory.setGstAmount(item.gstAmount ? item.gstAmount : 0);
        return stockHistory;
    }
    public static getInventoryCostCenterStockReportBaseModel(data): InventoryCostCenterStockReportBaseModel {
        let stockHistory: InventoryCostCenterStockReportBaseModel = new InventoryCostCenterStockReportBaseModel();
        stockHistory.setId(data.id ? data.id : data._id);
        stockHistory.setStatus(data.status);
        stockHistory.setCreatedAt(data.createdAt);
        stockHistory.setCategoryName(data.categoryName ? data.categoryName : "");
        stockHistory.setCategoryId(data.categoryId ? data.categoryId : "");
        stockHistory.setItems(Utility.getListOfItems((data.items ? data.items : []), InventoryUtilityV2.getInventoryCostCenterStockIssueReport))
        return stockHistory;
    }



    public static getInventoryClosingStockIssueReport(item): InventoryStoreStockClosingModel {
        let stockHistory: InventoryStoreStockClosingModel = new InventoryStoreStockClosingModel();
        stockHistory.setRestaurantId(item.restaurantId);
        stockHistory.setItemId(item.itemId);
        // stockHistory.setKitchenId(item.kitchenId);
        stockHistory.setId(item.id ? item.id : item._id);

        stockHistory.setQtyUnit(item.qtyUnit);
        stockHistory.setQty(item.qty);
        stockHistory.setPriceQtyUnit(item.priceQtyUnit);
        stockHistory.setAveragePrice(item.averagePrice);
        stockHistory.setStatus(item.status);

        stockHistory.setCreatedAt(item.createdAt);
        stockHistory.setVariantName(item.variantName);
        stockHistory.setVariantId(item.variantId);
        // stockHistory.setVariantQty(item.variantQty ? item.variantQty : 0);
        stockHistory.setUnitId(item.unitId ? item.unitId : "");
        stockHistory.setItemName(item.itemName ? item.itemName : "");
        stockHistory.setCategoryName(item.categoryName ? item.categoryName : "");
        stockHistory.setCategoryId(item.categoryId ? item.categoryId : "");

        stockHistory.setVariantAveragePrice(item.variantAveragePrice ? item.variantAveragePrice : 0)
        stockHistory.setVariantLatestPrice(item.variantLatestPrice ? item.variantLatestPrice : 0)
        stockHistory.setVariantCurrentStockQTY(item.variantCurrentStockQTY ? item.variantCurrentStockQTY : 0)
        stockHistory.setVariantQTY(item.variantQTY ? item.variantQTY : 0)
        stockHistory.setVariantQTYUnit(item.variantQTYUnit ? item.variantQTYUnit : "")
        // var x  = item.categoryId ?? ""

        return stockHistory;
    }

    public static getInventoryClosingStockReportBaseModel(data): InventoryStockClosingReportBaseModel {
        let stockHistory: InventoryStockClosingReportBaseModel = new InventoryStockClosingReportBaseModel();
        stockHistory.setId(data.id ? data.id : data._id);
        stockHistory.setStatus(data.status);
        stockHistory.setCreatedAt(data.createdAt);
        stockHistory.setCategoryName(data.categoryName ? data.categoryName : "");
        stockHistory.setCategoryId(data.categoryId ? data.categoryId : "");

        let items = Utility.getListOfItems((data.items ? data.items : []), InventoryUtilityV2.getInventoryClosingStockIssueReport)
        items.sort((a, b) => a.getItemName().toLowerCase() > b.getItemName().toLowerCase() ? 1 : -1);

        for (let item of items) {
            let index = stockHistory.getItems().findIndex(i => i.getItemId().toString() == item.getItemId().toString());
            if (index == -1) {
                let newItem = new InventoryStoreStockClosingItemsModel();
                newItem.setItemId(item.getItemId());
                newItem.setItemName(item.getItemName());
                if (item.getVariantName().toLowerCase() == 'custom' && item.getQty() <= 0) {
                } else {
                    newItem.getVariants().push(item);
                }
                stockHistory.getItems().push(newItem);
            } else {
                if (item.getVariantName().toLowerCase() == 'custom' && item.getQty() <= 0) {

                } else {

                    stockHistory.getItems()[index].getVariants().push(item);
                }
            }
        }

        return stockHistory;
    }

}