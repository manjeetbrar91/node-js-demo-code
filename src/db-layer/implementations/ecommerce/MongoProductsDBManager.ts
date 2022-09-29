import * as mongoose from "mongoose";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { IProductsDBManager } from "../../../db-layer/interfaces/ecommerce/IProductsDBManager";
import { DBConstants } from "../../../db-layer/models/DBConstants";
import { DBProductsSchema } from "../../../db-layer/models/ecommerce/DBProducts";
import { DBProductVariantSchema } from "../../../db-layer/models/ecommerce/DBProductVariant";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";
import { ProductModel } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { ProductVariantModel } from "../../../service-layer/models/ecommerce/response/ProductVariantModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { telemetry } from "../../../telemetry";
import { GetProductsRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductsRequestModel";
export class MongoProductsDBManager implements IProductsDBManager {

    private productsDB: any;
    private productVariantsDB: any;

    constructor() {
        this.productsDB = mongoose.model(DBConstants.ProductCollection, DBProductsSchema);
        this.productVariantsDB = mongoose.model(DBConstants.ProductVariantsCollection, DBProductVariantSchema);
    }
    public async updateProduct(data: ProductModel): Promise<ProductModel> {
        const ret = await this.productsDB.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(data.getId()),
        }, {
            $set: {
                isVeg: data.isIsVeg(),
                countryOfOrigin: data.getCountryOfOrigin(),
                productBrand: data.getProductBrand(),
                sku: data.getSku(),
                showInTopProduct: data.isShowInTopProduct(),
                showRecommend: data.isShowRecommend(),
                productCode: data.getProductCode(),
                productWeight: data.getProductWeight(),
                description: data.getDescription(),
                productFeatures: data.getProductFeatures(),
                howToUse: data.getHowToUse(),
                msp: data.getMsp(),
                mrp: data.getMrp(),
                sellingPrice: data.getSellingPrice(),
                deliveryCharges: data.getDeliveryCharges(),
                quantityAvailable: data.getQuantityAvailable(),
                stockAlertAt: data.getStockAlertAt(),
                gstRate: data.getGstRate(),
                enableInventory: data.isEnableInventory(),
                appointmentRequired: data.isAppointmentRequired(),
                qty: data.getQty(),
                qtyUnit: data.getQtyUnit(),

            }
        }, { new: true });

        return data;

    }
    public async updateProductVariant(data: ProductVariantModel): Promise<ProductVariantModel> {
        const ret = await this.productVariantsDB.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(data.getId()),
        }, {
            $set: {
                msp: data.getMsp(),
                mrp: data.getMrp(),
                sellingPrice: data.getSellingPrice(),
                variantName: data.getVariantName(),
                sku: data.getSku(),
                productWeight: data.getProductWeight(),
                deliveryCharges: data.getDeliveryCharges(),
                quantityAvailable: data.getQuantityAvailable(),
                stockAlertAt: data.getStockAlertAt(),
                enableInventory: data.isEnableInventory(),
                qty: data.getQty(),
                qtyUnit: data.getQtyUnit(),

            }
        }, { new: true });
        return EcommerceUtility.getProductVariantModel(ret);
    }
    public async updateProductImages(data: ProductModel): Promise<ProductModel> {
        const ret = await this.productsDB.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(data.getId()),
        }, {
            $set: {
                photos: data.getPhotos(),
                defaultImage: data.getDefaultImage(),
            }
        }, { new: true });

        return data;

    }
    public async updateProductAverageRating(productId: string, rating: number, isUpdate: boolean): Promise<any> {
        //noOfReviews
        //averageRating

        let q
        if (isUpdate) {
            q = { $set: { averageRating: rating }, }
        } else {
            q = {
                $set: { averageRating: rating },
                $inc: { noOfReviews: 1 }
            }
        }
        const ret = await this.productsDB.update({
            _id: new mongoose.Types.ObjectId(productId),
        }, q);

        return true;

    }
    public async addNewProduct(data: ProductModel): Promise<ProductModel> {
        try {
            let startTime = new Date();
            let db = new this.productsDB(data);
            let ret = await db.save();
            telemetry.timing("backend.mongo.addNewProduct", startTime);
            return EcommerceUtility.getProductModelData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async addProductVariant(data: ProductVariantModel): Promise<ProductVariantModel> {
        try {
            let startTime = new Date();
            let db = new this.productVariantsDB(data);
            let ret = await db.save();
            telemetry.timing("backend.mongo.addProductVariant", startTime);
            return EcommerceUtility.getProductVariantModel(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }



    public async getAllProductsByBusinessId(req: GetProductsRequestModel, wishListProducts: [], showRecommend?: boolean): Promise<ResultModel> {
        try {


            req = EcommerceUtility.validateRequest(req);

            let startTime = new Date();
            let baseQuery = {
                businessId: new mongoose.Types.ObjectId(req.businessId),
            };
            if (req.categoryId != undefined && req.categoryId.trim() != "") {
                baseQuery['categoryId'] = new mongoose.Types.ObjectId(req.categoryId)
            }
            if (req.subCategoryId != undefined && req.subCategoryId.trim() != "") {
                baseQuery['subCategoryId'] = new mongoose.Types.ObjectId(req.subCategoryId)
            }
            if (req.searchText != undefined && req.searchText.trim() != "") {
                baseQuery['productName'] = (new RegExp(req.searchText, 'i'))
            }
            if (req.sku != undefined && req.sku.trim() != "") {
                baseQuery['sku'] = (new RegExp(req.sku, 'i'))
            }

            if (showRecommend != undefined && showRecommend == true) {
                baseQuery["showRecommend"] = true;
            } else if (req.onlyTopProducts != undefined && req.onlyTopProducts === true) {
                baseQuery["showInTopProduct"] = true;
            }

            let items = []
            let totalDocs = 0;
            if (req.lowStockOnly != undefined && req.lowStockOnly == true) {
                baseQuery["productType"] = "regular";
                let query: any = [
                    {
                        $match: baseQuery
                    },
                    {
                        $addFields: {
                            abc: { $cmp: ['$quantityAvailable', "$stockAlertAt"] },
                        }
                    }, {
                        $match: {
                            abc: 0
                        }
                    }]

                totalDocs = await this.getTotalDocs(query, this.productsDB);
                query.push({ $sort: { quantityAvailable: -1 } },
                    { $skip: req.offset },
                    { $limit: req.limit });

                console.log(JSON.stringify(query));

                items = await this.productsDB.aggregate(query);
                // totalDocs = 0;
            } else {
                items = await this.productsDB.find(baseQuery)
                    .sort(req.sortingObject)
                    .skip(req.offset)
                    .limit(req.limit);
                totalDocs = await this.productsDB.count(baseQuery)
            }
            // let query = [
            //     {
            //         $match: baseQuery
            //     },
            //     {
            //         $addFields: {
            //             abc: { $cmp: ['$quantityAvailable', "$stockAlertAt"] },
            //         }
            //     }, {
            //         $match: {
            //             ab: 0
            //         }
            //     }, {
            //         $sort: {
            //             quantityAvailable: -1
            //         }
            //     }]


            telemetry.timing("backend.mongo.getAllProductsByBusinessId", startTime);

            let data = [];
            if (items && items[0]) {
                for (let item of items) {
                    data.push(EcommerceUtility.getAllProductsModelByBusinessId(item, wishListProducts))
                }
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


    public async getProductByProductId(productId: string): Promise<ProductModel> {
        try {




            let startTime = new Date();

            let q = [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(productId),
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'category'
                    }
                }, {
                    $lookup: {
                        from: 'subcategories',
                        localField: 'subCategoryId',
                        foreignField: '_id',
                        as: 'subCategory'
                    }
                }, {
                    $addFields: {
                        categoryName: { '$arrayElemAt': ['$category.categoryName', 0] },
                        subCategoryName: { '$arrayElemAt': ['$subCategory.subCategoryName', 0] },
                    }
                }, {
                    $project: { category: 0, subCategory: 0 }
                }];
            telemetry.timing("backend.mongo.getProductByProductId", startTime);

            let items = await this.productsDB.aggregate(q);
            if (items && items[0]) {
                return EcommerceUtility.getProductModelData(items[0]);
            }
            return null;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getProductVariantsByProductId(productId: string): Promise<Array<ProductVariantModel>> {
        try {




            let startTime = new Date();
            let items = await this.productVariantsDB.find({
                productId: new mongoose.Types.ObjectId(productId),
            });

            telemetry.timing("backend.mongo.getProductVariantsByProductId", startTime);


            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getProductVariantModel)
            }
            return data;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }


    public async getAllProductsByProductIdArray(productId: Array<string>): Promise<Array<CartResponseModel>> {
        try {

            var productIdArray = productId.map(i => new mongoose.Types.ObjectId(i));
            let startTime = new Date();
            let baseQuery = {
                _id: { $in: productIdArray },
            };
            let items = await this.productsDB.find(baseQuery);//.ort();            
            telemetry.timing("backend.mongo.getAllProductsByProductIdArray", startTime);
            let data = [];
            if (items && items[0]) {

                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getCartResponseModel)
            }

            return data;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getAllVariantsByVariantIdArray(variantId: Array<string>): Promise<Array<CartResponseModel>> {
        try {

            var productIdArray = variantId.map(i => new mongoose.Types.ObjectId(i));
            let startTime = new Date();
            let baseQuery = {

            };
            let q = [{
                $match: {
                    _id: { $in: productIdArray }
                }
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'products'
                }
            }, {
                $project:
                {
                    variantName: 1,
                    productId: 1,
                    variantId: "$_id",
                    quantityAvailable: 1,
                    enableInventory: 1,
                    productName: {
                        '$arrayElemAt': [
                            '$products.productName', 0
                        ]
                    },
                    categoryId: {
                        '$arrayElemAt': [
                            '$products.categoryId', 0
                        ]
                    },
                    defaultImage: {
                        '$arrayElemAt': [
                            '$products.defaultImage', 0
                        ]
                    },
                    gstRate: {
                        '$arrayElemAt': [
                            '$products.gstRate', 0
                        ]
                    },
                    businessId: {
                        '$arrayElemAt': [
                            '$products.businessId', 0
                        ]
                    },
                    appointmentRequired: {
                        '$arrayElemAt': [
                            '$products.appointmentRequired', 0
                        ]
                    },
                    mrp: 1,
                    sellingPrice: 1,
                    deliveryCharges: 1,
                    productWeight:1

                }
            }]

            console.log(JSON.stringify(q));

            let items = await this.productVariantsDB.aggregate(q);//.ort();            
            telemetry.timing("backend.mongo.getAllVariantsByVariantIdArray", startTime);
            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getCartResponseModel)
            }

            return data;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async searchProducts(req: GetProductsRequestModel, wishListProducts: []): Promise<ResultModel> {
        {
            try {


                let startTime = new Date();
                let baseQuery = {
                    productName: (new RegExp(req.searchText, 'i'))
                };
                let q: any = [
                    {
                        $match: baseQuery
                    },
                    {
                        $lookup: {
                            from: 'businesses',
                            localField: 'businessId',
                            foreignField: '_id',
                            as: 'business'
                        }
                    },
                    {
                        $unwind: { path: "$business", preserveNullAndEmptyArrays: true }
                    },
                    {
                        $match: { 'business.status': { $ne: DBConstants.deletedStatus } }
                    }
                ];

                let totalDocs = await this.productsDB.count(baseQuery)
                q.push({ $sort: { updatedAt: -1 } },
                    { $skip: req.offset },
                    { $limit: req.limit });

                let items = await this.productsDB.aggregate(q);//.ort();            
                telemetry.timing("backend.mongo.searchProducts", startTime);

                let data = [];
                if (items && items[0]) {
                    for (let item of items) {
                        data.push(EcommerceUtility.getAllProductsModelByBusinessId(item, wishListProducts))
                    }
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
    }
    public async getAllProductsBySKU(sku: string, businessId: string): Promise<Array<CartResponseModel>> {
        try {

            let startTime = new Date();
            let baseQuery = {
                sku: (new RegExp(sku, 'i')),
                businessId: new mongoose.Types.ObjectId(businessId)
            };
            let items = await this.productsDB.find(baseQuery);//.ort();            
            telemetry.timing("backend.mongo.getAllProductsByProductIdArray", startTime);
            let data = [];
            if (items && items[0]) {

                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getCartResponseModel)
            }

            return data;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getAllVariantsBySKU(sku: string, businessId: string): Promise<Array<CartResponseModel>> {
        try {


            let startTime = new Date();

            let q = [{
                $match: {
                    sku: (new RegExp(sku, 'i')),

                }
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'products'
                }
            }, {
                $match: {
                    "products.businessId": new mongoose.Types.ObjectId(businessId)
                }
            }, {
                $project:
                {
                    variantName: 1,
                    productId: 1,
                    variantId: "$_id",
                    productName: {
                        '$arrayElemAt': [
                            '$products.productName', 0
                        ]
                    },
                    defaultImage: {
                        '$arrayElemAt': [
                            '$products.defaultImage', 0
                        ]
                    },
                    gstRate: {
                        '$arrayElemAt': [
                            '$products.gstRate', 0
                        ]
                    },
                    businessId: {
                        '$arrayElemAt': [
                            '$products.businessId', 0
                        ]
                    },
                    mrp: 1,
                    sellingPrice: 1,
                    deliveryCharges: 1


                }
            }]


            let items = await this.productVariantsDB.aggregate(q);//.ort();            
            telemetry.timing("backend.mongo.getAllVariantsBySKU", startTime);
            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getCartResponseModel)
            }

            return data;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }


    public async getProductsCountByCategoryId(categoryId: string): Promise<number> {
        try {
            let startTime = new Date();
            let count = await this.productsDB.count({ categoryId: new mongoose.Types.ObjectId(categoryId) })
            return count;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getProductsCountByBusinessId(businessId: string): Promise<number> {
        try {
            let startTime = new Date();
            let count = await this.productsDB.count({ businessId: new mongoose.Types.ObjectId(businessId), })
            return count;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getProductsCountBySubCategoryId(subCategoryId: string): Promise<number> {
        try {
            let startTime = new Date();
            let count = await this.productsDB.count({ subCategoryId: new mongoose.Types.ObjectId(subCategoryId) })
            return count;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }


    public async hardDeleteProduct(id: string): Promise<boolean> {

        let items = await this.productsDB.find({
            _id: new mongoose.Types.ObjectId(id),
        });
        if (items && items[0]) {
            await this.productsDB.deleteMany({
                _id: new mongoose.Types.ObjectId(id),
            });
            await this.productVariantsDB.deleteMany({
                productId: new mongoose.Types.ObjectId(id),
            });
            return true;
        } else {
            throw new MyError("unable to delete product.");
        }

    }

    public async hardDeleteProductVariant(id: string): Promise<boolean> {

        let items = await this.productVariantsDB.find({
            _id: new mongoose.Types.ObjectId(id),
        });
        if (items && items[0]) {
            await this.productVariantsDB.deleteMany({
                _id: new mongoose.Types.ObjectId(id),
            });
            return true;
        } else {
            throw new MyError("unable to delete product Variant.");
        }

    }
    public async getLowStockProductsCount(): Promise<Array<any>> {
        try {
            let startTime = new Date();
            let items = []
            let query: any = [{
                $match: { productType: "regular" }
            }, {
                $addFields: {
                    abc: { $cmp: ['$quantityAvailable', "$stockAlertAt"] }
                }
            }, {
                $match: { abc: 0 }
            }, {
                $group: {
                    _id: "$businessId",
                    count: { $sum: 1 }
                }
            }]

            items = await this.productsDB.aggregate(query);
            if (items && items[0]) {
                return items;
            } else {
                return []
            }
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
}