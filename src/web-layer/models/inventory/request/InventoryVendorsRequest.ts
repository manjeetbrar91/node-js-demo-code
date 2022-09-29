import { IsMongoId } from 'class-validator';
import { InventoryCategories } from '../../../../service-layer/models/inventory/StoreCategories';

export class InventoryVendorsRequest {
    @IsMongoId()
    restaurant: string;
    id: string;
    vendorName: string;
    vendorEmail: string;
    vendorPhoneNumber: string;
    vendorAltPhoneNumber: string;
    category: Array<string>;
    gstNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    vendorPurchaseActive: boolean;
    paymentType: string;
    paymentDetails: string;
    contactPersonName: string;
    contactPersonDesignation: string;
    contactPersonPhoneNumber: number;
    zipCode: number;

    bankName  : string;
    bankBranchName: string;
    bankIFSC: string;
    bankAccountNumber: string;
}