
import { BaseRequest } from "../../../web-layer/BaseRequest";


export class GetFuelDiscountCouponListRequestModel extends BaseRequest {
    fuelStationId: string;
    dontShowToCustomer: boolean;
    couponStatus: FuelCouponFilter
    fuelType: string


    status: string;
    userId: string;

}
export enum FuelCouponFilter {
    ACTIVE = "active",
    UPCOMING = "upcoming",
    EXPIRED = "expired",
}
