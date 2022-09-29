import { Utils } from '../../common/utils/Utils';
import { Config } from '../../config/Config';
import { DBManagerFactory } from '../../db-layer/DataAccessLayerFactory';
import { IPaymentDBManager } from '../../db-layer/interfaces/IPaymentDBManager';
import { IPaymentProvider } from '../../db-layer/interfaces/IPaymentProvider';
import { logger } from '../../logs';
import { Payment, PaymentWebhookRespone } from '../../service-layer/models/Payment';
import { PaymentGatewayCaptureResponse } from '../../service-layer/models/PaymentGatewayCaptureResponse';

import { IPaymentService } from '../interfaces/IPaymentService';
import { PaymentGatewayResponse } from '../models/PaymentGatewayResponse';
export class PaymentService implements IPaymentService {

    private paymentProvider: IPaymentProvider;
    private paymentDBManager: IPaymentDBManager;

    private paymentGatewaySecret: string;

    constructor() {
        this.paymentProvider = DBManagerFactory.getPaymentProvider();
        this.paymentDBManager = DBManagerFactory.getPaymentDBManager();
        this.paymentGatewaySecret = Config.getInstance().getPaymentProviderSecret();

    }

    initiatePaymentWithGateway(amount: Number, receipt: string,currency:string): Promise<PaymentGatewayResponse> {
        return this.paymentProvider.initiatePayment(amount, receipt,currency);
    }

    public async getPaymentDetailsFromGateway(paymentRefId: string): Promise<PaymentGatewayResponse> {
        return await this.paymentProvider.getPaymentDetailsFromGateway(paymentRefId);
    }

    public async addWebhookPaymentLogs(payment: PaymentWebhookRespone): Promise<PaymentWebhookRespone> {

        return this.paymentDBManager.addWebhookPaymentLogs(payment);
    }
    public async capturePayment(orderId: string): Promise<PaymentGatewayCaptureResponse> {

        let razorPayPayments;

        let payments = [];//order.getPayments();
        let updated = false;
        if (payments && payments.length > 0) {
            for (let payment of payments) {
                if (payment.getPaymentMethod() === 'Razorpay') {
                    if (payment.getPaymentAmount() == null || payment.getPaymentAmount() == undefined) {
                        let paymentDetails = await this.getPaymentByOrderId(orderId);
                        if (!paymentDetails) {
                            continue;
                        }

                        let paymentDetailsFromGateway = await this.getPaymentDetailsFromGateway(paymentDetails.getPaymentGatewayRefId());
                        payment.setPaymentAmount(paymentDetailsFromGateway.getPaymentAmount());
                        payment.setPaymentDetails(paymentDetailsFromGateway.getPaymentId());
                        updated = true;
                    }
                }
            }
        }





        if (!razorPayPayments || razorPayPayments.length == 0) {
            return;
        }

        for (let payment of razorPayPayments) {
            logger.info("capture payment for order " + orderId + " and amount " + payment.getPaymentAmount());
            try {


                let captureResponse = await this.paymentProvider.capturePayment(payment.getPaymentDetails(), payment.getPaymentAmount());
                logger.info("capture payment-> capturePayment DONE");
                logger.info(captureResponse);
                let transfer;//await this.getPaymentTransfers(order, payment.getPaymentAmount(), captureResponse);
                logger.info("capture payment-> after capturePayment");
                if (transfer) {
                    logger.info("capture payment-> in transrfer Error");
                    logger.info(transfer);
                    await this.createTransfer(payment.getPaymentDetails(), transfer);

                }
            } catch (error) {
                logger.info("capture payment->trycath capturePayment");
                logger.info(error);
            }
        }
    }

    createTransfer(payment_id: string, transfers: any): Promise<boolean> {
        return this.paymentProvider.createTransfer(payment_id, transfers);
    }

    addPaymentInfoInStore(payment: Payment): Promise<Payment> {
        return this.paymentDBManager.addPayment(payment);
    }

    updatePayment(id: string, payment: Payment): Promise<Payment> {
        return this.paymentDBManager.updatePayment(id, payment);
    }

    getPaymentByOrderId(orderId: string): Promise<Payment> {
        return this.paymentDBManager.getPaymentByOrderId(orderId);
    }

    verifySignature(payment: Payment): boolean {
        let value = payment.getPaymentGatewayRefId() + "|" + payment.getPostPaymentRefId();
        let generateSignature = Utils.generateHmacsignature(this.paymentGatewaySecret, 'SHA256', value);
        if (generateSignature === payment.getPaymentGatewaySignature()) {
            return true;
        }

        return false;
    }

    public async getPaymentGatewayRefId(gatewayRefId: string): Promise<Payment> {
        return this.paymentDBManager.getPaymentGatewayRefId(gatewayRefId);
    }
    


    public async verifyWebhookSignature(webhookBody: String, webhookSignature: String, webhookSecret: String): Promise<boolean> {
        return await this.paymentProvider.verifyWebhookSignature(webhookBody, webhookSignature, webhookSecret)
    }
}