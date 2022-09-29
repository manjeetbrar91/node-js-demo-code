import { OrderAuditLog } from "../../../service-layer/models/ecommerce/OrderAuditLog";


export interface IOrderAuditLogDBManager {
    addAuditLog(log: OrderAuditLog): Promise<OrderAuditLog>;
    getOrderAuditLogs(orderId: string): Promise<Array<OrderAuditLog>>;
}