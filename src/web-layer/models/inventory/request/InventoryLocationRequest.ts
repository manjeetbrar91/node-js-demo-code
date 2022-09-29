import { IsMongoId } from 'class-validator';

export class InventoryLocationRequest {
    @IsMongoId()
    restaurant: string;
    @IsMongoId()
    id: string;
    locationName: string;

    costCenterMapping: Array<CostCenterMappingRequest>

}
export class CostCenterMappingRequest {
    tables: Array<string>;
    printTag: string;
}