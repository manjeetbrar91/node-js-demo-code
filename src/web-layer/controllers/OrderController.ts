import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { IUserOrderService } from "../../service-layer/interfaces/ecommerce/IUserOrderService";
import { Constants } from "../../common/utils/Constants";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { IPaymentService } from "../../service-layer/interfaces/IPaymentService";
import { Payment, PaymentStatus } from "../../service-layer/models/Payment";
import { GetUserOrderRequestModel } from "../../web-layer/models/ecommerce/request/GetUserOrderRequestModel";
import { OrderTypeEnum } from "../../service-layer/models/ecommerce/OrderTypeEnum";
import { OrderPaymentType, OrderStatusEnum } from "../../service-layer/models/ecommerce/OrderStatusEnum";
import { RescheduleAppointmentModel } from "../../web-layer/models/ecommerce/request/RescheduleAppointmentModel";
import { MyError } from "../../common/MyError";
import { AppointmentStatusEnum } from "../../service-layer/models/ecommerce/AppointmentStatusEnum";
import { IEcommerceNotificationService } from "../../service-layer/interfaces/ecommerce/IEcommerceNotificationService";
var pdf = require('html-pdf');



@JsonController(Constants.ROUTER_PREFIX + "/user/orders")
export class OrderController {
    private readonly orderService: IUserOrderService;
    private readonly paymentService: IPaymentService;
    private readonly noticationService: IEcommerceNotificationService;

    constructor() {
        this.orderService = ServiceFactory.getUserOrderService();
        this.paymentService = ServiceFactory.getPaymentService();
        this.noticationService = ServiceFactory.getEcommerceNotificationService();
    }

    @Get("/invoice/:orderId")
    public async sendOrderInvoice(@Param("orderId") orderId: string): Promise<any> {
        // let data = await this.orderService.getOrderDetailsByOrderId(orderId);
        let x = await this.orderService.sendOrderInvoice(orderId, false);


        return new Promise((resolve, reject) => {
            pdf.create(x).toStream(function (err, stream) {
                if (err) {
                    return reject(err);
                }
                return resolve(stream);
                // stream.pipe(fs.createWriteStream('./foo.pdf'));
            });

        });
        // return x
    }
    @Get("/details/:orderId")
    public async getOrderDetailsByOrderId(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await this.orderService.getOrderDetailsByOrderId(orderId);
        this.noticationService.deleteOrderNotification(data.getUserId().toString(), data.getId().toString())
        let result = new ResultModel();
        result.setData(data)
        return result;

    }
    @Post("/list")
    public async getUserOrders(@Body() req: GetUserOrderRequestModel): Promise<ResultModel> {
        return await this.orderService.getUserOrders(req);
    }

    @Post("/validate")

    public async validateOrder(@Body() req: any): Promise<ResultModel> {
        let data = await this.orderService.validateOrder(req);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Post("/create")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async createOrder(@Body() req: any): Promise<ResultModel> {
        let data = await this.orderService.createOrder(req);
        let result = new ResultModel();

        let payment = new Payment();
        payment.setPaymentAmount(data.getTotalBill());
        payment.setOrderId(data.getId().toString())
        payment.setAccountId(data.getBusinessId());

        payment.setPaymentStatus(PaymentStatus.Initiated);
        payment.setCurrency(req.currency);
        if (data.getOrderType() != OrderTypeEnum.Appointment && data.getPaymentType() != OrderPaymentType.COD) {
            let paymentGatewayResponse = await this.paymentService.initiatePaymentWithGateway(Number(payment.getPaymentAmount().toFixed(2)), payment.getOrderId(), req.currency);
            payment.setPaymentGatewayRefId(paymentGatewayResponse.getPaymentId());
            payment = await this.paymentService.addPaymentInfoInStore(payment);
        }
        result.setData(payment);
        // await this.noticationService.newOrderNotification(data.getId().toString())
        return result;

    }

    @Get("/initiate-payment/:orderId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async initiatePayment(@Param('orderId') orderId: string): Promise<ResultModel> {
        let data = await this.orderService.getOrderDetailsByOrderId(orderId);
        if (data.getPaymentStatus() == PaymentStatus.Paid) {
            throw new MyError("Payment already done");
        }
        let result = new ResultModel();
        let payment = new Payment();
        payment.setPaymentAmount(data.getTotalBill());
        payment.setOrderId(data.getId().toString())
        payment.setAccountId(data.getBusinessId());

        payment.setPaymentStatus(PaymentStatus.Initiated);
        payment.setCurrency(data.getCurrency());
        let paymentGatewayResponse = await this.paymentService.initiatePaymentWithGateway(Number(payment.getPaymentAmount().toFixed(2)), payment.getOrderId(), data.getCurrency());
        payment.setPaymentGatewayRefId(paymentGatewayResponse.getPaymentId());
        payment = await this.paymentService.addPaymentInfoInStore(payment);
        result.setData(payment);
        return result;
    }
    @Get("/cancel/:orderId")
    public async cancelOrder(@Param("orderId") orderId: string): Promise<ResultModel> {
        let data = await this.orderService.updateChannelOrderStatus(orderId, OrderStatusEnum.Cancelled);
        let result = new ResultModel();
        result.setData(data)
        await this.noticationService.orderCancelledByCustomerNotification(data.getId().toString())
        return result;

    }
    @Get("/user-reached/:orderId/:alreadyReached")
    public async isUserAlreadyReached(@Param("orderId") orderId: string, @Param("alreadyReached") alreadyReached: boolean): Promise<ResultModel> {

        let data = await this.orderService.isAlreadyReached(orderId, alreadyReached);
        let result = new ResultModel();
        result.setData(data)
        await this.noticationService.customerReachedNotification(data.getId().toString())
        return result;

    }

    @Get("/approve-reschedule-appt/:orderId")
    public async approveRescheduleAppointment(@Param("orderId") orderId: string): Promise<ResultModel> {
        let order = await this.orderService.getOrderDetailsByOrderId(orderId);
        if (order.getOrderType() == OrderTypeEnum.Appointment) {

            order.setApptDate(order.getApptSuggestedDate());
            order.setApptTime(order.getApptSuggestedTime());
            order.setApptStatus(AppointmentStatusEnum.Approved);
            order.setChannelOrderStatus(OrderStatusEnum.Approved);
            let data = await this.orderService.updateAppointment(order);
            let result = new ResultModel();
            result.setData(data)
            await this.noticationService.appointmentAcceptedByCustomerNotification(data.getId().toString())
            return result;

        } else {
            throw new MyError("Not a valid appointment order")
        }
    }


    @Post("/rescheduleAppointment")
    public async rescheduleAppointment(@Body() req: RescheduleAppointmentModel): Promise<ResultModel> {
        if (req == undefined || req.orderId == undefined || req.apptDate == undefined || req.apptTime == undefined) {
            throw new MyError("Invalid request");
        }
        if (req.orderId == "" || req.apptDate == "" || req.apptTime == "") {
            throw new MyError("Invalid request");
        }


        let order = await this.orderService.getOrderDetailsByOrderId(req.orderId);
        if (order.getOrderType() == OrderTypeEnum.Appointment) {
            order.setApptDate(req.apptDate);
            order.setApptTime(req.apptTime);
            order.setApptRemarksByUser(req.apptRemarksByUser);
            order.setApptStatus(AppointmentStatusEnum.Created);
            let data = await this.orderService.updateAppointment(order);
            let result = new ResultModel();
            result.setData(data)
            await this.noticationService.customerRequestedRescheduleNotification(data.getId().toString())
            return result;

        } else {
            throw new MyError("Not a valid appointment order")
        }
    }
}