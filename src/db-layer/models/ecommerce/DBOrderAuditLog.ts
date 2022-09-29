import * as mongoose from "mongoose"; 
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;

export const DBOrderAuditLogSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.UserOrdersCollection
    },
    event: {
        type: String
    },
    employeeType: {
        type: String
    },
    cashierName: {
        type: String
    },
    employeeName: {
        type: String
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.VehicleOwnersCollection
    }
},
    {
        timestamps: true
    });

DBOrderAuditLogSchema.index({ orderId: 1 });