import * as mongoose from "mongoose";
import { OrderCreatedFrom, OrderPaymentType, OrderStatusEnum } from "../../../service-layer/models/ecommerce/OrderStatusEnum";
import { DBConstants } from "../DBConstants";
import { DBUserDeliveryAddressSchema } from "./DBUserDeliveryAddress";
const Schema = mongoose.Schema;

const DBOrderPaymentSchema = new Schema({
    paymentMethod: {
        type: String
    },
    paymentDetails: {
        type: String
    },
    paymentAmount: {
        type: Number
    }
}, { _id: false });


const DBOrderProductsSchema = new Schema({
    productId: {
        type: String
    },
    categoryId: {
        type: String
    },
    variantId: {
        type: String
    },
    variantName: {
        type: String
    },
    productName: {
        type: String,
        default: ""
    },
    mrp: {
        type: Number,
        default: 0
    },
    sellingPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    subTotal: {
        type: Number,
        default: 0
    },

    taxAmount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    packingCharges: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: ""
    },
    updateInventory: {
        type: Boolean,
        default: false
    },
    currencySymbol: {
        type: String,
        default: ""
    },
    currencyConversion: {
        type: Number,
        default: -1
    },

}, { _id: false });

export const DBExtraCharges = new Schema({
    name: {
        type: String,
    },
    isFixed: {
        type: Boolean,
    },
    value: {
        type: Number,
    },
    taxableAmount: {
        type: Number,
    },
    amount: {
        type: Number,
    },
}, { _id: false });

export const DBCustomerOrderSchema = new Schema({
    businessId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.BusinessCollection
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.VehicleOwnersCollection
    },
    pickUpDate: {
        type: Date
    },
    pickUpTime: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    roundedOffValue: {
        type: Number
    },
    orderStatus: {
        type: String,
        default: 'active'
    },
    channelOrderStatus: {
        type: String,
        default: OrderStatusEnum.Created
    },

    cancellationReason: {
        type: String
    },



    notes: {
        type: String
    },
    paymentStatus: {
        type: String,
        default: DBConstants.paymentStatusPending
    },
    paymentType: {
        type: String,
        default: OrderPaymentType.COD
    },
    payments: {
        type: [DBOrderPaymentSchema],
        default: []
    },
    inCarDeliveryInfo: {
        type: [],
        default: []
    },
    deliveryAddress: {
        type: DBUserDeliveryAddressSchema,
        default: null
    },
    onlinePayment: {
        type: Boolean,
        default: false
    },
    transactionType: {
        type: String
        //CreditCard, UPI, netbanking,
    },


    instructions: {
        type: String
    },
    totalBill: {
        type: Number
    },

    totalTax: {
        type: Number
    },
    subTotal: {
        type: Number
    },
    netRevenue: {
        type: Number
    },
    grossRevenue: {
        type: Number
    },
    packingCharges: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    extraFeeUser: {
        type: Number,
        default: 0
    },
    extraFeeBusiness: {
        type: Number,
        default: 0
    },
    extraCharges: {
        type: [DBExtraCharges],
        default: []
    },

    unread: {
        type: Boolean
    },
    billNumber: {
        type: String,
        default: ""
    },

    totalDiscount: {
        type: Number
    },
    products: {
        type: [DBOrderProductsSchema],
        default: []
    },
    orderType: {
        type: String,
        default: "HD"
    },

    statusHistory: {
        type: [],
        default: []
    },

    orderCancellationDate: {
        type: String
    },
    gstName: {
        type: String
    },
    gstNumber: {
        type: String
    },
    vehicleNo: {
        type: String
    },
    mobileNo: {
        type: String
    },
    deliveryDate: {
        type: Date
    },

    currency: {
        type: String,
        default: ""
    },
    currencySymbol: {
        type: String,
        default: ""
    },
    currencyConversion: {
        type: Number,
        default: -1
    },


    apptDate: {
        type: String
    },
    apptTime: {
        type: String
    },
    apptStatus: {
        type: String
    },
    apptRemarksByUser: {
        type: String
    },
    apptRemarksByBusiness: {
        type: String
    },
    apptSuggestedDate: {
        type: String
    },
    apptSuggestedTime: {
        type: String
    },

    alreadyReached: {
        type: Boolean,
        default: false
    },
    employeeId: {
        type: String
    },
    createdFrom: {
        type: String,
        default: OrderCreatedFrom.User
    },
    employeeName: {
        type: String
    },
    customDiscountPercentage: {
        type: Number
    },
    customDiscountAmount: {
        type: Number
    },
    customDiscount: {
        type: {},
        default: {
            amount: 0,
            percentage: 0
        }
    },
    couponCode: {
        type: String,        
    },
},
    {
        timestamps: true
    }
);

