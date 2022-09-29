import { InventoryStockClosingReportResponse } from "../../../service-layer/models/inventory/InventoryStockClosingReportResponse";
import { InventoryStockIssueReportModel } from "../../../web-layer/models/inventory/request/InventoryStockIssueReportModel";
import { InventoryStoreStockClosingModel } from "../../../service-layer/models/inventory/InventoryStoreStockClosingModel";

export interface IInventoryStoreStockClosingDBManager {
    
    isClosingExists(date: string, restaurantId: string): Promise<boolean>
    addClosing(data : Array<InventoryStoreStockClosingModel>): Promise< Array<InventoryStoreStockClosingModel>>
    getAllStockClosingReprot(params: InventoryStockIssueReportModel): Promise<InventoryStockClosingReportResponse> 
    stockClosingIdListByDate(date: string, restaurantId: string): Promise<Array<string>>
    deleteStockClosingByIdList(ids: Array<string>, restaurantId: string): Promise<Array<string>>
}