import * as mongoose from "mongoose";
import { Utility } from "../../../common/utils/Utility";
import { IECommerceCommisionSettingsDBManager } from "../../../db-layer/interfaces/ecommerce/IECommerceCommisionSettingsDBManager";
import { DBECommerceCommisionSettings } from "../../../db-layer/models/ecommerce/DBECommerceCommisionSettings";
import { ECommerceCommisionSettingsBaseModel } from "../../../service-layer/models/ecommerce/response/ECommerceCommisionSettingsBaseModel";
import { telemetry } from "../../../telemetry";
import { DBConstants } from "../../models/DBConstants";


export class MongoECommerceCommisionSettingsManager implements IECommerceCommisionSettingsDBManager {
    private DBCommisionSettings: any;

    constructor() {
        this.DBCommisionSettings = mongoose.model(DBConstants.ECommerceCommisionSettings, DBECommerceCommisionSettings);
    }

    public async addCommisionSettings(): Promise<ECommerceCommisionSettingsBaseModel> {
        var startTime = new Date();
        let commisionSettingsDB = new this.DBCommisionSettings(new ECommerceCommisionSettingsBaseModel());
        let ret = await commisionSettingsDB.save();
        telemetry.timing("backend.mongo.AddAuditLog", startTime);
        return Utility.getECommerceCommisionSettingsBaseModel(ret);
    }

    public async getCommisionSettings(): Promise<ECommerceCommisionSettingsBaseModel> {
        var startTime = new Date();
        let ret = await this.DBCommisionSettings.findOne(
            { status: DBConstants.activeStatus }
        );
        if (ret == undefined) {
            await this.addCommisionSettings();
        }
        telemetry.timing("backend.mongo.getCommisionSettings", startTime);
        return Utility.getECommerceCommisionSettingsBaseModel(ret)
    }

}