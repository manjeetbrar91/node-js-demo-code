
import { GetCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetCategoryRequestModel";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { ICategoryDBManager } from "../../../db-layer/interfaces/ecommerce/ICategoryDBManager";
import { ICategoryService } from "../../../service-layer/interfaces/ecommerce/ICategoryService";
import { CategoryModel } from "../../../service-layer/models/ecommerce/response/CategoryModel";
import { SubCategoryModel } from "../../../service-layer/models/ecommerce/response/SubCategoryModel";
import { GetSubCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetSubCategoryRequestModel";
import { ResultModel } from "../../models/ResultModel";

export class CategoryService implements ICategoryService {

    private readonly categoryDBManager: ICategoryDBManager;

    constructor() {
        this.categoryDBManager = DBManagerFactory.getCategoryDBManager();
    }

    public async addNewSubCategory(data: SubCategoryModel): Promise<SubCategoryModel> {
        return this.categoryDBManager.addNewSubCategory(data);
    }
    public async addNewCategory(data: CategoryModel): Promise<CategoryModel> {
        return this.categoryDBManager.addNewCategory(data);
    }
    public async getCategoryByName(categoryName: string): Promise<CategoryModel> {
        return this.categoryDBManager.getCategoryByName(categoryName);
    }
    public async getSubCategoryByName(categoryId: string, subCategoryName: string) {
        return this.categoryDBManager.getSubCategoryByName(categoryId, subCategoryName);
    }
    public async getAllCategory(req: GetCategoryRequestModel): Promise<ResultModel> {
        return this.categoryDBManager.getAllCategory(req);
    }
    public async getAllSubCategory(req: GetSubCategoryRequestModel): Promise<ResultModel> {
        return this.categoryDBManager.getAllSubCategory(req);
    }

    public async deleteCategory(categoryId: string, createdBy: string): Promise<boolean> {
        return this.categoryDBManager.deleteCategory(categoryId, createdBy);
    }
    public async deleteSubCategory(subCategoryId: string, createdBy: string): Promise<boolean> {
        return this.categoryDBManager.deleteSubCategory(subCategoryId, createdBy)
    }
}