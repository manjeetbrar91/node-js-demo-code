import { OrderAuditLog } from "../../../service-layer/models/ecommerce/OrderAuditLog";

export interface IOrderAuditLogService {
    addOrderAuditLog(log: OrderAuditLog): Promise<OrderAuditLog>;
    getOrderAuditLogs(orderId: string): Promise<Array<OrderAuditLog>>;
    pushOrderAuditLogs(orderId: string, event: string,employeeId:string, employeeName:string): Promise<OrderAuditLog> 
    // pushOrderAuditLogs(order: RestaurantCustomerOrder, event: string, kotRequest?: RestaurantKOT): Promise<OrderAuditLog>;
}