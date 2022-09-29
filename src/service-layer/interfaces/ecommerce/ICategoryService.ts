import { SubCategoryModel } from "../../../service-layer/models/ecommerce/response/SubCategoryModel";
import { CategoryModel } from "../../../service-layer/models/ecommerce/response/CategoryModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetBuisnessRequestModel } from "../../../web-layer/models/ecommerce/request/GetBuisnessRequestModel";
import { GetSubCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetSubCategoryRequestModel";
import { GetCategoryRequestModel } from "../../../web-layer/models/ecommerce/request/GetCategoryRequestModel";

export interface ICategoryService {
    addNewCategory(data: CategoryModel): Promise<CategoryModel>
    addNewSubCategory(data: SubCategoryModel): Promise<SubCategoryModel>
    getAllCategory(req: GetCategoryRequestModel): Promise<ResultModel>
    getAllSubCategory(req: GetSubCategoryRequestModel): Promise<ResultModel> 
    getCategoryByName(categoryName: string): Promise<CategoryModel> 
    getSubCategoryByName(categoryId: string,subCategoryName:string)
    deleteCategory(categoryId: string, createdBy: string): Promise<boolean>
    deleteSubCategory(subCategoryId: string, createdBy: string): Promise<boolean>
}