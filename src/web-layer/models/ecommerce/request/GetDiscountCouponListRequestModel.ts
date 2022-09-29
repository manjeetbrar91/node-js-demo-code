import { OrderTypeEnum } from "service-layer/models/ecommerce/OrderTypeEnum";
import { BusinessTypeEnum } from "../../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { BaseRequest } from "../../../BaseRequest";

export class GetDiscountCouponListRequestModel extends BaseRequest {
    businessId: string;
    dontShowToCustomer: boolean;
    couponStatus: CouponFilter
    orderType: OrderTypeEnum


    status: string;
    userId: string;

}
export enum CouponFilter {
    ACTIVE = "active",
    UPCOMING = "upcoming",
    EXPIRED = "expired",
}
