import { KitchenStockRequestStatus } from '../../../../service-layer/models/inventory/InventoryKitchenStockModel';
import { Item } from '../../../../service-layer/models/inventory/Item';

export class KitchenStockRequestModel {
    id: string;
    kitchenId: string;
    orderCreatedOn: Date;
    orderExpectedOn: Date;
    orderRecievedOn: Date;
    items: Array<KitchenStockRequestItemsModel>;
    txnId: number;
    saveAsTemplate: boolean;
    templateName: string;
    requestStatus: KitchenStockRequestStatus;
}
export class KitchenStockRequestItemsModel {
    itemId: string;
    variantId: string;
    storeId: string;
    qty: number;
    qtyUnit: string; // gm ,mg, kg, Ltr etc.
    item: Item;
    unitId: string;
    selectedUnit: string;
    isDeleted: boolean;
}