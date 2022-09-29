import { BusinessTypeEnum } from "../../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { BaseRequest } from "../../../BaseRequest";

export class GetProductsRequestModel extends BaseRequest {
    userId: string;
    businessId: string;
    categoryId: string;
    subCategoryId: string;
    onlyTopProducts:boolean
    sku: string;
    
}
