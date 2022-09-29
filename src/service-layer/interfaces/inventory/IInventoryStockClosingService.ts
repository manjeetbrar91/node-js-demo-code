import { InventoryStockClosingReportResponse } from "../../../service-layer/models/inventory/InventoryStockClosingReportResponse";
import { InventoryStockIssueReportModel } from "../../../web-layer/models/inventory/request/InventoryStockIssueReportModel";

export interface IInventoryStockClosingService {
    isClosingExists(date: string, restaurantId: string): Promise<boolean>
    getAllStockClosingReprot(params: InventoryStockIssueReportModel): Promise<InventoryStockClosingReportResponse> 
    generateStockClosingByRestaurantId(date: string, restaurantId: string): Promise<boolean> 
}