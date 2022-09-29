import { CostCenterItemStockType } from '../../../../service-layer/models/inventory/InventoryCostCenterStockHistoryModel';

export class InventoryCostCenterStockHistoryRequestModel {
    id: string;
    itemId: string;
    restaurantId: string;
    kitchenId: string;
    type: CostCenterItemStockType;
    qtyUnit: string;
    qty: number;




}
