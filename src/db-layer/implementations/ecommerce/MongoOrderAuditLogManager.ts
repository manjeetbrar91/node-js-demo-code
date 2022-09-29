import { IOrderAuditLogDBManager } from "../../../db-layer/interfaces/ecommerce/IOrderAuditLogDBManager";
import * as mongoose from "mongoose";
import { Utility } from "../../../common/utils/Utility";

import { DBConstants } from "../../../db-layer/models/DBConstants";
import { telemetry } from "../../../telemetry";
import { DBOrderAuditLogSchema } from "../../../db-layer/models/ecommerce/DBOrderAuditLog";
import { OrderAuditLog } from "../../../service-layer/models/ecommerce/OrderAuditLog";

export class MongoOrderAuditLogManager implements IOrderAuditLogDBManager {
    private DBOrderAuditLog: any;

    constructor() {
        this.DBOrderAuditLog = mongoose.model(DBConstants.OrderAuditLogCollection, DBOrderAuditLogSchema);
    }

    public async addAuditLog(log: OrderAuditLog): Promise<OrderAuditLog> {
        var startTime = new Date();
        let dbAuditLog = new this.DBOrderAuditLog(this.getOrderAuditLog(log));
        let ret = await dbAuditLog.save();
        telemetry.timing("backend.mongo.AddAuditLog", startTime);
        return Utility.getOrderAuditLog(ret);
    }

    public async getOrderAuditLogs(orderId: string): Promise<Array<OrderAuditLog>> {
        var startTime = new Date();
        let ret = await this.DBOrderAuditLog.find(
            { orderId: new mongoose.Types.ObjectId(orderId) }
        );

        telemetry.timing("backend.mongo.getOrderAuditLogs", startTime);
        return Utility.getListOfItems(ret, Utility.getOrderAuditLog);
    }

    private getOrderAuditLog(log: OrderAuditLog) {
        return {
            orderId: log.getOrderId(),
            event: log.getEvent(),
            employeeType: log.getEmployeeType(),
            employeeName: log.getEmployeeName(),
            employeeId: log.getEmployeeId()
        }
    }
}