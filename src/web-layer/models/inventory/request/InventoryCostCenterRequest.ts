import { IsMongoId } from 'class-validator';

export class InventoryCostCenterRequest {
    @IsMongoId()
    restaurantId: string;
    storeId: string;
    itemName: string;
    categoryId: string;
    kitchenId: string;
    kitchenIdArray: [];
    value: string;
    page: number;
    limit: number;
    lowQuantityFilter:boolean;
}