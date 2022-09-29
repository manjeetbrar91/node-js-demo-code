import * as mongoose from "mongoose";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { IProductRatingReviewDBManager } from "../../../db-layer/interfaces/ecommerce/IProductRatingReviewDBManager";
import { ProductRatingModel } from "../../../service-layer/models/ecommerce/response/ProductRatingModel";
import { ProductRatingReviewModel } from "../../../service-layer/models/ecommerce/response/ProductRatingReviewModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { telemetry } from "../../../telemetry";
import { GetProductReviewRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductReviewRequestModel";
import { DBConstants } from "../../models/DBConstants";
import { DBProductRatingReviewSchema } from "../../models/ecommerce/DBProductRatingReview";
export class MongoProductRatingReviewDBManager implements IProductRatingReviewDBManager {

    private productRatingReviewDB: any;

    constructor() {

        this.productRatingReviewDB = mongoose.model(DBConstants.ProductRatingReviewCollection, DBProductRatingReviewSchema);
    }

    public async addReview(data: ProductRatingReviewModel): Promise<boolean> {
        try {
            let startTime = new Date();
            let oldReview = await this.getRatingReviewByUserIdAndProductId(data.getUserId(), data.getProductId());
            if (oldReview != undefined && oldReview != null) {

                let ret = await this.productRatingReviewDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(oldReview.getId().toString()) }, {
                    $set: {
                        rating: data.getRating(),
                        review: data.getReview(),
                    }
                },{new: true});
                telemetry.timing("backend.mongo.addReview", startTime);
                return true
            } else {
                let db = new this.productRatingReviewDB(data);
                let ret = await db.save();
                telemetry.timing("backend.mongo.addReview", startTime);
                return false;
            }

        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getRatingReviewByUserIdAndProductId(userId: string, productId: string): Promise<ProductRatingReviewModel> {
        let baseQuery = {
            productId: new mongoose.Types.ObjectId(productId),
            userId: new mongoose.Types.ObjectId(userId)
        }

        let query: any = [
            {
                $match: baseQuery
            }
        ];

        let ret = await this.productRatingReviewDB.aggregate(query);
        if (ret && ret[0]) {
            return EcommerceUtility.getProductRatingReviewModelData(ret[0]);
        }

        return null;
    }
    public async getRatingReviewListByProductId(req: GetProductReviewRequestModel, myReview: boolean): Promise<ResultModel> {
        req = EcommerceUtility.validateRequest(req);
        let baseQuery;
        if (myReview) {
            baseQuery = {
                productId: new mongoose.Types.ObjectId(req.productId),
                userId: new mongoose.Types.ObjectId(req.userId)
            }
        } else {
            baseQuery = {
                productId: new mongoose.Types.ObjectId(req.productId),
                userId: { $ne: new mongoose.Types.ObjectId(req.userId) }
            }
        }
        let query: any = [
            {
                $match: baseQuery
            },
            {
                '$lookup': {
                    'from': 'vehicleowner',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            {
                '$addFields': {
                    'firstName': { '$arrayElemAt': ['$user.firstName', 0] },
                    'lastName': { '$arrayElemAt': ['$user.lastName', 0] },
                    'image': { '$arrayElemAt': ['$user.image', 0] }
                }
            },
            {
                '$project': { 'user': 0 }
            }
        ];
        let totalDocs: number = 0;
        if (myReview == false) {
            totalDocs = await this.getTotalDocs(query, this.productRatingReviewDB);
            query.push({ $sort: { distance: 1 } },
                { $skip: req.offset },
                { $limit: req.limit });
        }
        let ret = await this.productRatingReviewDB.aggregate(query);
        let items = [];
        if (ret && ret[0]) {
            items = EcommerceUtility.getListOfItems(ret, EcommerceUtility.getProductRatingReviewModelData)
        }
        let result = new ResultModel();
        result.setData(items);
        result.setTotal(totalDocs);
        return result;
    }

    public async getTotalDocs(query: any, data: any): Promise<number> {
        query.push({ $group: { _id: null, total: { $sum: 1 } } });
        let numberOfOrders = await data.aggregate(query);
        query.splice(query.length - 1, 1);
        return numberOfOrders[0] && numberOfOrders[0].total;
    }



    public async getAverageRatingByProductId(data: ProductRatingReviewModel): Promise<number> {
        try {
            let startTime = new Date();
            let qry = [{
                $match: {
                    productId: new mongoose.Types.ObjectId(data.getProductId()),
                }
            }, {
                $group: {
                    _id: "$productId",
                    rating: {
                        $sum: "$rating"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }]
            let averageRating = data.getRating();

            let ret = await this.productRatingReviewDB.aggregate(qry);
            if (ret && ret[0]) {
                let rating = ret[0].rating ? ret[0].rating : 0
                let count = ret[0].count ? ret[0].count : 1

                averageRating = rating / count;
                averageRating = parseFloat(averageRating.toFixed(2));
            }
            telemetry.timing("backend.mongo.getAverageRatingByProductId", startTime);
            return averageRating;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getProductRatingByCategory(productId: string): Promise<ProductRatingModel> {
        try {
            let startTime = new Date();
            let qry = [{
                $match: {
                    productId: new mongoose.Types.ObjectId(productId),
                }
            },
            {
                $group: {
                    '_id': '$rating',
                    'totalRating': { '$sum': 1 }
                }
            }]


            let ret = await this.productRatingReviewDB.aggregate(qry);
            let model = new ProductRatingModel();
            if (ret && ret[0]) {
                let totalRating = 0;
                for (let r of ret) {
                    totalRating += (r.totalRating != undefined ? r.totalRating : 0);
                }
                for (let r of ret) {
                    let id = (r._id != undefined ? r._id : 0);
                    let rating = r.totalRating != undefined ? r.totalRating : 0;
                    let percentage = rating * 100 / totalRating
                    switch (id) {
                        case 1: {
                            model.setPoor(percentage);
                            break;
                        }
                        case 2: {
                            model.setAverage(percentage);
                            break;
                        }
                        case 3: {
                            model.setGood(percentage);
                            break;
                        }
                        case 4: {
                            model.setVeryGood(percentage);
                            break;
                        }
                        case 5: {
                            model.setExcellent(percentage);
                            break;
                        }
                    }
                }
            }
            telemetry.timing("backend.mongo.getProductRatingByCategory", startTime);
            return model;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
}