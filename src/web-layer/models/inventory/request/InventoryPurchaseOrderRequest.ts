import { IsArray, IsDate, IsDateString, IsDefined, IsMongoId, IsNumber, IsOptional, IsString, IsVariableWidth, validate, Validate } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
// import { PurchaseOrderStatus } from "../../../../service-layer/models/inventory/PurchaseHistory";

export class InventoryPurchaseOrderItemRequest {
    @IsMongoId()
    itemId: string;
    isDeleted: boolean;

    @IsMongoId()
    unitId: string;
    @IsNumber()
    @IsDefined()
    qtyRequested: number;
    @IsNumber()
    @IsDefined()
    qty: number;
    variantRequested: number;// 100 Gm, 1KG, errr
    qtySubUnit: string;// Pack Tin
    qtyUnit: string;// KG, Gm,Tm etc
    price: number;
    gst: number
    priceInclusiveTax: boolean;
    item: any;
    variantId: string;
}
export class InventoryPurchaseOrderRequest {
    @IsMongoId()
    @IsDefined()
    vendorId: string;
    @IsMongoId()
    @IsDefined()
    id: string;
    @IsDate()
    @IsDateString()
    orderExpectedOn: Date;
    orderRecievedOn: Date;

    invoiceNumber: string;
    remarks: string;
    orderStatus: string;
    @IsDefined()
    @IsArray()
    items: Array<InventoryPurchaseOrderItemRequest>;
    @IsNumber()
    charges: number;
}
const schemas = validationMetadatasToSchemas([]);
console.log("SCCCC ", schemas);

