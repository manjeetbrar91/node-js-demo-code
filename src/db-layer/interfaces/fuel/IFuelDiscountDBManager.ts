import { ResultModel } from "../../../service-layer/models/ResultModel";

import { FuelDiscountCouponModel } from "../../../service-layer/models/fuel/FuelDiscountCouponModel";
import { GetFuelDiscountCouponListRequestModel } from "../../../web-layer/models/fuel/GetFuelDiscountCouponListRequestModel";


export interface IFuelDiscountDBManager {

    enableDisableDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel>;
    deleteDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel>;
    addOrUpdateDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel>;
    getDiscountCouponForBusiness(req: GetFuelDiscountCouponListRequestModel): Promise<ResultModel>
    getDiscountCouponForBusinessByCouponCode(fuelStationId: string, couponCode: string): Promise<FuelDiscountCouponModel>
    getDiscountCouponById(fuelStationId: string, couponCode: string): Promise<FuelDiscountCouponModel>
}