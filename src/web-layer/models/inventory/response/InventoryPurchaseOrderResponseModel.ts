import { InventoryPurchaseOrder } from "../../../../service-layer/models/inventory/PurchaseOrder";
import { Vendor } from "../../../../service-layer/models/inventory/Vendor";

export class InventoryPurchaseOrderResponseModel extends InventoryPurchaseOrder {
    private vendorDetails: Vendor;

    public getVendorDetails(): Vendor {
        return this.vendorDetails;
    }

    public setVendorDetails(vendorDetails: Vendor): void {
        this.vendorDetails = vendorDetails;
    }


}