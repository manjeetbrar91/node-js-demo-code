import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { AppointmentStatusEnum } from "../../service-layer/models/ecommerce/AppointmentStatusEnum";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { IEcommerceNotificationService } from "../../service-layer/interfaces/ecommerce/IEcommerceNotificationService";
import { IUserOrderService } from "../../service-layer/interfaces/ecommerce/IUserOrderService";
import { OrderPaymentType, OrderStatusEnum } from "../../service-layer/models/ecommerce/OrderStatusEnum";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { RescheduleAppointmentModel } from "../../web-layer/models/ecommerce/request/RescheduleAppointmentModel";
import { GetUserOrderRequestModel } from "../models/ecommerce/request/GetUserOrderRequestModel";



@JsonController(Constants.ROUTER_PREFIX + "/business/orders")
export class BusinessOrderController {
    private readonly orderService: IUserOrderService;
    // private readonly paymentService: IPaymentService;
    private readonly noticationService: IEcommerceNotificationService;

    constructor() {
        this.orderService = ServiceFactory.getUserOrderService();
        // this.paymentService = ServiceFactory.getPaymentService();
        this.noticationService = ServiceFactory.getEcommerceNotificationService();
    }


    @Get("/details/:orderId")
    public async getBusinessOrderDetailsByOrderId(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await this.orderService.getBusinessOrderDetailsByOrderId(orderId);
        let userId = await this.noticationService.getBusinessOwnerId(data.getBusinessId().toString())
        if (userId != undefined && userId.toString() != "") {
            this.noticationService.deleteOrderNotification(userId.toString(), data.getId().toString())
        }
        let result = new ResultModel();
        result.setData(data)
        return result;

    }
    @Get("/logs/:orderId")
    public async getOrderLogs(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await ServiceFactory.getOrderAuditLogService().getOrderAuditLogs(orderId);

        let result = new ResultModel();
        result.setData(data)
        return result;

    }
    @Get("/accept/:orderId")
    public async acceptOrder(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await this.orderService.updateChannelOrderStatus(orderId, OrderStatusEnum.Approved);
        await this.noticationService.orderAcceptedNotification(orderId);
        await this.orderService.sendOrderInvoice(orderId, true)
        let result = new ResultModel();
        result.setData(data)
        return result;

    }
    @Get("/reject/:orderId")
    public async rejectOrder(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await this.orderService.updateChannelOrderStatus(orderId, OrderStatusEnum.Rejected);
        await this.noticationService.orderRejectedNotification(orderId);
        let result = new ResultModel();
        result.setData(data)
        return result;

    }

    @Post("/list")
    public async getBusinessOrders(@Body() req: GetUserOrderRequestModel): Promise<ResultModel> {
        return await this.orderService.getBusinessOrders(req);
    }
    @Post("/updateStatus")
    public async updateOrderStatus(@Body() req: any): Promise<ResultModel> {
        if (req == undefined || req.orderId == undefined || req.status == undefined) {
            throw new MyError("Invalid request");
        }
        let data = await this.orderService.updateChannelOrderStatus(req.orderId, req.status);
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.orderId, req.status, req.employeeId, req.employeeName);
        }
        let result = new ResultModel();
        result.setData(data)
        if (req.status == OrderStatusEnum.ReadyForPickUp) {
            await this.noticationService.orderReadyForPickupNotification(req.orderId);
        }
        if (req.status == OrderStatusEnum.Picked) {
            await this.noticationService.orderPickedNotification(req.orderId);
        }
        if (req.status == OrderStatusEnum.Delivered) {
            await this.noticationService.orderDeliveredNotification(req.orderId);

        }
        if (req.status == OrderStatusEnum.OutForDelivery) {
            await this.noticationService.orderOutForDeliveryNotification(req.orderId);

        }
        if (req.status == OrderStatusEnum.Dispatched) {
            await this.noticationService.orderDispatchedNotification(req.orderId);
        }

        return result;
    }

    @Post("/rescheduleAppointment")
    public async rescheduleAppointment(@Body() req: RescheduleAppointmentModel): Promise<ResultModel> {
        if (req == undefined || req.orderId == undefined || req.apptSuggestedDate == undefined || req.apptSuggestedTime == undefined) {
            throw new MyError("Invalid request");
        }
        if (req.orderId == "" || req.apptSuggestedDate == "" || req.apptSuggestedTime == "") {
            throw new MyError("Invalid request");
        }

        let data = await this.orderService.rescheduleAppointmentBusiness(req);
        await this.noticationService.businessRequestedRescheduleNotification(req.orderId);
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.orderId, AppointmentStatusEnum.Rescheduled, req.employeeId, req.employeeName);
        }
        let result = new ResultModel();
        result.setData(data)
        return result;
    }
    @Get("/request-payment/:orderId")
    public async requestOrderPayment(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await this.orderService.updateChannelOrderStatus(orderId, OrderStatusEnum.PaymentRequested);
        await this.noticationService.paymentRequestNotification(orderId);
        let result = new ResultModel();
        result.setData(data)
        return result;

    }
    @Post("/update")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateOrder(@Body() req: any): Promise<ResultModel> {
        req.paymentType = OrderPaymentType.COD
        let data = await this.orderService.createOrder(req, true);
        let result = new ResultModel();
        result.setData(await this.orderService.getOrderDetailsByOrderId(req.id))
        await this.noticationService.orderUpdatedByBusinessNotification(req.id);
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.id, "Order Updated", req.employeeId, req.employeeName);
        }
        return result;
    }
    @Post("/create")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async createOrder(@Body() req: any): Promise<ResultModel> {
        req.fromBusiness = true;
        let data = await this.orderService.createOrder(req);

        let x = await this.orderService.updateChannelOrderStatus(data.getId().toString(), OrderStatusEnum.Approved);
        await this.noticationService.orderAcceptedNotification((data.getId().toString()));
        await this.orderService.sendOrderInvoice(data.getId().toString(), true)
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.orderId, "Order Placed", req.employeeId, req.employeeName);
        }
        let result = new ResultModel();
        result.setData(data)

        return result;

    }
    @Post("/accept")
    public async acceptOrderPost(@Body() req: any): Promise<ResultModel> {
        if (req.orderId == undefined || req.orderId == "") {
            throw new MyError("Order id is required")
        }
        let data = await this.orderService.updateChannelOrderStatus(req.orderId, OrderStatusEnum.Approved);
        await this.noticationService.orderAcceptedNotification(req.orderId);
        await this.orderService.sendOrderInvoice(req.orderId, true)
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.orderId, OrderStatusEnum.Approved, req.employeeId, req.employeeName);
        }
        let result = new ResultModel();
        result.setData(data)
        return result;

    }
    @Post("/reject")
    public async rejectOrderPost(@Body() req: any): Promise<ResultModel> {
        if (req.orderId == undefined || req.orderId == "") {
            throw new MyError("Order id is required")
        }
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.orderId, OrderStatusEnum.Rejected, req.employeeId, req.employeeName);
        }
        let data = await this.orderService.updateChannelOrderStatus(req.orderId, OrderStatusEnum.Rejected);
        await this.noticationService.orderRejectedNotification(req.orderId);
        let result = new ResultModel();
        result.setData(data)
        return result;

    }
}