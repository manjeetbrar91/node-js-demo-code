import { IsMongoId } from 'class-validator';

export class InventoryStoreRequest {
    @IsMongoId()
    restaurant: string;
    storeName: string;
    id: string;
}