import { Payment, PaymentWebhookRespone } from '../../service-layer/models/Payment';
import { PaymentGatewayCaptureResponse } from '../../service-layer/models/PaymentGatewayCaptureResponse';
import { PaymentGatewayResponse } from '../models/PaymentGatewayResponse';

export interface IPaymentService {
    initiatePaymentWithGateway(amount: Number, receipt: string,currency:string): Promise<PaymentGatewayResponse>;
    addWebhookPaymentLogs(payment: PaymentWebhookRespone): Promise<PaymentWebhookRespone>;
    addPaymentInfoInStore(payment: Payment): Promise<Payment>;
    updatePayment(id: string, payment: Payment): Promise<Payment>;
    verifySignature(payment: Payment): boolean;
    capturePayment(orderId: string): Promise<PaymentGatewayCaptureResponse>;
    createTransfer(payment_id: string, transfers: any): Promise<boolean>;
    getPaymentByOrderId(orderId: string): Promise<Payment>;
    getPaymentGatewayRefId(gatewayRefId: string): Promise<Payment>;
    getPaymentDetailsFromGateway(paymentRefId: string): Promise<PaymentGatewayResponse>;
    verifyWebhookSignature(webhookBody: String, webhookSignature: String, webhookSecret: String): Promise<boolean>
}