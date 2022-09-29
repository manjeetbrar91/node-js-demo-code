import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetDiscountCouponListRequestModel } from "../../../web-layer/models/ecommerce/request/GetDiscountCouponListRequestModel";
import { DiscountCouponModel } from "../../../service-layer/models/ecommerce/response/DiscountCouponModel";
import { CustomerOrderModel } from "../../../service-layer/models/ecommerce/CustomerOrderModel";

 

export interface IDiscountService {
    addOrUpdateDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel>;
    deleteDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel>;
    enableDisableDiscountCoupon(promotion: DiscountCouponModel): Promise<DiscountCouponModel>;
    
    // gxetDiscountCouponForBusiness(accountId: string, status: string ): Promise<Array<DiscountCouponModel>>;
    getDiscountCouponForBusiness(req: GetDiscountCouponListRequestModel): Promise<ResultModel>


    applyCouponPromotionV1(order: CustomerOrderModel, couponCode: string, throwErrorMessage: boolean, couponId?: string): Promise<any>
    getDiscountCouponById(businessId: string, couponId: string): Promise<DiscountCouponModel>
}