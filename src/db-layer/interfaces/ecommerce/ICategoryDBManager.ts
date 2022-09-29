import { CategoryModel } from "../../../service-layer/models/ecommerce/response/CategoryModel";
import { SubCategoryModel } from "../../../service-layer/models/ecommerce/response/SubCategoryModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetCategoryRequestModel";
import { GetSubCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetSubCategoryRequestModel";

export interface ICategoryDBManager {
    
    addNewCategory(data: CategoryModel): Promise<CategoryModel>
    getAllCategory(req: GetCategoryRequestModel): Promise<ResultModel>
    addNewSubCategory(data: SubCategoryModel): Promise<SubCategoryModel>
    getAllSubCategory(req: GetSubCategoryRequestModel): Promise<ResultModel> 
    getCategoryByName(categoryName: string): Promise<CategoryModel> 
    getSubCategoryByName(categoryId: string, subCategoryName: string) 
    deleteCategory(categoryId: string, createdBy: string): Promise<boolean>
    deleteSubCategory(subCategoryId: string, createdBy: string): Promise<boolean>

}