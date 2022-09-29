import { InventoryVendorListRequest } from "../../../web-layer/models/inventory/request/InventoryVendorListRequest";
import { Vendor } from "../../../service-layer/models/inventory/Vendor";
import { InventoryVendorResponseModel } from "../../models/inventory/InventoryVendorResponseModel";
import { InventoryCategoryRequest } from "../../../web-layer/models/inventory/request/InventoryCategoryRequest";

export interface IInventoryVendorsService {
    addVendor(vendor: Vendor): Promise<Vendor>;
    updateVendor(vendor: Vendor): Promise<Vendor>;
    getAllVendors(req: InventoryVendorListRequest): Promise<InventoryVendorResponseModel>;
    getVendorsList(restaurantId: string): Promise<Array<Vendor>>;
    getVendorById(vendorId: string): Promise<Vendor>;
    getVendorCountByCategory(req: InventoryCategoryRequest): Promise<number>

}
