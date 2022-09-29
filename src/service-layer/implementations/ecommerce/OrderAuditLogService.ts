
import { ServiceFactory } from "../../../service-layer/ServiceFactory";
import { OrderAuditLog } from "../../../service-layer/models/ecommerce/OrderAuditLog";
import { IOrderAuditLogService } from "../../../service-layer/interfaces/ecommerce/IOrderAuditLogService";
import { IOrderAuditLogDBManager } from "../../../db-layer/interfaces/ecommerce/IOrderAuditLogDBManager";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";

export class OrderAuditLogService implements IOrderAuditLogService {
    private readonly orderAutidLogDBManager: IOrderAuditLogDBManager;
    // private readonly userService: IUserService;

    constructor() {
        this.orderAutidLogDBManager = DBManagerFactory.getOrderAuditLogDBManager();
        // this.userService = ServiceFactory.getUserService();
    }

    public async pushOrderAuditLogs(orderId: string, event: string,employeeId:string, employeeName:string): Promise<OrderAuditLog> {
        var log: OrderAuditLog = new OrderAuditLog();        
        log.setEmployeeId(employeeId)
        log.setEmployeeName(employeeName)
        log.setEvent(event)
        log.setOrderId(orderId)
        return await this.addOrderAuditLog(log)
    }
    // public async pushOrderAuditLogs(order: RestaurantCustomerOrder, event: string, kotRequest?: RestaurantKOT): Promise<OrderAuditLog> {
    //     var log: OrderAuditLog = new OrderAuditLog();
    //     log.setOrderId(order.getId());
    //     log.setEvent(event);
    //     log.setEmployeeType("waiter");
    //     if (order.getGeneratedBy()) {
    //         let cashier = await this.userService.getEmployeeById(order.getGeneratedBy());
    //         cashier && log.setCashierName(cashier.getFirstName());
    //     }
    //     if(kotRequest && kotRequest.getWaiterId()) {
    //         let waiter = await this.userService.getEmployeeById(kotRequest.getWaiterId());
    //         log.setEmployeeName(waiter.getFirstName());
    //         log.setEmployeeId(waiter.getId());
    //     } else if (order.getWaiterId()) {
    //         let waiter = await this.userService.getEmployeeById(order.getWaiterId());
    //         log.setEmployeeName(waiter.getFirstName());
    //         log.setEmployeeId(waiter.getId());
    //     }

    //     return await this.addOrderAuditLog(log);
    // }

    public async addOrderAuditLog(log: OrderAuditLog): Promise<OrderAuditLog> {
        return await this.orderAutidLogDBManager.addAuditLog(log);
    }

    public async getOrderAuditLogs(orderId: string): Promise<Array<OrderAuditLog>> {
        return await this.orderAutidLogDBManager.getOrderAuditLogs(orderId);
    }
}