import * as mongoose from "mongoose";
import { BusinessAvailabilityEnum } from "../../../service-layer/models/ecommerce/BusinessAvailabilityEnum";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { Utils } from "../../../common/utils/Utils";
import { IBusinessDBManager } from "../../../db-layer/interfaces/ecommerce/IBusinessDBManager";
import { DBConstants } from "../../../db-layer/models/DBConstants";
import { DBBusinessSchema } from "../../../db-layer/models/ecommerce/DBBusiness";
import { BusinessCurrencyModel, BusinessDeliverySettings, BusinessPaymentSettings, BusinessResponseModel, BusinessTimingModel } from "../../../service-layer/models/ecommerce/response/BusinessResponseModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { telemetry } from "../../../telemetry";
import { GetBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetBuisnessRequestModel";
import { GetNearByBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetNearByBuisnessRequestModel";
export class MongoBusinessDBManager implements IBusinessDBManager {
    private businessDB: any;

    constructor() {
        this.businessDB = mongoose.model(DBConstants.BusinessCollection, DBBusinessSchema);
    }

    public async addNewBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> {
        try {
            data.setBusinessId(Utils.getUniqueBuisnesId(data.getCountry()))
            if (data.getBusinessCurrencySettings() == undefined || data.getBusinessCurrencySettings()[0] == undefined) {
                data = EcommerceUtility.setDefaultBusinessCurrency(data);
            }
            let db = new this.businessDB(data);
            let ret = await db.save();
            // if (ret) {
            //     throw new MyError("MESSAGE");
            // }
            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async updateBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> {
        try {





            const ret = await this.businessDB.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(data.getId()),
            },
                {
                    $set: {
                        phoneNumber: data.getPhoneNumber(),
                        countryCode: data.getCountryCode(),
                        startTime: data.getStartTime(),
                        endTime: data.getEndTime(),
                        businessName: data.getBusinessName(),
                        altNumber: data.getAltNumber(),
                        emailAddress: data.getEmailAddress(),
                    }
                }, { new: true });

            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }


    public async updateBusinessAvailabilityStatus(businessId: string, data: BusinessAvailabilityEnum): Promise<BusinessResponseModel> {
        let availabilityStatusOrder = 4;
        if (data == BusinessAvailabilityEnum.Open) {
            availabilityStatusOrder = 1;
        }
        if (data == BusinessAvailabilityEnum.TempraryClosed) {
            availabilityStatusOrder = 2;
        }
        try {
            const ret = await this.businessDB.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(businessId),
                },
                {
                    $set: { availabilityStatus: data, availabilityStatusOrder: availabilityStatusOrder }
                }, { new: true }
            );

            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async updateBusinessPaymentSettings(businessId: string, data: BusinessPaymentSettings): Promise<BusinessResponseModel> {
        try {
            const ret = await this.businessDB.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(businessId),
                },
                {
                    $set: { paymentSettings: data, }
                }, { new: true }
            );

            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async updateBusinessDeliverySettings(businessId: string, data: BusinessDeliverySettings): Promise<BusinessResponseModel> {
        try {
            const ret = await this.businessDB.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(businessId),
                },
                {
                    $set: { deliverySettings: data, }
                }, { new: true }
            );

            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async updateBusinessTiming(businessId: string, data: Array<BusinessTimingModel>): Promise<BusinessResponseModel> {
        try {
            const ret = await this.businessDB.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(businessId),
                },
                {
                    $set: { businessTiming: data, }
                }, { new: true }
            );

            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async addNewCurrencySettings(businessId: string, data: BusinessCurrencyModel): Promise<BusinessResponseModel> {
        try {

            let business = await this.getBusinessById(businessId);
            if (business) {
                let index = business.getBusinessCurrencySettings().findIndex(s => s.getCurrency().toLowerCase() == data.getCurrency().toLowerCase());
                if (index > -1) {
                    if (business.getBusinessCurrencySettings()[index].isPrimaryCurrency() == true) {
                        if (data.isDeleteCurrency()) {
                            throw new Error(`You can't delete Primary Currency`)
                        } else {
                            throw new Error(`You can't update Primary Currency`)

                        }
                    }
                    if (data.isDeleteCurrency()) {
                        business.getBusinessCurrencySettings().splice(index, 1)
                    } else {
                        business.getBusinessCurrencySettings()[index] = data;
                    }
                } else {
                    if (!data.isDeleteCurrency()) {
                        business.getBusinessCurrencySettings().push(data);
                    }
                }
                const ret = await this.businessDB.findOneAndUpdate(
                    {
                        _id: new mongoose.Types.ObjectId(businessId),
                    },
                    {
                        $set: { businessCurrencySettings: business.getBusinessCurrencySettings() }
                    }, { new: true }
                );
                return EcommerceUtility.getBusinessData(ret);
            }
            return business;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getAllBusinessByFuelStationId(fuelStationId: string): Promise<ResultModel> {
        try {




            let startTime = new Date();
            let items = await this.businessDB.find({
                fuelStation: new mongoose.Types.ObjectId(fuelStationId),
                status: { $ne: DBConstants.deletedStatus }
            }).sort({ availabilityStatusOrder: 1 })
            telemetry.timing("backend.mongo.getAllBusinessByFuelStationId", startTime);

            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getBusinessListResponseModelData)
            }

            let result = new ResultModel();
            result.setData(data);
            return result;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getAllBusiness(req: GetBuisnessRequestModel): Promise<ResultModel> {
        try {


            req = EcommerceUtility.validateRequest(req);

            let startTime = new Date();
            let items = await this.businessDB.find({
                ownerId: new mongoose.Types.ObjectId(req.ownerId),
                status: { $ne: DBConstants.deletedStatus }
            })
                .sort({ availabilityStatusOrder: 1 })
                .skip(req.offset)
                .limit(req.limit);
            telemetry.timing("backend.mongo.stockClosingIdListByDate", startTime);

            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getBusinessListResponseModelData)
            }

            let result = new ResultModel();
            result.setData(data);
            return result;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getNearByBusiness(req: GetNearByBuisnessRequestModel): Promise<ResultModel> {
        try {

            req = EcommerceUtility.validateRequest(req);
            let q: any = [
                {
                    '$geoNear': {
                        'near': {
                            'type': 'Point',
                            'coordinates': [
                                req.longitude, req.latitude
                            ]
                        },
                        'distanceField': 'distance',
                        'maxDistance': req.distanceInMeters,
                    }
                }
            ];
            if (req.businessType != undefined && req.businessType.trim() != "") {
                q.push({
                    $match: {
                        businessType: req.businessType,
                        status: { $ne: DBConstants.deletedStatus },
                        availabilityStatus: BusinessAvailabilityEnum.Open
                    }
                })
            } else {
                q.push({
                    $match: {
                        status: { $ne: DBConstants.deletedStatus },
                        availabilityStatus: BusinessAvailabilityEnum.Open
                    }
                })
            }
            let totalDocs: number = await this.getTotalDocs(q, this.businessDB);

            q.push({
                $lookup: {
                    from: 'fuelstation',
                    localField: 'fuelStation',
                    foreignField: '_id',
                    as: 'fs'
                }
            });
            q.push({
                $unwind: { path: "$fs", preserveNullAndEmptyArrays: true }
            });
            q.push({
                $lookup: {
                    from: 'fuelcompany',
                    localField: 'fs.fuelCompany',
                    foreignField: '_id',
                    as: 'fc'
                }
            });
            q.push({ $addFields: { 'fs.image': { '$arrayElemAt': ['$fc.image', 0] } } })
            q.push({ $addFields: { 'fs.fuelCompanyName': { '$arrayElemAt': ['$fc.name', 0] } } })
            q.push({ $sort: { distance: 1, availabilityStatusOrder: 1 } },
                { $skip: req.offset },
                { $limit: req.limit });

            let startTime = new Date();
            let items = await this.businessDB.aggregate(q);
            telemetry.timing("backend.mongo.getNearByBusiness", startTime);

            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getBusinessListResponseModelData)
            }
            let result = new ResultModel();
            result.setData(data);
            result.setOffset(req.offset)
            result.setLimit(req.limit);
            result.setTotal(totalDocs);
            return result;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getTotalDocs(query: any, data: any): Promise<number> {
        query.push({ $group: { _id: null, total: { $sum: 1 } } });
        let numberOfOrders = await data.aggregate(query);
        query.splice(query.length - 1, 1);
        return numberOfOrders[0] && numberOfOrders[0].total;
    }
    public async getBusinessById(id: string): Promise<BusinessResponseModel> {
        try {



            let startTime = new Date();
            // let items = await this.businessDB.find({

            // })
            let q: any = [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id),
                        status: { $ne: DBConstants.deletedStatus }
                    }
                }
            ]
            q.push({
                $lookup: {
                    from: 'fuelstation',
                    localField: 'fuelStation',
                    foreignField: '_id',
                    as: 'fs'
                }
            });
            q.push({
                $unwind: { path: "$fs", preserveNullAndEmptyArrays: true }
            });
            q.push({
                $lookup: {
                    from: 'fuelcompany',
                    localField: 'fs.fuelCompany',
                    foreignField: '_id',
                    as: 'fc'
                }
            });
            q.push({ $addFields: { 'fs.image': { '$arrayElemAt': ['$fc.image', 0] } } })
            q.push({ $addFields: { 'fs.fuelCompanyName': { '$arrayElemAt': ['$fc.name', 0] } } })

            telemetry.timing("backend.mongo.getBusinessId", startTime);

            let items = await this.businessDB.aggregate(q);
            if (items && items[0]) {
                return EcommerceUtility.getBusinessData(items[0]);
            } else {
                throw new Error("Business not found");
            }


        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getAndUpdateOrderSequenceNumber(businessId: string): Promise<BusinessResponseModel> {
        var startTime = new Date();

        let res = await this.businessDB.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(businessId) },
            { $inc: { orderSequenceNumber: 1 } }
        );
        let restaurant: BusinessResponseModel = res != null ? EcommerceUtility.getBusinessData(res) : null;

        telemetry.timing("backend.mongo.getAndUpdateOrderSequenceNumber", startTime);
        // return (restaurant != null ? restaurant.getOrderSequenceNumber() : -1);
        return restaurant;
    }

    public async changePrimaryCurrencySettings(businessId: string, data: BusinessCurrencyModel): Promise<BusinessResponseModel> {
        try {

            let business = await this.getBusinessById(businessId);
            if (business) {
                let index = business.getBusinessCurrencySettings().findIndex(s => s.getCurrency().toLowerCase() == data.getCurrency().toLowerCase());
                if (index > -1) {
                    business.getBusinessCurrencySettings()[index].setPrimaryCurrency(true);
                    business.getBusinessCurrencySettings()[index].setCurrencyConversion(1);
                    const count = business.getBusinessCurrencySettings().length;
                    for (let i = 0; i < count; i++) {
                        if (i != index) {
                            business.getBusinessCurrencySettings()[i].setPrimaryCurrency(false);
                        }
                    }
                } else {
                    throw new Error("Currency not found")
                }
                let primaryCurrency = "";
                let primaryCurrencySymbol = "";
                let objPrimaryCurrency = business.getBusinessCurrencySettings().find(s => s.isPrimaryCurrency() == true);
                if (objPrimaryCurrency) {
                    primaryCurrency = objPrimaryCurrency.getCurrency();
                    primaryCurrencySymbol = objPrimaryCurrency.getCurrencySymbol();
                } else {
                    primaryCurrency = business.getBusinessCurrencySettings()[0].getCurrency();
                    primaryCurrencySymbol = business.getBusinessCurrencySettings()[0].getCurrencySymbol();
                }
                const ret = await this.businessDB.findOneAndUpdate(
                    {
                        _id: new mongoose.Types.ObjectId(businessId),
                    },
                    {
                        $set: {
                            businessCurrencySettings: business.getBusinessCurrencySettings(),
                            primaryCurrency: primaryCurrency,
                            primaryCurrencySymbol: primaryCurrencySymbol
                        }
                    }, { new: true }
                );
                return EcommerceUtility.getBusinessData(ret);
            }
            return business;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async deleteBusiness(data: BusinessResponseModel): Promise<BusinessResponseModel> {
        try {





            const ret = await this.businessDB.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(data.getId()),
            }, {
                $set: {
                    status: DBConstants.deletedStatus
                }
            }, { new: true });

            return EcommerceUtility.getBusinessData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
}