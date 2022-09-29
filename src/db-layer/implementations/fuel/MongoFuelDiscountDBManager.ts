import * as mongoose from "mongoose";
import { Utility } from "../../../common/utils/Utility";
import { ResultModel } from "../../../service-layer/models/ResultModel";

import { FuelUtility } from "../../../common/utils/FuelUtility";
import { IFuelDiscountDBManager } from "../../../db-layer/interfaces/fuel/IFuelDiscountDBManager";
import { DBFuelDiscountCoupon } from "../../../db-layer/models/fuel/DBFuelDiscountCoupon";
import { FuelDiscountCouponModel } from "../../../service-layer/models/fuel/FuelDiscountCouponModel";
import { FuelCouponFilter, GetFuelDiscountCouponListRequestModel } from "../../../web-layer/models/fuel/GetFuelDiscountCouponListRequestModel";
import { telemetry } from "../../../telemetry";
import { DBConstants } from "../../models/DBConstants";

export class MongoFuelDiscountDBManager implements IFuelDiscountDBManager {
    private DBPromotion: any;

    constructor() {
        this.DBPromotion = mongoose.model(DBConstants.FuelDiscountsCollection, DBFuelDiscountCoupon);

    }



    public async addOrUpdateDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel> {
        var startTime = new Date();
        var temp = JSON.stringify(promotion, null);
        let dbItem = new this.DBPromotion(JSON.parse(temp));
        dbItem._id = new mongoose.Types.ObjectId(promotion.getId());
        dbItem.fuelStationId = new mongoose.Types.ObjectId(promotion.getFuelStationId());
        let ret = await this.DBPromotion.findOneAndUpdate(
            { _id: dbItem._id },
            {
                $set: dbItem
            },
            { upsert: true, new: true }
        );
        telemetry.timing("backend.mongo.addPromotionForAccount", startTime);
        return promotion;
    }

    public async deleteDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel> {
        var startTime = new Date();

        let ret = await this.DBPromotion.findOneAndUpdate(
            {
                fuelStationId: new mongoose.Types.ObjectId(promotion.getFuelStationId()),
                _id: new mongoose.Types.ObjectId(promotion.getId())
            },
            {
                $set: { status: promotion.getStatus() }
            },
            { upsert: true, new: true }
        );
        telemetry.timing("backend.mongo.deleteDiscountCoupon", startTime);
        return promotion;
    }
    public async enableDisableDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel> {
        var startTime = new Date();

        let ret = await this.DBPromotion.findOneAndUpdate(
            {
                fuelStationId: new mongoose.Types.ObjectId(promotion.getFuelStationId()),
                _id: new mongoose.Types.ObjectId(promotion.getId())
            },
            {
                $set: { enable: promotion.isEnable() }
            },
            { upsert: true, new: true }
        );
        telemetry.timing("backend.mongo.enableDisableDiscountCoupon", startTime);
        return promotion;
    }
    public async getDiscountCouponForBusiness(req: GetFuelDiscountCouponListRequestModel): Promise<ResultModel> {
        req = Utility.validateRequest(req);

        let query = {
            status: DBConstants.activeStatus,
            fuelStationId: new mongoose.Types.ObjectId(req.fuelStationId),

        }
        if (req.dontShowToCustomer != undefined) {
            query["dontShowToCustomer"] = req.dontShowToCustomer
        }
        // if (req.orderType != undefined && req.orderType != null && req.orderType.trim() != "") {
        //     query["orderTypes"] = { $in: [req.orderType] }
        // }
        if (req.couponStatus != undefined && req.couponStatus == FuelCouponFilter.ACTIVE) {
            query["startDate"] = {
                $lte: new Date()
            }
            query["$or"] = [{ endDate: { $eq: null } }, { endDate: { $gte: new Date() } }]

        }
        if (req.couponStatus != undefined && req.couponStatus == FuelCouponFilter.EXPIRED) {
            query["endDate"] = {
                $lt: new Date()
            }
        }
        if (req.couponStatus != undefined && req.couponStatus == FuelCouponFilter.UPCOMING) {
            query["startDate"] = {
                $gt: new Date()
            }
        }
        var startTime = new Date();
        console.log("AAA ", JSON.stringify(query));

        let ret = await this.DBPromotion.find(query).sort({ createdAt: -1 });

        telemetry.timing("backend.mongo.getDiscountCouponForBusiness", startTime);
        let arr: Array<FuelDiscountCouponModel> = Utility.getListOfItems(ret, FuelUtility.getFuelDiscountCoupon)
        let result = new ResultModel();
        result.setData(arr);
        Utility.baseRequestToResultModel(req, result)
        return result;
    }
    public async getDiscountCouponForBusinessByCouponCode(fuelStationId: string, couponCode: string): Promise<FuelDiscountCouponModel> {
        var startTime = new Date();
        let ret = await this.DBPromotion.findOne({
            //  status: DBConstants.activeStatus, 
            fuelStationId: new mongoose.Types.ObjectId(fuelStationId),
            name: couponCode
        });

        telemetry.timing("backend.mongo.getDiscountCouponForBusiness", startTime);
        if (ret) {
            return FuelUtility.getFuelDiscountCoupon(ret)
        }

        return null;
    }
    public async getDiscountCouponById(fuelStationId: string, id: string): Promise<FuelDiscountCouponModel> {
        var startTime = new Date();
        let ret = await this.DBPromotion.findOne({
            //  status: DBConstants.activeStatus, 
            fuelStationId: new mongoose.Types.ObjectId(fuelStationId),
            _id: new mongoose.Types.ObjectId(id)
        });

        telemetry.timing("backend.mongo.getDiscountCouponForBusiness", startTime);
        if (ret) {
            return FuelUtility.getFuelDiscountCoupon(ret)
        }

        return null;
    }

}