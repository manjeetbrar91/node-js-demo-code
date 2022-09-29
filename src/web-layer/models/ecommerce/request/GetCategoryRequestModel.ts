import { BusinessTypeEnum } from "../../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { BaseRequest } from "../../../BaseRequest";

export class GetCategoryRequestModel extends BaseRequest {
    businessType: BusinessTypeEnum;
    createdBy: string;

}
