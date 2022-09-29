import { SubStore } from "../../../service-layer/models/inventory/SubStore";
import { InventoryStore } from "../../../service-layer/models/inventory/InventoryStore";
import { InventoryItemTypes } from "../../../service-layer/models/inventory/ItemTypes";
import { InventoryMeasurementUnits } from "../../../service-layer/models/inventory/MeasurementUnits";
import { InventoryMeasurementUnitConverstions } from "../../../service-layer/models/inventory/MeasurementUnitConverstions";
import { City, States } from "../../../service-layer/models/StateModel";
import { Country } from "../../../service-layer/models/CountryModel";
import { InventoryLocations, LocationType } from "../../../service-layer/models/inventory/InventoryLocations";
import { InventoryCategoryRequest } from "../../../web-layer/models/inventory/request/InventoryCategoryRequest";
import { DeleteInventoryStores } from "../../../web-layer/models/inventory/request/DeleteInventoryStores";
import { InventorySubStoreRequest } from "../../../web-layer/models/inventory/request/InventorySubStoreRequest";
import { InventoryCostCenters } from "../../../service-layer/models/inventory/InventoryCostCenters";
import { InventorySettings } from "../../../service-layer/models/InventorySettings";
import { Restaurant, RestaurantSessionSettings } from "../../../service-layer/models/Restaurant";

export interface IInventoryStoreService {
    getCountryList(): Promise<Array<Country>>
    getAllState(countryId: string, populateCity: boolean): Promise<Array<States>>
    getCityList(countryId: string, stateId: string,): Promise<Array<City>>
    addStore(store: InventoryStore, update: boolean): Promise<InventoryStore>;
    addSubStore(subStoreName: String, mainStore: InventoryStore): Promise<InventoryStore>;
    addMainStoreCategory(req: InventoryCategoryRequest): Promise<InventoryStore>;
    updateMainStoreCategory(req: InventoryCategoryRequest): Promise<InventoryStore>;
    deleteMainStoreCategory(req: InventoryCategoryRequest): Promise<InventoryStore>;
    getAllStores(restaurantId: string): Promise<Array<InventoryStore>>;
    getAllSettings(restaurantId: string): Promise<any>;
    getSettings(restaurantId: string): Promise<any>;
    getAllSubStoresByMainStoreId(storeId: string, restaurantId: string): Promise<Array<SubStore>>;
    addItemType(itemType: InventoryItemTypes): Promise<InventoryItemTypes>;
    addUOM(uom: InventoryMeasurementUnits): Promise<InventoryMeasurementUnits>;
    addUOMConversion(uomc: InventoryMeasurementUnitConverstions): Promise<InventoryMeasurementUnitConverstions>;
    getAllItemTypes(restaurantId: string): Promise<Array<InventoryItemTypes>>;
    getAllUnits(): Promise<Array<InventoryMeasurementUnitConverstions>>;
    addLocation(location: InventoryLocations): Promise<InventoryLocations>;
    getLocations(restaurantId: string, type: LocationType): Promise<Array<InventoryLocations>>;
    updateLocation(location: InventoryLocations): Promise<InventoryLocations>;
    getLocationsById(id: string, restaurantId: string): Promise<InventoryLocations>
    deleteMultipleLocations(updateLocations: Array<string>, accountId: string): Promise<Array<string>>
    deleteMultipleItemType(updateLocations: Array<string>, accountId: string): Promise<Array<string>>
    deleteMultipleStores(req: DeleteInventoryStores, accountId: string): Promise<Array<string>>
    updateSubStore(req: InventorySubStoreRequest): Promise<InventorySubStoreRequest>;
    addCostCenter(costCenter: InventoryCostCenters): Promise<InventoryCostCenters>;
    updateCostCenter(costCenter: InventoryCostCenters): Promise<InventoryCostCenters>;
    getCostCenterList(restaurantId: string, type: LocationType): Promise<Array<InventoryCostCenters>>
    getCostCenterCountByPrintTag(restaurantId, tag: string, tables: Array<string>, costCenterId: string): Promise<number>
    updateInventorySettings(restaurantId: string, settings: InventorySettings): Promise<Restaurant>;
    getCostCenterListForChef(restaurantId: string, userId: string, type: LocationType): Promise<Array<InventoryCostCenters>>
    getCostCenterListByPrintTag(restaurantId: string,tags: Array<string>): Promise<Array<InventoryCostCenters>> 
    updateSessionSettings(restaurantId: string, settings: Array<RestaurantSessionSettings>): Promise<Restaurant>
}
