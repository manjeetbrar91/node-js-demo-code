import { PaymentGatewayResponse } from '../../service-layer/models/PaymentGatewayResponse';
import { PaymentGatewayCaptureResponse } from '../../service-layer/models/PaymentGatewayCaptureResponse';

export interface IPaymentProvider {
    initiatePayment(amount: Number, receipt: string,currency:string): Promise<PaymentGatewayResponse>;
    capturePayment(payment_id: string, amount: number): Promise<PaymentGatewayCaptureResponse>;
    createTransfer(payment_id: string, transfers: any): Promise<boolean>;
    getPaymentDetailsFromGateway(paymentRefId: string): Promise<PaymentGatewayResponse>;
    verifyWebhookSignature(webhookBody: String, webhookSignature: String, webhookSecret: String): Promise<boolean>;
}