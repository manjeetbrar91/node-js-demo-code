import { InventoryKitchenStockResponseModel } from "../../../service-layer/models/inventory/InventoryKitchenStockResponseModel";
import { InventoryKitchenStockListRequest } from "../../../web-layer/models/inventory/request/InventoryKitchenStockListRequest";
import { InventoryKitchenStockModel } from "../../../service-layer/models/inventory/InventoryKitchenStockModel";
import { InventoryCostCenterRequest } from "../../../web-layer/models/inventory/request/InventoryCostCenterRequest";
import { InventoryCostCenterStockResponse } from "../../../service-layer/models/inventory/InventoryCostCenterStockResponse";
import { InventoryCostCenterStockHistoryRequest } from "../../../web-layer/models/inventory/request/InventoryCostCenterStockHistoryRequest";
import { InventoryCostCenterHistoryResponse } from "../../../web-layer/models/inventory/response/InventoryCostCenterHistoryResponse";
import { Item } from "../../../service-layer/models/inventory/Item";
import { InventoryCostCenterStockHistoryModel } from "../../../service-layer/models/inventory/InventoryCostCenterStockHistoryModel";
import { RestaurantCustomerOrder } from "../../../service-layer/models/RestaurantCustomerOrder";
import { InventoryCostCenterCategoryConsumptionModel } from "../../../web-layer/models/inventory/request/InventoryCostCenterCategoryConsumptionModel";
import { InventoryCostCenterConsumptionOrderItemModel } from "../../../web-layer/models/inventory/request/InventoryCostCenterConsumptionOrderItemModel";
import { InventoryStockIssueReportModel } from "../../../web-layer/models/inventory/request/InventoryStockIssueReportModel";
import { InventoryStockIssueReportResponse } from "../../../service-layer/models/inventory/InventoryStockIssueReportResponse";

export interface IInventoryCostCenterService {
    createKitchenStockRequest(req: InventoryKitchenStockModel, description?:string): Promise<InventoryKitchenStockModel>;
    getKitchenStockRequestList(req: InventoryKitchenStockListRequest, isChef: boolean): Promise<InventoryKitchenStockResponseModel>
    getKitchenStockRequestById(req: InventoryKitchenStockModel): Promise<InventoryKitchenStockModel>
    getAllCostCenterStockList(params: InventoryCostCenterRequest): Promise<InventoryCostCenterStockResponse>
    getCostCenterItemStockHistoryByDate(params: InventoryCostCenterStockHistoryRequest): Promise<InventoryCostCenterHistoryResponse>
    getCostCenterItemList(restaurantId: string, categoryId: string): Promise<Array<Item>>;
    addOrUpdateStockHistory(stock: InventoryCostCenterStockHistoryModel): Promise<InventoryCostCenterStockHistoryModel>;
    updateCostCenterStockOnOrder(orderWithKot: RestaurantCustomerOrder): Promise<any>
    getCostCenterCategoryConsumption(restaurantId: string, startDate: Date, endDate: Date): Promise<Array<InventoryCostCenterCategoryConsumptionModel>>
    getCostCenterCategoryConsumptionByOrderItems(restaurantId: string, orderItemArray: Array<string>, startDate: Date, endDate: Date): Promise<Array<InventoryCostCenterConsumptionOrderItemModel>>
    getCostCenterItemStockHistory(params: InventoryCostCenterStockHistoryRequest): Promise<InventoryCostCenterHistoryResponse>
    getInventoryTransferTemplatesList(req: InventoryKitchenStockListRequest): Promise<Array<InventoryKitchenStockModel>>
    deleteKitchenStockTransferTemplate(req: InventoryKitchenStockModel): Promise<boolean>
    createKitchenStockTransferTemplate(req: InventoryKitchenStockModel): Promise<InventoryKitchenStockModel>
    getAllStockIssueReprot(req: InventoryStockIssueReportModel): Promise<InventoryStockIssueReportResponse>

}