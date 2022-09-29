import { BusinessTypeEnum } from "../../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { BaseRequest } from "../../../BaseRequest";

export class GetNearByBuisnessRequestModel extends BaseRequest {
    latitude: number
    longitude: number
    distanceInMeters: number
    businessType:BusinessTypeEnum
    
}
