import * as mongoose from "mongoose";
import { IInventoryStoreStockClosingDBManager } from "../../../db-layer/interfaces/inventory/IInventoryStoreStockClosingDBManager";
import { DBConstants } from "../../../db-layer/models/DBConstants";
import { DBInventoryStoreStockClosingModel } from "../../../db-layer/models/DBInventoryStoreStockClosingModel";
import { InventoryStockClosingReportResponse } from "../../../service-layer/models/inventory/InventoryStockClosingReportResponse";
import { InventoryStoreStockClosingModel } from "../../../service-layer/models/inventory/InventoryStoreStockClosingModel";
import { ItemStock } from "../../../service-layer/models/inventory/ItemStock";
import { telemetry } from "../../../telemetry";
import { InventoryStockIssueReportModel } from "../../../web-layer/models/inventory/request/InventoryStockIssueReportModel";

export class MongoInventoryStoreStockClosingDBManager implements IInventoryStoreStockClosingDBManager {
    private DBInventoryStoreStockClosing: any;

    constructor() {
        this.DBInventoryStoreStockClosing = mongoose.model(DBConstants.InventoryStockClosingCollection, DBInventoryStoreStockClosingModel);
    }


    public async addClosing(data: Array<InventoryStoreStockClosingModel>): Promise<Array<InventoryStoreStockClosingModel>> {


        await this.DBInventoryStoreStockClosing.insertMany(data);

        return data;

    }
    public async addStockPuchaseHistory(itemList: Array<ItemStock>): Promise<Array<ItemStock>> {
        this.DBInventoryStoreStockClosing.insertMany(itemList);
        return itemList;
    }

    public async isClosingExists(date: string, restaurantId: string): Promise<boolean> {
        var startTime = new Date();
        let ret = await this.DBInventoryStoreStockClosing.count({

            restaurantId: new mongoose.Types.ObjectId(restaurantId),
            closingDate: date,


        });
        telemetry.timing("backend.mongo.isClosingExists", startTime);
        if (ret && ret > 0) {
            return true;
        } else {
            return false
        }

    }
    public async stockClosingIdListByDate(date: string, restaurantId: string): Promise<Array<string>> {
        var startTime = new Date();
        let items = await this.DBInventoryStoreStockClosing.find({

            restaurantId: new mongoose.Types.ObjectId(restaurantId),
            closingDate: date,


        });
        telemetry.timing("backend.mongo.stockClosingIdListByDate", startTime);

        if (items && items.length > 0) {
            let it = items.map(i => i._id)
            return it;

        } else {
            return [];
        }


    }

    public async deleteStockClosingByIdList(ids: Array<string>, restaurantId: string): Promise<Array<string>> {
        var startTime = new Date();

        var objectIdList = ids.map(closingId => new mongoose.Types.ObjectId(closingId.toString()));
        let resp = await this.DBInventoryStoreStockClosing.deleteMany({
            // accountId: new mongoose.Types.ObjectId(restaurantId),
            _id: { '$in': objectIdList }
        });
        telemetry.timing("backend.mongo.deleteStockClosingByIdList", startTime);



        return ids;



    }



    public async getAllStockClosingReprot(params: InventoryStockIssueReportModel): Promise<InventoryStockClosingReportResponse> {
        var startTime = new Date();

        let query = {
            restaurantId: new mongoose.Types.ObjectId(params.restaurantId),
        };
        if (params.startDate && params.endDate) {
            query["closingDate"] = params.startDate;
        }



        let baseQuery: any = [];
        baseQuery.push({
            $match: query
        });

        // baseQuery.push({
        //     $group: {
        //         '_id': '$variantId',
        //         'quantity': { '$sum': '$qty' },
        //         'price': {
        //             '$sum': { '$divide': [{ '$multiply': ['$qty', '$priceQtyUnit'] }, 100] }
        //         },
        //         'itemId': { '$first': '$itemId' },
        //         'variantId': { '$first': '$variantId' },
        //         'qtyUnit': { '$first': '$qtyUnit' }
        //     }
        // });



        baseQuery.push({
            $lookup: {
                'from': 'inventoryitems',
                'localField': 'itemId',
                'foreignField': '_id',
                'as': 'itemDetails'
            }
        });
        baseQuery.push({
            $lookup: {
                'from': 'inventoryitemvariants',
                'localField': 'variantId',
                'foreignField': '_id',
                'as': 'variantDetails'
            }
        });
        baseQuery.push({
            $project: {
                '_id': 1,
                'qty': 1,
                'qtyUnit': 1,
                'priceQtyUnit': 1,
                'averagePrice': 1,
                'itemId': 1,
                'variantId': 1,
                variantAveragePrice: 1,
                variantLatestPrice: 1,
                variantCurrentStockQTY: 1,
                variantQTY: 1,
                variantQTYUnit: 1,
                'itemName': { '$arrayElemAt': ['$itemDetails.name', 0] },
                'categoryId': { '$arrayElemAt': ['$itemDetails.categoryId', 0] },
                'variantName': { '$arrayElemAt': ['$variantDetails.variantName', 0] },
                'variantQty': { '$arrayElemAt': ['$variantDetails.variantQTY', 0] },
                'variantUnit': { '$arrayElemAt': ['$variantDetails.variantQTYUnit', 0] }
            }
        });
        baseQuery.push({
            $lookup: {
                'from': 'inventorycategories',
                'localField': 'categoryId',
                'foreignField': '_id',
                'as': 'category'
            }
        });
        baseQuery.push({
            $project: {
                '_id': 1,
                'qty': 1,
                'qtyUnit': 1,
                'priceQtyUnit': 1,
                'averagePrice': 1,
                'itemId': 1,
                'variantId': 1,
                'itemName': 1,
                'categoryId': 1,
                'variantName': 1,
                'variantQty': 1,
                'variantUnit': 1,
                variantAveragePrice: 1,
                variantLatestPrice: 1,
                variantCurrentStockQTY: 1,
                variantQTY: 1,
                variantQTYUnit: 1,
                'categoryName': { '$arrayElemAt': ['$category.categoryName', 0] }
            }
        });
        baseQuery.push({
            $group: {
                _id: "$categoryName",
                items: { $push: "$$CURRENT" },
                categoryId: { $first: "$categoryId" },
                categoryName: { $first: "$categoryName" }
            }
        });
        baseQuery.push({ $sort: { _id: 1 } });


        let totalNumberOfOrders: number = await this.getTotalDocs(baseQuery, this.DBInventoryStoreStockClosing);



        let items = await this.DBInventoryStoreStockClosing.aggregate(baseQuery);



        // let currentPageOrder: number = await this.getTotalDocs(baseQuery, this.dBCostCenterStock);



        let response: InventoryStockClosingReportResponse = new InventoryStockClosingReportResponse();
        let ret = null;//Utility.getListOfItems(items, InventoryUtilityV2.getInventoryClosingStockReportBaseModel);

        response.setData(ret);
        // response.setCurrentPageItemCount(currentPageOrder);
        response.setTotalNumberOfItems(totalNumberOfOrders);
        response.setPage(params.page);
        response.setLimit(params.limit);
        response.setRestaurant(params.restaurantId);
        response.setTotalPages(Math.floor(totalNumberOfOrders / params.limit) + 1);

        telemetry.timing("backend.mongo.getAllStockClosingReprot", startTime);
        return response;
    }
    public async getTotalDocs(query: any, data: any): Promise<number> {
        query.push({ $group: { _id: null, total: { $sum: 1 } } });
        let numberOfOrders = await data.aggregate(query);
        query.splice(query.length - 1, 1);
        return numberOfOrders[0] && numberOfOrders[0].total;
    }
}