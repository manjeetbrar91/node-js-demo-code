import { InventoryStockRequest } from "../../../web-layer/models/inventory/request/InventoryStockRequest";
import { InventoryStockResponse } from "../../../web-layer/models/inventory/response/InventoryStockResponse";
import { ItemStock } from "../../../service-layer/models/inventory/ItemStock";
import { InventoryStockHistoryResponse } from "../../../web-layer/models/inventory/response/InventoryStockHistoryResponse";
import { InventoryStockHistoryRequest } from "../../../web-layer/models/inventory/request/InventoryStockHistoryRequest";
import { StockHistoryResponse } from "../../../web-layer/models/inventory/response/StockHistoryResponse";

export interface IInventoryStockService {
    getItems(params: InventoryStockRequest): Promise<InventoryStockResponse>;
    addOrUpdateStockHistory(params: ItemStock): Promise<ItemStock>;
    getItemStockHistory(req: InventoryStockRequest): Promise<InventoryStockHistoryResponse>;
    getItemStockHistoryByDate(req: InventoryStockHistoryRequest): Promise<StockHistoryResponse>;
}