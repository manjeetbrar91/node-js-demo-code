import * as mongoose from "mongoose";

import { IBusinessUsersDBManager } from "../../../db-layer/interfaces/fuel/IBusinessUsersDBManager";
import { DBBusinessUsers } from "../../../db-layer/models/fuel/DBBusinessUsers";
import { BusinessUserModel } from "../../../service-layer/models/fuel/BusinessUserModel";
import { FuelUtility } from "../../../common/utils/FuelUtility";
import { telemetry } from "../../../telemetry";
import { DBConstants } from "../../models/DBConstants";

export class MongoBusinessUsersDBManager implements IBusinessUsersDBManager {
    private DBPromotion: any;

    constructor() {
        this.DBPromotion = mongoose.model(DBConstants.BusinessUsersCollection, DBBusinessUsers);

    }



    public async register(data: BusinessUserModel): Promise<BusinessUserModel> {
        var startTime = new Date();
        let db = new this.DBPromotion(data);
        let ret = await db.save();
        telemetry.timing("backend.mongo.MongoBusinessUsersDBManager.register", startTime);
        return FuelUtility.getBusinessUserModel(ret);
    }

    public async getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel> {
        var startTime = new Date();
        let ret = await this.DBPromotion.findOne({
            mobileNumber: data.getMobileNumber(),
            countryCode: data.getCountryCode()
        });


        telemetry.timing("backend.mongo.getUserByMobileNumber.register", startTime);
        if (ret) {
            return FuelUtility.getBusinessUserModel(ret)
        }
        return null;

    }

}