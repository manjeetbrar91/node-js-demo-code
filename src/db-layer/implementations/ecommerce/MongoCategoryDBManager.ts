import { stringMap } from "aws-sdk/clients/backup";
import * as mongoose from "mongoose";
import { MyError } from "../../../common/MyError";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { DBProductCategorySchema } from "../../../db-layer/models/ecommerce/DBProductCategory";
import { DBProductSubCategorySchema } from "../../../db-layer/models/ecommerce/DBProductSubCategory";
import { CategoryModel } from "../../../service-layer/models/ecommerce/response/CategoryModel";
import { SubCategoryModel } from "../../../service-layer/models/ecommerce/response/SubCategoryModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { telemetry } from "../../../telemetry";
import { GetCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetCategoryRequestModel";
import { GetSubCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetSubCategoryRequestModel";
import { ICategoryDBManager } from "../../interfaces/ecommerce/ICategoryDBManager";
import { DBConstants } from "../../models/DBConstants";
export class MongoCategoryDBManager implements ICategoryDBManager {
    private categoryDB: any;
    private subCategoryDB: any;

    constructor() {
        this.categoryDB = mongoose.model(DBConstants.CategoryCollection, DBProductCategorySchema);
        this.subCategoryDB = mongoose.model(DBConstants.SubCategoryCollection, DBProductSubCategorySchema);
    }


    public async addNewCategory(data: CategoryModel): Promise<CategoryModel> {
        let cat = await this.getCategoryByName(data.getCategoryName().trim());
        if (cat != null && cat != undefined) {
            // throw new MyError("Category with same name already exsits",null);
            throw new MyError("Category with same name already exsits");
        }
        try {

            let db = new this.categoryDB(data);
            let ret = await db.save();
            return EcommerceUtility.getCategoryData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    public async getCategoryByName(categoryName: string): Promise<CategoryModel> {

        let items = await this.categoryDB.find({ categoryName: (new RegExp(categoryName, 'i')) });
        if (items && items[0]) {
            return EcommerceUtility.getCategoryData(items[0])
        } else {
            return null;
        }

    }
    public async getSubCategoryByName(categoryId: string, subCategoryName: string) {

        let items = await this.subCategoryDB.find({ categoryId: new mongoose.Types.ObjectId(categoryId), subCategoryName: (new RegExp(subCategoryName, 'i')) });
        if (items && items[0]) {
            return EcommerceUtility.getCategoryData(items[0])
        } else {
            return null;
        }

    }


    public async getAllCategory(req: GetCategoryRequestModel): Promise<ResultModel> {
        try {


            req = EcommerceUtility.validateRequest(req);

            let startTime = new Date();
            let matchQuery: any = { businessType: req.businessType };
            if (req.createdBy != undefined && req.createdBy.trim() != "") {
                matchQuery = { businessType: req.businessType, createdBy: req.createdBy };
            }
            let items = await this.categoryDB.find(matchQuery).sort({ categoryName: 1 })

            telemetry.timing("backend.mongo.getAllCategory", startTime);

            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getCategoryData)
            }

            let result = new ResultModel();
            result.setData(data);
            return result;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }







    //Sub category Section
    public async addNewSubCategory(data: SubCategoryModel): Promise<SubCategoryModel> {
        try {
            let db = new this.subCategoryDB(data);
            let ret = await db.save();
            return EcommerceUtility.getSubCategoryData(ret);
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }

    public async getAllSubCategory(req: GetSubCategoryRequestModel): Promise<ResultModel> {
        try {


            req = EcommerceUtility.validateRequest(req);

            let startTime = new Date();
            let items = await this.subCategoryDB.find({ categoryId: new mongoose.Types.ObjectId(req.categoryId) }).sort({ subCategoryName: 1 })

            telemetry.timing("backend.mongo.getAllSubCategory", startTime);

            let data = [];
            if (items && items[0]) {
                data = EcommerceUtility.getListOfItems(items, EcommerceUtility.getSubCategoryData)
            }

            let result = new ResultModel();
            result.setData(data);
            return result;
        } catch (err) {
            throw new MyError(err.message, err.stack);
        }
    }
    
    public async deleteCategory(categoryId: string, createdBy: string): Promise<boolean> {

        let items = await this.categoryDB.find({
            createdBy: new mongoose.Types.ObjectId(createdBy),
            _id: new mongoose.Types.ObjectId(categoryId),
        });
        if (items && items[0]) {

            await this.categoryDB.deleteMany({
                createdBy: new mongoose.Types.ObjectId(createdBy),
                _id: new mongoose.Types.ObjectId(categoryId),
            });
            await this.subCategoryDB.deleteMany({
                createdBy: new mongoose.Types.ObjectId(createdBy),
                categoryId:new mongoose.Types.ObjectId(categoryId),
            });
            
            return true;
        } else {
            throw new MyError("unable to delete category.");
        }

    }
    public async deleteSubCategory(subCategoryId: string, createdBy: string): Promise<boolean> {

        let items = await this.subCategoryDB.find({
            createdBy: new mongoose.Types.ObjectId(createdBy),
            _id: new mongoose.Types.ObjectId(subCategoryId),
        });
        if (items && items[0]) {

            await this.subCategoryDB.deleteMany({
                createdBy: new mongoose.Types.ObjectId(createdBy),
                _id: new mongoose.Types.ObjectId(subCategoryId),
            });
            return true;
        } else {
            throw new MyError("unable to delete sub category.");
        }

    }
}