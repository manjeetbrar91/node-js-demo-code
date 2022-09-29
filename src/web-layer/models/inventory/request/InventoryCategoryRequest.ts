import { IsMongoId, Length } from 'class-validator';

export class InventoryCategoryRequest {
    @IsMongoId()
    restaurant: string;
    
    storeId: string;
    @Length(1)
    categoryName: string;
    @IsMongoId()
    id:string;
    oldName:string
}

