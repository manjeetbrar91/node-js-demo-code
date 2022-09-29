import { Payment, PaymentWebhookRespone } from "../../service-layer/models/Payment";

export interface IPaymentDBManager {
    addPayment(payment: Payment): Promise<Payment>;
    addWebhookPaymentLogs(payment: PaymentWebhookRespone): Promise<PaymentWebhookRespone>;
    updatePayment(id: string, payment: Payment): Promise<Payment>;
    getPaymentByOrderId(orderId: string): Promise<Payment>;
    getPaymentGatewayRefId(gatewayRefId: string): Promise<Payment>;
}