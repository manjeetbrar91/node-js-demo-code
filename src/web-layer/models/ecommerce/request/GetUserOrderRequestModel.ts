import { BusinessTypeEnum } from "../../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { BaseRequest } from "../../../BaseRequest";

export class GetUserOrderRequestModel extends BaseRequest {
    businessId: string;
    userId: string;    
    status: string;    

}
