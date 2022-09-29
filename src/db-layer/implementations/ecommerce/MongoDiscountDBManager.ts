import { Utility } from "../../../common/utils/Utility";
import * as mongoose from "mongoose";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { CouponFilter, GetDiscountCouponListRequestModel } from "../../../web-layer/models/ecommerce/request/GetDiscountCouponListRequestModel";
import { DiscountCouponModel } from "../../../service-layer/models/ecommerce/response/DiscountCouponModel";

import { telemetry } from "../../../telemetry";
import { IDiscountDBManager } from "../../interfaces/ecommerce/IDiscountDBManager";
import { DBConstants } from "../../models/DBConstants";
import { DBDiscountCoupon } from "../../models/ecommerce/DBDiscountCoupon";
export class MongoDiscountDBManager implements IDiscountDBManager {
    private DBPromotion: any;
    private DBUserPromotionOptics: any;

    constructor() {
        this.DBPromotion = mongoose.model(DBConstants.BusinessDiscountsCollection, DBDiscountCoupon);

    }



    public async addOrUpdateDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel> {
        var startTime = new Date();
        var temp = JSON.stringify(promotion, null);
        let dbItem = new this.DBPromotion(JSON.parse(temp));
        dbItem._id = new mongoose.Types.ObjectId(promotion.getId());
        dbItem.businessId = new mongoose.Types.ObjectId(promotion.getBusinessId());
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

    public async deleteDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel> {
        var startTime = new Date();

        let ret = await this.DBPromotion.findOneAndUpdate(
            {
                businessId: new mongoose.Types.ObjectId(promotion.getBusinessId()),
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
    public async enableDisableDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel> {
        var startTime = new Date();

        let ret = await this.DBPromotion.findOneAndUpdate(
            {
                businessId: new mongoose.Types.ObjectId(promotion.getBusinessId()),
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
    public async getDiscountCouponForBusiness(req: GetDiscountCouponListRequestModel): Promise<ResultModel> {
        req = Utility.validateRequest(req);

        let query = {
            status: DBConstants.activeStatus,
            businessId: new mongoose.Types.ObjectId(req.businessId),

        }
        if (req.dontShowToCustomer != undefined) {
            query["dontShowToCustomer"] = req.dontShowToCustomer
        }
        if (req.orderType != undefined && req.orderType != null && req.orderType.trim() != "") {
            query["orderTypes"] = { $in: [req.orderType] }
        }
        if (req.couponStatus != undefined && req.couponStatus == CouponFilter.ACTIVE) {
            query["startDate"] = {
                $lte: new Date()
            }
            query["$or"] = [{ endDate: { $eq: null } }, { endDate: { $gte: new Date() } }]

        }
        if (req.couponStatus != undefined && req.couponStatus == CouponFilter.EXPIRED) {
            query["endDate"] = {
                $lt: new Date()
            }
        }
        if (req.couponStatus != undefined && req.couponStatus == CouponFilter.UPCOMING) {
            query["startDate"] = {
                $gt: new Date()
            }
        }
        var startTime = new Date();
        console.log("AAA ", JSON.stringify(query));

        let ret = await this.DBPromotion.find(query).sort({ createdAt: -1 });

        telemetry.timing("backend.mongo.getDiscountCouponForBusiness", startTime);
        let arr: Array<DiscountCouponModel> = Utility.getListOfItems(ret, Utility.getDiscountCoupon)
        let result = new ResultModel();
        result.setData(arr);
        Utility.baseRequestToResultModel(req, result)
        return result;
    }
    public async getDiscountCouponForBusinessByCouponCode(businessId: string, couponCode: string): Promise<DiscountCouponModel> {
        var startTime = new Date();
        let ret = await this.DBPromotion.findOne({
            //  status: DBConstants.activeStatus, 
            businessId: new mongoose.Types.ObjectId(businessId),
            name: couponCode
        });

        telemetry.timing("backend.mongo.getDiscountCouponForBusiness", startTime);
        if (ret) {
            return Utility.getDiscountCoupon(ret)
        }

        return null;
    }
    public async getDiscountCouponById(businessId: string, id: string): Promise<DiscountCouponModel> {
        var startTime = new Date();
        let ret = await this.DBPromotion.findOne({
            //  status: DBConstants.activeStatus, 
            businessId: new mongoose.Types.ObjectId(businessId),
            _id: new mongoose.Types.ObjectId(id)
        });

        telemetry.timing("backend.mongo.getDiscountCouponForBusiness", startTime);
        if (ret) {
            return Utility.getDiscountCoupon(ret)
        }

        return null;
    }

}