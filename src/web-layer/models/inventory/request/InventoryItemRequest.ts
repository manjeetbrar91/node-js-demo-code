import { IsMongoId } from 'class-validator';

export class InventoryItemRequest {
    @IsMongoId()
    restaurant: string;
    storeName: Array<string>;
    itemType: Array<string>;
    category: Array<string>;
    purchaseFrom: Array<string>;
    stockableItem: Array<string>;
    page: number;
    limit: number;
    searchText: string;
}

export enum StockableItemOptions {
    Stockable = 'stockable',
    NonStockable = 'non stockable'
}