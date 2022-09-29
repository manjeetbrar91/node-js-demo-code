import { IsMongoId } from 'class-validator';

export class InventoryStockHistoryRequest {
    @IsMongoId()
    restaurantId: string;
    itemId: string;
    variantId: string;
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
}