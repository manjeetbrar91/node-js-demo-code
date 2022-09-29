import { IPaymentProvider } from "../../db-layer/interfaces/IPaymentProvider";
import { Config } from "../../config/Config";
import * as Razorpay from 'razorpay';
import { logger } from '../../logs';
import { PaymentGatewayResponse } from '../../service-layer/models/PaymentGatewayResponse';
import { PaymentGatewayCaptureResponse, RazorPayPaymentMethod } from "../../service-layer/models/PaymentGatewayCaptureResponse";
import { MyError } from "../../common/MyError";

export class PaymentProviderRazorPay implements IPaymentProvider {

    private readonly razorPayKey: string;
    private readonly razorPaySecret: string;
    private readonly instance: any;

    constructor() {
        this.razorPayKey = Config.getInstance().getPaymentProviderKey();
        this.razorPaySecret = Config.getInstance().getPaymentProviderSecret();
        this.instance = new Razorpay({
            key_id: this.razorPayKey,
            key_secret: this.razorPaySecret,
        });
    }

    public initiatePayment(amount: number, receipt: string,currency:string): Promise<PaymentGatewayResponse> {
        // by default razor pay takes in paisa
        amount = Math.round(amount * 100)
        let options = {
            amount: amount,
            currency: (currency?currency:"").toUpperCase(),
            receipt: receipt
        }

        return new Promise((resolve, reject) => {
            this.instance.orders.create(options, (err, order) => {
                if (err) {
                    logger.error(err);
                    // return reject(err);
                    return reject(new MyError(err.description));
                }

                let paymentResponse: PaymentGatewayResponse = this.getPaymentResponse(order);
                return resolve(paymentResponse);
            });
        });
    }

    public async capturePayment(payment_id: string, amount: number): Promise<PaymentGatewayCaptureResponse> {
        amount = Math.round(amount * 100)
        return new Promise((resolve, reject) => {
            this.instance.payments.capture(payment_id, amount, 'INR', async (err, payments) => {
                if (err) {
                    logger.info("capture payment Error");
                    logger.info(err);

                    if (err.error.description !== 'This payment has already been captured') {
                        return reject(err);
                    }
                }
                let paymentResponse: PaymentGatewayCaptureResponse = this.getCapturePaymentResponse(payments);
                if (paymentResponse.getMethod() === RazorPayPaymentMethod.Card) {
                    await this.getCardDetails(paymentResponse);
                }
                return resolve(paymentResponse);
            });
        });
    }

    public createTransfer(payment_id: string, transfers: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.instance.payments.transfer(payment_id, { transfers }, (err, payments) => {
                if (err) {
                    logger.info("capture payment-> createTransfer Error");
                    logger.info(err);
                    return reject(err);
                }

                return resolve(true);
            });
        });
    }

    public getPaymentDetailsFromGateway(paymentRefId: string): Promise<PaymentGatewayResponse> {
        return new Promise((resolve, reject) => {
            this.instance.orders.fetch(paymentRefId, (err, order) => {
                if (err) {
                    return reject(err);
                }
                let paymentResponse: PaymentGatewayResponse = this.getPaymentResponse(order);
                return resolve(paymentResponse);
            });
        });
    }

    private getCardDetails(capturePayment: PaymentGatewayCaptureResponse): Promise<PaymentGatewayCaptureResponse> {
        return new Promise((resolve, reject) => {
            this.instance.payments.fetch(capturePayment.getPaymentId() + '/?expand[]=card', (err, response) => {
                if (err) {
                    return reject(err);
                }
                capturePayment.setCardNetwork(response.card.network);
                capturePayment.setCardType(response.card.type);
                return resolve(capturePayment);
            });
        });
    }

    private getPaymentResponse(resp: any): PaymentGatewayResponse {
        let paymentResponse: PaymentGatewayResponse = new PaymentGatewayResponse();
        paymentResponse.setPaymentId(resp.id);
        paymentResponse.setPaymentAmount(resp.amount ? (resp.amount * .01) : 0);
        paymentResponse.setPaymentReceipt(resp.receipt && resp.receipt);
        paymentResponse.setPaymentStatus(resp.status);
        paymentResponse.setPaymentCaptured(resp.captured && resp.captured);
        return paymentResponse;
    }

    private getCapturePaymentResponse(resp: any): PaymentGatewayCaptureResponse {
        let capturePaymentResponse: PaymentGatewayCaptureResponse = new PaymentGatewayCaptureResponse();
        capturePaymentResponse.setPaymentId(resp.id);
        capturePaymentResponse.setPaymentAmount(resp.amount ? (resp.amount * .01) : 0);
        capturePaymentResponse.setMethod(resp.method);
        capturePaymentResponse.setInternational(resp.international);
        capturePaymentResponse.setBank(resp.bank);
        capturePaymentResponse.setWallet(resp.wallet);
        capturePaymentResponse.setFee(resp.fee ? (resp.fee * .01) : 0);
        capturePaymentResponse.setTax(resp.tax ? (resp.tax * .01) : 0);
        return capturePaymentResponse;
    }


    public async verifyWebhookSignature(webhookBody: String, webhookSignature: String, webhookSecret: String): Promise<boolean> {

        return new Promise((resolve, reject) => {
            try {

                let result = Razorpay.validateWebhookSignature(webhookBody, webhookSignature, webhookSecret)
                console.log("validateWebhookSignature -> ", result);

                resolve(result)

            } catch (error) {
                reject(error);
            }
        });
    }

}