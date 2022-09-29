import { ResultModel } from "../../models/ResultModel";
  import { CustomerOrderModel } from "../../models/ecommerce/CustomerOrderModel";
import { FuelDiscountCouponModel } from "../../../service-layer/models/fuel/FuelDiscountCouponModel";
import { GetFuelDiscountCouponListRequestModel } from "../../../web-layer/models/fuel/GetFuelDiscountCouponListRequestModel";

 

export interface IFuelDiscountService {
    addOrUpdateDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel>;
    deleteDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel>;
    enableDisableDiscountCoupon(promotion: FuelDiscountCouponModel): Promise<FuelDiscountCouponModel>;
    
    // gxetDiscountCouponForBusiness(accountId: string, status: string ): Promise<Array<FuelDiscountCouponModel>>;
    getDiscountCouponForBusiness(req: GetFuelDiscountCouponListRequestModel): Promise<ResultModel>


    // applyCouponPromotionV1(order: CustomerOrderModel, couponCode: string, throwErrorMessage: boolean, couponId?: string): Promise<any>
    getDiscountCouponById(fuelStationId: string, couponId: string): Promise<FuelDiscountCouponModel>
}