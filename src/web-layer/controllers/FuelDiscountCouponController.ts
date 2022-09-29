import { FuelUtility } from "../../common/utils/FuelUtility";
import { Body, JsonController, Post } from "routing-controllers";
import { IFuelDiscountService } from "../../service-layer/interfaces/fuel/IFuelDiscountService";
import { FuelDiscountCouponModel } from "../../service-layer/models/fuel/FuelDiscountCouponModel";
import { GetFuelDiscountCouponListRequestModel } from "../../web-layer/models/fuel/GetFuelDiscountCouponListRequestModel";
import { Constants } from "../../common/utils/Constants";
import { ObjectStatus } from "../../service-layer/models/ObjectStatus";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";


@JsonController(Constants.ROUTER_PREFIX + "/fuel-discount")
export class FuelDiscountCouponController {
    private readonly businessService: IFuelDiscountService;

    constructor() {
        this.businessService = ServiceFactory.getFuelDiscountService();
    }

    @Post("/delete")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteDiscountCoupon(@Body() req: any): Promise<ResultModel> {


        let reqModel = new FuelDiscountCouponModel();
        reqModel.setId(req.id)
        reqModel.setFuelStationId(req.fuelStationId)
        reqModel.setStatus(ObjectStatus.Deleted)
        let result = await this.businessService.deleteDiscountCoupon(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/enableDisable")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async enableDisableDiscountCoupon(@Body() req: any): Promise<ResultModel> {


        let reqModel = new FuelDiscountCouponModel();
        reqModel.setId(req.id)
        reqModel.setFuelStationId(req.fuelStationId)
        reqModel.setEnable(req.enable != undefined ? req.enable : true)
        let result = await this.businessService.enableDisableDiscountCoupon(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/details")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getDiscountCouponById(@Body() req: any): Promise<ResultModel> {
        let result = await this.businessService.getDiscountCouponById(req.fuelStationId, req.id);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;
    }
    @Post("/add")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addOrUpdateDiscountCoupon(@Body() req: any): Promise<ResultModel> {
        let reqModel = FuelUtility.getFuelDiscountCoupon(req);
        let result = await this.businessService.addOrUpdateDiscountCoupon(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/all")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getDiscountCouponForBusiness(@Body() req: GetFuelDiscountCouponListRequestModel): Promise<ResultModel> {
        return await this.businessService.getDiscountCouponForBusiness(req);
    }
}