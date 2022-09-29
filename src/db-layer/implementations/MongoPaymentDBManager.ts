import * as mongoose from "mongoose";
import { IPaymentDBManager } from "../../db-layer/interfaces/IPaymentDBManager";
import { Payment, PaymentWebhookRespone } from "../../service-layer/models/Payment";
import { logger } from "../../logs";
import { DBConstants } from "../models/DBConstants";
import { DBPaymentSchema } from "../../db-layer/models/DBPayment";
import { DBPaymentLogsSchema } from "../../db-layer/models/DBPaymentLogs";
import { telemetry } from '../../telemetry';
import { Utility } from "../../common/utils/Utility";

export class MongoPaymentDBManager implements IPaymentDBManager {
    private DBPayment: any;
    private DBPaymentLogs: any;

    constructor() {
        this.DBPayment = mongoose.model(DBConstants.PaymentCollection, DBPaymentSchema);
        this.DBPaymentLogs = mongoose.model(DBConstants.PaymentLogsCollection, DBPaymentLogsSchema);
    }

    public async addPayment(payment: Payment): Promise<Payment> {
        var startTime = new Date();
        let dbPayment = this.getDbPayment(payment);
        let ret = await dbPayment.save();
        payment.setId(ret['_id']);

        telemetry.timing("backend.mongo.addPayment", startTime);
        return payment;
    }
    public async addWebhookPaymentLogs(payment: PaymentWebhookRespone): Promise<PaymentWebhookRespone> {
        var startTime = new Date();
        let dbPaymentLog = this.getDBPaymentLogs(payment);
        let ret = await dbPaymentLog.save();
        payment.setId(ret['_id']);

        telemetry.timing("backend.mongo.addPayment", startTime);
        return payment;
    }

    public async updatePayment(id: string, payment: Payment): Promise<Payment> {
        var startTime = new Date();
        let ret = await this.DBPayment.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, {
            $set: {
                postPaymentRefId: payment.getPostPaymentRefId(),
                paymentGatewaySignature: payment.getPaymentGatewaySignature(),
                paymentStatus: payment.getPaymentStatus().toString(),
                updatedTS: (new Date()).getTime()
            }
        },{new: true});
        logger.info(ret);
        telemetry.timing("backend.mongo.updatePayment", startTime);
        return payment;
    }
    public async updateTransferDetails(id: string, payment: Payment): Promise<Payment> {
        var startTime = new Date();
        let ret = await this.DBPayment.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, {
            $set: {
                commisionGst: payment.getCommisionGst(),
                totalCommision: payment.getTotalCommision(),
                netcommision: payment.getNetcommision(),
                commisionPercentage: payment.getCommisionPercentage(),
                transactionType: payment.getTransactionType(),
                transferAmount: payment.getTransferAmount(),
                isTransferCreated:true
            }
        },{new: true});
        logger.info(ret);
        telemetry.timing("backend.mongo.updateTransferDetails", startTime);
        return payment;
    }

    public async getPaymentByOrderId(orderId: string): Promise<Payment> {
        var startTime = new Date();
        let ret = await this.DBPayment.findOne({ orderId: new mongoose.Types.ObjectId(orderId) });
        logger.info(ret);
        telemetry.timing("backend.mongo.getPaymentByOrderId", startTime);
        return ret ? Utility.getPayment(ret) : null;
    }
    public async getPaymentGatewayRefId(gatewayRefId: string): Promise<Payment> {
        var startTime = new Date();
        let ret = await this.DBPayment.findOne({ paymentGatewayRefId: gatewayRefId });
        telemetry.timing("backend.mongo.getPaymentGatewayRefId", startTime);
        return ret ? Utility.getPayment(ret) : null;
    }

    private getDbPayment(payment: Payment) {
        return new this.DBPayment({
            orderId: payment.getOrderId(),
            customerId: payment.getCustomerId(),
            accountId: payment.getAccountId(),
            paymentGatewayRefId: payment.getPaymentGatewayRefId(),
            usedPointsAmount: payment.getUsedPointsAmount(),
            paymentAmount: payment.getPaymentAmount(),
            eligiblePointsAmount: payment.getEligiblePointsAmount(),
            paymentStatus: payment.getPaymentStatus().toString(),
            autoCapturePayment: payment.isAutoCapturePayment(),
            menewPayPayment: payment.isMenewPayPayment(),
            currency: payment.getCurrency()
        });
    }
    private getDBPaymentLogs(payment: PaymentWebhookRespone) {
        return new this.DBPaymentLogs({
            orderId: payment.getOrderId(),
            customerId: payment.getCustomerId(),
            accountId: payment.getAccountId(),
            paymentGatewayRefId: payment.getPaymentGatewayRefId(),
            usedPointsAmount: payment.getUsedPointsAmount(),
            paymentAmount: payment.getPaymentAmount(),
            eligiblePointsAmount: payment.getEligiblePointsAmount(),
            paymentStatus: payment.getPaymentStatus().toString(),
            paymentId: payment.getPaymentId(),
            paymentAccountId: payment.getPaymentAccountId(),


            entity: payment.getEntity(),
            amount: payment.getAmount(),
            currency: payment.getCurrency(),
            paymentOrderId: payment.getPaymentOrderId(),
            invoiceId: payment.getInvoiceId(),
            international: payment.isInternational(),
            method: payment.getMethod(),
            amountRefunded: payment.getAmountRefunded(),
            refundStatus: payment.getRefundStatus(),
            captured: payment.isCaptured(),
            description: payment.getDescription(),
            cardId: payment.getCardId(),
            bank: payment.getBank(),
            wallet: payment.getWallet(),
            vpa: payment.getVpa(),
            email: payment.getEmail(),
            contact: payment.getContact(),
            fee: payment.getFee(),
            tax: payment.getTax(),
            errorCode: payment.getErrorCode(),
            errorDescription: payment.getErrorDescription(),
            errorSource: payment.getErrorSource(),
            errorStep: payment.getErrorStep(),
            errorReason: payment.getErrorReason(),
            bankTransaction_id: payment.getBankTransaction_id(),
            paymentCreatedAt: payment.getPaymentCreatedAt(),
            event: payment.getEvent(),
            eventStatus: payment.getEventStatus(),
            verified: payment.isVerified()


        });
    }
}