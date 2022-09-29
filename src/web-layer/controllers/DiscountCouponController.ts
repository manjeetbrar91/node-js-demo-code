import { Body, JsonController, Post } from "routing-controllers";
import { Constants } from "../../common/utils/Constants";
import { EcommerceUtility } from "../../common/utils/ecommerce/EcommerceUtility";
import { IDiscountService } from "../../service-layer/interfaces/ecommerce/IDiscountService";
import { DiscountCouponModel } from "../../service-layer/models/ecommerce/response/DiscountCouponModel";
import { ObjectStatus } from "../../service-layer/models/ObjectStatus";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { GetDiscountCouponListRequestModel } from "../../web-layer/models/ecommerce/request/GetDiscountCouponListRequestModel";


@JsonController(Constants.ROUTER_PREFIX + "/discount")
export class DiscountCouponController {
    private readonly businessService: IDiscountService;

    constructor() {
        this.businessService = ServiceFactory.getDiscountService();
    }

    @Post("/delete")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteDiscountCoupon(@Body() req: any): Promise<ResultModel> {


        let reqModel = new DiscountCouponModel();
        reqModel.setId(req.id)
        reqModel.setBusinessId(req.businessId)
        reqModel.setStatus(ObjectStatus.Deleted)
        let result = await this.businessService.deleteDiscountCoupon(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/enableDisable")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async enableDisableDiscountCoupon(@Body() req: any): Promise<ResultModel> {


        let reqModel = new DiscountCouponModel();
        reqModel.setId(req.id)
        reqModel.setBusinessId(req.businessId)
        reqModel.setEnable(req.enable != undefined ? req.enable : true)
        let result = await this.businessService.enableDisableDiscountCoupon(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/details")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getDiscountCouponById(@Body() req: any): Promise<ResultModel> {
        let result = await this.businessService.getDiscountCouponById(req.businessId, req.id);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;
    }
    @Post("/add")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addOrUpdateDiscountCoupon(@Body() req: any): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getDiscountCoupon(req);
        let result = await this.businessService.addOrUpdateDiscountCoupon(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/all")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getDiscountCouponForBusiness(@Body() req: GetDiscountCouponListRequestModel): Promise<ResultModel> {
        return await this.businessService.getDiscountCouponForBusiness(req);
    }
}