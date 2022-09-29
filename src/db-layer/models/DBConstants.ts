
export class DBConstants {
    
    public static readonly defaultSequenceNumberPreFix: string = "A";
    public static readonly paymentStatusPending: string = "pending";
    public static readonly paymentStatusPaid: string = "paid";

    public static readonly defaultSortingField: string = "updatedAt";
    public static readonly defaultSortingOrder: number = -1;
    public static readonly defaultOffset: number = 0;
    public static readonly defaultLimit: number = 20;
    
    public static readonly BusinessCollection: string = "businesses";
    public static readonly UserWishListCollection: string = "userwishlist";
    public static readonly ProductCollection: string = "products";
    public static readonly ProductRatingReviewCollection: string = "productratingreview";
    public static readonly ProductVariantsCollection: string = "productvariants";
    public static readonly CategoryCollection: string = "category";
    public static readonly SubCategoryCollection: string = "subcategory";
    public static readonly UserDeliveryAddressCollection : string = "userdeliveryaddress";
    public static readonly VehicleOwnersCollection : string = "vehicleowner";
    public static readonly StationOwnersCollection : string = "stationowner";
    public static readonly UserOrdersCollection: string = "orders";
    public static readonly NotificationsCollection: string = "notifications";
    public static readonly DevicesNotificationsCollection: string = "devices";
    public static readonly OrderAuditLogCollection: string = "orderauditlogs";
    public static readonly ECommerceCommisionSettings: string = "ecommercecommisionsettings";
    public static readonly BusinessDiscountsCollection: string = "businessdiscounts";
    public static readonly FuelDiscountsCollection: string = "fueldiscounts";
    public static readonly BusinessUsersCollection: string = "businessusers";
    




    public static readonly FuelStation: string = "fuelstation";
    public static readonly BusinessOwners: string = "businessowners";
    public static readonly activeStatus: string = "active";
    public static readonly inActiveStatus: string = "inactive";
    public static readonly blockedStatus: string = "active";
    public static readonly deletedStatus: string = "deleted";
    

    public static readonly RestaurantChainsCollection: string = "RestaurantChains";
    public static readonly RestaurantsCollection: string = "Restaurants";
    public static readonly TablesCollection: string = "Tables";
    public static readonly TablesSectionCollection: string = "TableSection";
    public static readonly FiltersCollection: string = "Filters";
    public static readonly EmployeesCollection: string = "Employees";
    public static readonly EmployeesAuditLogCollection: string = "EmployeeAuditLog";
    public static readonly EditKOTLogCollection: string = "EditKotLog";
    public static readonly RestaurantAuditLogCollection: string = "RestaurantAuditLog";
    public static readonly UserSessionsCollection: string = "UserSessions";
    public static readonly RestaurantDishesCollection: string = "RestaurantDishes";
    public static readonly ExtendedTypesCollection: string = "ExtendedTypes";
    public static readonly RestaurantDishesCollectionV2: string = "RestaurantDishesV2";
    public static readonly CustomersCollection: string = "Customers";
    public static readonly CustomerGroupCollection: string = "CustomerGroups";
    public static readonly QRCodesCollection: string = "QRCodes";
    public static readonly CanteenEmployeesCollection: string = "CanteenEmployees";
    public static readonly RestaurantKotsCollection: string = "RestaurantKots";
    public static readonly OrderFeedback: string = "Feedback";
    public static readonly DishSpecialsCollection: string = "DishSpecials";
    public static readonly RestaurantComboCollection: string = "RestaurantCombo";
    public static readonly RestaurantPromotionsCollection: string = "RestaurantPromotions";
    public static readonly UserPromotionOpticsCollection: string = "UserPromotionOptics";
    public static readonly ResTopicMappingCollection: string = "RestaurantTopicMapping";
    public static readonly FamilyCollection: string = "Family";
    public static readonly AddonsGroupCollection: string = "AddonGroup";
    public static readonly RestaurantPaymentCollection: string = "RestaurantPayments";
    public static readonly InventoryIngredientCollection: string = "Ingredients";
    public static readonly IngredientInventoryRecordsCollection: string = "IngredientsRecords";
    public static readonly ItemRecipeCollection: string = "ItemRecipe";
    public static readonly LoyaltyPointsCollection: string = "LoyaltyPointRules";
    public static readonly EventOfPointsCollection: string = "EventOfPoints";
    public static readonly GeneratedPointsCollection: string = "GeneratedPoints";
    public static readonly PaymentCollection: string = "Payment";
    public static readonly PaymentLogsCollection: string = "PaymentLogs";
    public static readonly RestaurantbillCollection: string = "OrderBills";
    public static readonly MenewBillCollection: string = "MenewBills";
    public static readonly HostsCollection: string = "Hosts";
    public static readonly DeliverySettingsCollection: string = "DeliverySettings";
    public static readonly DeliveryExecutivesCollection: string = "DeliveryExecutives";
    public static readonly CounterCollection: string = "Counters";
    public static readonly KitchenDisplayMappingCollection: string = "KitchenDisplayMapping";

    public static readonly RestaurantPrintersCollection: string = "RestaurantPrinters";
    public static readonly RestaurantSettingsCollection: string = "RestaurantSettings";
    public static readonly RestaurantThemeCollection: string = "RestaurantTheme";
    public static readonly RestaurantShiftCollection: string = "RestaurantShift";
    public static readonly RolePermissionMappingCollection: string = "RolePermissionMapping";
    public static readonly PermissionCollection: string = "Permissions";
    public static readonly RolesCollection: string = "Roles";
    public static readonly DeviceSubscriptionsCollection: string = "DeviceSubscriptions";
    public static readonly PrintSettingsCollection: string = "PrintSettings";
    public static readonly PrinterMappingCollection: string = "PrinterMapping";
    public static readonly GooglePrintersCollection: string = "GooglePrinters";
    public static readonly KOTCounterCollection: string = "KOTCounter";
    public static readonly ChannelCollection: string = "paymentchannels";
    public static readonly ProductTagsCollection: string = "ProductTags";
    public static readonly TemplateCollection: string = "Templates";

    public static readonly DeliveryTasksCollection: string = "DeliveryTasks";
    public static readonly TableReservationsCollection: string = "TableReservations";
    // public static readonly CategoryCollection: string = "Category";
    public static readonly AddOnGroupCollectionV2: string = "AddOnGroupV2";
    public static readonly RestaurantSMSSettingCollection: string = "RestaurantSMSSetting";
    public static readonly RestaurantSMSLogCollection: string = "RestaurantSMSLog";
    public static readonly MenewCommisionSettingCollection: string = "MenewCommisionSetting";
    public static readonly RestaurantCommisionSettingCollection: string = "RestaurantCommisionSetting";
    public static readonly RestaurantSessionsCollection: string = "RestaurantSessions";
    public static readonly MenewRevenueCollection: string = "MenewRevenue";
    public static readonly RestaurantThemeSettingsCollection: string = "RestaurantThemeSettings";

    public static readonly BanditArmsDataCollection: string = "BanditArmsData";
    public static readonly RecommendationOpticsCollection: string = "RecommendationOptics";

    public static readonly status: string = "status";
    public static readonly roles: string = "roles";
    public static readonly accountId: string = "accountId";
    public static readonly all: string = "all";
    public static readonly orderCounter: string = "ordercounter";
    public static readonly pendingPaymentStatus: string = "pending";
    public static readonly paidPaymentStatus: string = "paid";

    public static readonly defaultSequenceNumber: number = 1; 
    public static readonly AccountTypeRestaurant: string = "restaurant";
    public static readonly RestaurantTypeCloudKitchen: string = "CloudKitchen";
    public static readonly RestaurantTypeTheatre: string = "Theatre";

    public static readonly items = "items";
    public static readonly combos = "combos";
    public static readonly orderedDishes = "orderedDishes";
    public static readonly TableCounter = "tableCounter";

    public static readonly ASCsorting: number = 1;
    public static readonly DESCsorting: number = -1;
    public static readonly defaultPage: number = 1;

    public static readonly InventoryStoreCollection: string = "inventoryStores";
    public static readonly InventoryItemType: string = "inventoryItemTypes";
    public static readonly InventoryUnitMeasurementConverstion: string = "inventoryuomconverstion";
    public static readonly StatesCollection: string = "states";
    public static readonly CountryCollection: string = "countries";
    public static readonly InventoryMeasurementUnit: string = "inventoryUOM";
    public static readonly InventoryItemCollection: string = "inventoryitems";
    public static readonly InventoryItemVariantCollection: string = "inventoryitemvariants";
    public static readonly InventoryRecipesCollection: string = "inventoryRecipes";
    public static readonly InventoryVendorsCollection: string = "inventoryvendors";
    public static readonly InventoryLocationCollection: string = "inventorylocations";
    public static readonly InventoryPurchaseOrderCollection: string = "inventorypurchaseorder";
    public static readonly InventoryCategoryCollection: string = "inventorycategories";
    public static readonly InventoryStockHistoryCollection: string = "inventorystockhistory";
    public static readonly InventoryStockClosingCollection: string = "inventorystockclosing";
    public static readonly OTPTemplateId: string = "1707161183132226798";
    public static readonly InventoryKitchenStockCollection: string = "inventorykitchenstocks";
    public static readonly InventoryCostCenterStockCollection: string = "inventorycostcenterstock";
    public static readonly InventoryCostCenterStockHistoryCollection: string = "inventorycostcenterstockhistories";
    public static readonly TinyURLCollection: string = "tinyurl";
    public static readonly InventoryStockTransferTemplatesCollection: string = "inventorystocktransfertemplates";
}
