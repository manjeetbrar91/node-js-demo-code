import { Item } from "../../models/inventory/Item";
import { InventoryItemRequest } from "../../../web-layer/models/inventory/request/InventoryItemRequest";
import { InventoryResponse } from "../../../web-layer/models/response/inventory/InventoryResponse";
import { InventoryStoreRequest } from "../../../web-layer/models/inventory/request/InventoryStoreRequest";
import { InventoryItemTypes } from "../../../service-layer/models/inventory/ItemTypes";
import { InventoryCategoryRequest } from "../../../web-layer/models/inventory/request/InventoryCategoryRequest";
import { ItemVariant } from "../../../service-layer/models/inventory/ItemVariant";

export interface IInventoryItemService {
    addOrUpdateItem(items: Item): Promise<Item>;
    getItemById(id: string): Promise<Item>;
    getItemByName(name: string, restaurantId: string): Promise<Item>;
    getAll(restaurantId: string): Promise<Array<Item>>;
    getItems(params: InventoryItemRequest): Promise<InventoryResponse>;
    getItemCountByStoreId(req: InventoryStoreRequest): Promise<number>
    getItemCountByItemType(req:InventoryItemTypes): Promise<number>
    getItemCountByCategory(req:InventoryCategoryRequest): Promise<number>
    deleteItemVariant(req: ItemVariant): Promise<ItemVariant>
}