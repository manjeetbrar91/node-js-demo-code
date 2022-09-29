import { Body, HeaderParams, JsonController, Post } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { Utility } from "../../common/utils/Utility";
import { IEcommerceNotificationService } from "../../service-layer/interfaces/ecommerce/IEcommerceNotificationService";
import { IUserOrderService } from "../../service-layer/interfaces/ecommerce/IUserOrderService";
import { IPaymentService } from "../../service-layer/interfaces/IPaymentService";
import { AppointmentStatusEnum } from "../../service-layer/models/ecommerce/AppointmentStatusEnum";
import { CustomerOrderModel } from "../../service-layer/models/ecommerce/CustomerOrderModel";
import { OrderStatusEnum } from "../../service-layer/models/ecommerce/OrderStatusEnum";
import { OrderTypeEnum } from "../../service-layer/models/ecommerce/OrderTypeEnum";
import { OrderPayment } from "../../service-layer/models/OrderPayment";
import { Payment, PaymentStatus, WebhookEvents } from "../../service-layer/models/Payment";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";


@JsonController(Constants.ROUTER_PREFIX + "/payment")
export class PaymentController {
    private readonly orderService: IUserOrderService;
    private readonly paymentService: IPaymentService;
    private readonly noticationService: IEcommerceNotificationService;

    constructor() {
        this.orderService = ServiceFactory.getUserOrderService();
        this.paymentService = ServiceFactory.getPaymentService();
        this.noticationService = ServiceFactory.getEcommerceNotificationService();
    }

    @Post("/update-payment-status")
    public async updatePaymentStatus(@Body() req: any): Promise<ResultModel> {
        if (req.orderId == undefined || req.orderId == "") {
            throw new MyError("Order id is required")
        }
        let paymentMethod = req.paymentMethod ? req.paymentMethod : "Cash"
        let exsitingOrder = await this.orderService.getOrderDetailsByOrderId(req.orderId.toString());
        if (exsitingOrder == undefined) {
            throw new MyError("Order not found")
        }
        let order: CustomerOrderModel = new CustomerOrderModel();
        order.setId(req.orderId);

        let orderPayment: OrderPayment = new OrderPayment();

        orderPayment.setPaymentAmount(exsitingOrder.getTotalBill());
        orderPayment.setPaymentDetails("");
        orderPayment.setPaymentMethod(paymentMethod)


        let orderPaymentArray = new Array();
        orderPaymentArray.push(orderPayment);

        order.setPayments(orderPaymentArray);
        order.setPaymentStatus("paid");
        order.setTransactionType("Cash");
        
        if (req.fromCreateOrder == undefined || req.fromCreateOrder !== true) {
            if(exsitingOrder.getOrderType() == OrderTypeEnum.Appointment){
                order.setChannelOrderStatus(OrderStatusEnum.Completed);
            }else{
                order.setChannelOrderStatus(OrderStatusEnum.Delivered);
            }
            order.setOrderStatus("closed")
        }


        let paymentResult = await this.orderService.updateOrderPaymentStatus(exsitingOrder.getId().toString(), order);
        console.log(paymentResult);

        let result = new ResultModel();
        result.setData(paymentResult)
        if (req.employeeId) {
            await ServiceFactory.getOrderAuditLogService().pushOrderAuditLogs(req.orderId, "Payment Updated", req.employeeId, req.employeeName);
        }
        return result;

    }
    // 9834398wewe8989344
    @Post("/webhook")
    public async verifyOrderPayment(@Body() req: any, @HeaderParams() headers: any): Promise<boolean> {
        let reqBody = JSON.stringify(req);
        console.log(reqBody);

        let signature = headers["x-razorpay-signature"];
        new Payment();
        let result: boolean = await this.paymentService.verifyWebhookSignature(reqBody, signature, "9834398wewe8989344")
        // if (result == true) {
        let payment = Utility.getPaymentV1(req);
        payment.setVerified(result);
        if (req.payload && req.payload.payment && req.payload.payment.entity) {
            //let paymentBody = req.payload.payment.entity;
            if (payment.getPaymentOrderId()) {
                //Update order payment status
                let paymentDetails = await this.paymentService.getPaymentGatewayRefId(payment.getPaymentOrderId());
                let paymentStatus = payment.getPaymentStatus()
                payment.setBasePayment(paymentDetails);
                payment.setPaymentStatus(paymentStatus);
                let logs = await this.paymentService.addWebhookPaymentLogs(payment)
                // paymentDetails.get
                paymentDetails.setPostPaymentRefId(payment.getPaymentId())
                paymentDetails.setPaymentGatewaySignature(payment.getPaymentGatewaySignature())
                // payment.setPaymentStatus(payment.getEventStatus());
                // paymentDetails.setPaymentStatus(payement.eventStatus)
                paymentDetails.setPaymentStatusRaw(payment.getEventStatus());
                let x = await this.paymentService.updatePayment(paymentDetails.getId(), paymentDetails);
                if (payment.getEvent() == WebhookEvents.Authorized) {
                    let exsitingOrder = await this.orderService.getOrderDetailsByOrderId(paymentDetails.getOrderId().toString());
                    if (exsitingOrder) {
                        if (exsitingOrder.getPaymentStatus() != PaymentStatus.Paid) {
                            let order: CustomerOrderModel = new CustomerOrderModel();
                            order.setId(paymentDetails.getOrderId());

                            let orderPayment: OrderPayment = new OrderPayment();
                            if (isNaN(parseInt(payment.getAmount())) == false) {
                                orderPayment.setPaymentAmount(parseInt(payment.getAmount()) / 100);
                                orderPayment.setPaymentDetails(payment.getPaymentId());
                                orderPayment.setPaymentMethod("Razorpay")
                                let orderPaymentArray = new Array();
                                orderPaymentArray.push(orderPayment);
                                order.setPayments(orderPaymentArray);
                                order.setPaymentStatus("paid");
                                if (exsitingOrder.getOrderType() == OrderTypeEnum.Appointment) {
                                    order.setChannelOrderStatus(OrderStatusEnum.Completed);
                                    order.setApptStatus(AppointmentStatusEnum.Completed);
                                } else {
                                    order.setChannelOrderStatus(OrderStatusEnum.Placed);
                                    await this.noticationService.newOrderNotification(exsitingOrder.getId().toString())
                                }
                                order.setTransactionType(payment.getMethod());
                                let paymentResult = await this.orderService.updateOrderPaymentStatus(order.getId().toString(), order);
                                console.log(paymentResult);
                            }
                        }
                    }

                }
                if (payment.getEvent() == WebhookEvents.Captured) {

                }
                if (payment.getEventStatus() == WebhookEvents.Failed) {

                }
                if (result == true) {

                }
            }
        }



        return result;
        // return new Payment();
    }
}