import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetDiscountCouponListRequestModel } from "../../../web-layer/models/ecommerce/request/GetDiscountCouponListRequestModel";
import { DiscountCouponModel } from "../../../service-layer/models/ecommerce/response/DiscountCouponModel";


export interface IDiscountDBManager {

    enableDisableDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel>;
    deleteDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel>;
    addOrUpdateDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel>;
    getDiscountCouponForBusiness(req: GetDiscountCouponListRequestModel): Promise<ResultModel>
    getDiscountCouponForBusinessByCouponCode(businessId: string, couponCode: string): Promise<DiscountCouponModel>
    getDiscountCouponById(businessId: string, couponCode: string): Promise<DiscountCouponModel>
}