import { IsMongoId, Length } from 'class-validator';

export class InventorySubStoreRequest {
    @IsMongoId()
    restaurant: string;
    @IsMongoId()
    mainStoreId: string;
    @Length(1)    
    subStoreName: string;
    oldSubStoreName: string;
}

