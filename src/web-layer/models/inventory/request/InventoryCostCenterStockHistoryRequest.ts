import { IsMongoId } from 'class-validator';
import { CostCenterItemStockType } from 'service-layer/models/inventory/InventoryCostCenterStockHistoryModel';

export class InventoryCostCenterStockHistoryRequest {
    @IsMongoId()
    restaurantId: string;
    itemId: string;
    kitchenId: string;
    kitchenIdArray: [];
    variantId: string;
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
    eventType: string
}