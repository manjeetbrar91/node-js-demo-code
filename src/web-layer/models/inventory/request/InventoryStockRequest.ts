import { IsMongoId } from 'class-validator';

export class InventoryStockRequest {
    @IsMongoId()
    restaurantId: string;
    storeId: string;
    categoryId: string;
    value: string;
    page: number;
    limit: number;
    searchText: string;
    lowQuantityFilter:boolean
}