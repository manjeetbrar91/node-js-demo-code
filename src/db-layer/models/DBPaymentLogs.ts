import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";
const Schema = mongoose.Schema;
export const DBPaymentLogsSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.UserOrdersCollection
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.CustomersCollection
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantsCollection
    },
    paymentGatewayRefId: {
        type: String
    },
    paymentAmount: {
        type: Number
    },
    usedPointsAmount: {
        type: Number
    },
    eligiblePointsAmount: {
        type: Number
    },
    paymentStatus: {
        type: String
    },
    postPaymentRefId: {
        type: String
    },
    paymentGatewaySignature: {
        type: String
    },

    paymentId: {
        type: String
    },
    paymentAccountId: {
        type: String
    },
    entity: {
        type: String
    },
    amount: {
        type: String
    },
    currency: {
        type: String
    },
    paymentOrderId: {
        type: String
    },
    invoiceId: {
        type: String
    },
    international: {
        type: Boolean
    },
    method: {
        type: String
    },
    amountRefunded: {
        type: String
    },
    refundStatus: {
        type: String
    },
    captured: {
        type: Boolean
    },
    description: {
        type: String
    },
    cardId: {
        type: String
    },
    bank: {
        type: String
    },
    wallet: {
        type: String
    },
    vpa: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    fee: {
        type: Number
    },
    tax: {
        type: Number
    },
    errorCode: {
        type: String
    },
    errorDescription: {
        type: String
    },
    errorSource: {
        type: String
    },
    errorStep: {
        type: String
    },
    errorReason: {
        type: String
    },
    bankTransaction_id: {
        type: String
    },
    paymentCreatedAt: {
        type: String
    },
    event: {
        type: String
    },
    eventStatus: {
        type: String
    },
    verified: {
        type: Boolean
    }
}, { timestamps: true })

DBPaymentLogsSchema.index({ orderId: 1 });