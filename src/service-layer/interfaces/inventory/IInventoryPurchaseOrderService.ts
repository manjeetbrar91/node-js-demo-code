import { InventoryPurchaseOrderListRequest } from "../../../web-layer/models/inventory/request/InventoryPurchaseOrderListRequest";
import { InventoryPurchaseOrder } from "../../../service-layer/models/inventory/PurchaseOrder";
import { InventoryPurchaseOrderResponseModel } from "../../../web-layer/models/inventory/response/InventoryPurchaseOrderResponseModel";
import { InventoryResponseModel } from "../../../service-layer/models/inventory/InventoryResponseModel";
import { Item } from "../../../service-layer/models/inventory/Item";
import { InventoryStockIssueReportModel } from "../../../web-layer/models/inventory/request/InventoryStockIssueReportModel";
import { InventoryPOReportResponse } from "../../../service-layer/models/inventory/InventoryPOReportResponse";

export interface IInventoryPurchaseOrderService {
    addPO(requestModel: InventoryPurchaseOrder, isUpdate: boolean, sendMail:boolean): Promise<InventoryPurchaseOrder>;
    deletePO(requestModel: InventoryPurchaseOrder): Promise<InventoryPurchaseOrder>;
    closePO(requestModel: InventoryPurchaseOrder): Promise<InventoryPurchaseOrder>;
    getPurchaseOrderList(req: InventoryPurchaseOrderListRequest): Promise<InventoryResponseModel<InventoryPurchaseOrderResponseModel>>
    getItemList(restaurantId: string, categoryId: string): Promise<Array<Item>>
    gePurchaseOrderCountByVendorId(vendorId:string,restaurantId:string): Promise<number>
    getPurchaseReprot(params: InventoryStockIssueReportModel): Promise<InventoryPOReportResponse>
    getPurchaseVoucherWiseReport(params: InventoryStockIssueReportModel): Promise<InventoryPOReportResponse>
}
