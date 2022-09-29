import { IsMongoId } from 'class-validator';
import { PurchaseOrderType } from 'service-layer/models/inventory/PurchaseHistory';

export class InventoryPurchaseOrderListRequest {
    @IsMongoId()
    restaurant: string;
    vendors: Array<string>;            
    page: number;
    limit: number;
    searchText: string;
    orderType: Array<PurchaseOrderType>;
}
 