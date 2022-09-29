import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { EcommerceUtility } from "../../common/utils/ecommerce/EcommerceUtility";
import { IBusinessService } from "../../service-layer/interfaces/ecommerce/IBusinessService";
import { BusinessGeoLocation } from "../../service-layer/models/ecommerce/response/BusinessResponseModel";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { AddNewBuisnessRequestModel } from "../../web-layer/models/ecommerce/request/AddNewBuisnessRequestModel";
import { GetBuisnessRequestModel } from "../../web-layer/models/ecommerce/request/GetBuisnessRequestModel";
import { GetNearByBuisnessRequestModel } from "../../web-layer/models/ecommerce/request/GetNearByBuisnessRequestModel";


@JsonController(Constants.ROUTER_PREFIX + "/business")
export class BusinessController {
    private readonly businessService: IBusinessService;

    constructor() {
        this.businessService = ServiceFactory.getBusinessService();
    }

    @Post("/add")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addNewBusiness(@Body() req: AddNewBuisnessRequestModel): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getBusinessData(req);

        let geoLocation = new BusinessGeoLocation(reqModel.getLatitude(), reqModel.getLongitude());
        reqModel.setGeoLocation(geoLocation);
        let result = await this.businessService.addNewBusiness(reqModel);

        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }

    @Post("/update")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateBusiness(@Body() req: AddNewBuisnessRequestModel): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getBusinessData(req);
        EcommerceUtility.validateUpdateBusinessData(reqModel);
        let result = await this.businessService.updateBusiness(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/delete")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteBusiness(@Body() req: AddNewBuisnessRequestModel): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getBusinessData(req);
        let result = await this.businessService.deleteBusiness(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/all")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getAllBusiness(@Body() req: GetBuisnessRequestModel): Promise<ResultModel> {
        return await this.businessService.getAllBusiness(req);
    }
    @Get("/details/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getBusinessDetails(@Param("id") id: string): Promise<ResultModel> {

        let data = await this.businessService.getBusinessById(id);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }

    @Post("/nearBy")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async nearByBusiness(@Body() req: GetNearByBuisnessRequestModel): Promise<ResultModel> {
        if (req.latitude == undefined || req.longitude == undefined || isNaN(Number(req.latitude)) || isNaN(Number(req.longitude))) {
            throw new MyError("Invalid latitude/longitude ")
        }
        if (req.distanceInMeters == undefined) {
            req.distanceInMeters = 10;
        }
        if (isNaN(Number(req.distanceInMeters))) {
            throw new MyError("Invalid distance ")
        }
        req.latitude = Number(req.latitude);
        req.longitude = Number(req.longitude);
        req.distanceInMeters = Number(req.distanceInMeters);
        let result = await this.businessService.getNearByBusiness(req);


        return result;

    }
    @Post("/availability-settings")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateBusinessAvailabilityStatus(@Body() req: any): Promise<ResultModel> {
        if (req.availabilityStatus == undefined || req.businessId == undefined || req.businessId == "") {
            throw new MyError("Bad Request")
        }

        let data = await this.businessService.updateBusinessAvailabilityStatus(req.businessId, req.availabilityStatus);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Post("/payment-settings")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateBusinessPaymentSettings(@Body() req: any): Promise<ResultModel> {
        if (req.paymentSettings == undefined || req.businessId == undefined || req.businessId == "") {
            throw new MyError("Bad Request")
        }
        let reqModel = EcommerceUtility.getBusinessPaymentSettings(req.paymentSettings)
        let data = await this.businessService.updateBusinessPaymentSettings(req.businessId, reqModel);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }

    @Post("/add-upi")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addUPIPaymentSettings(@Body() req: any): Promise<ResultModel> {
        if (req.businessId == undefined || req.businessId == "" || req.payeeAdress == undefined || req.payeeAdress.trim() == "") {
            throw new MyError("Bad Request")
        }
        let reqModel = EcommerceUtility.getBusinessUPIDetailsModel(req)
        let paymentSettings = (await this.businessService.getBusinessById(req.businessId)).getPaymentSettings();
        if (paymentSettings.getUpi() == undefined) {
            paymentSettings.setUpi([]);
        }
        let index = paymentSettings.getUpi().findIndex(u => u.getPayeeAdress().toLowerCase() == reqModel.getPayeeAdress());
        if (index != -1) {
            throw new MyError(reqModel.getPayeeAdress() + " already exists");
        }
        if (paymentSettings.getUpi().length == 0) {
            reqModel.setPrimary(true);
        }
        paymentSettings.getUpi().push(reqModel);
        let data = await this.businessService.updateBusinessPaymentSettings(req.businessId, paymentSettings);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Post("/delete-upi")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteUPIPaymentSettings(@Body() req: any): Promise<ResultModel> {
        if (req.businessId == undefined || req.businessId == "" || req.payeeAdress == undefined || req.payeeAdress.trim() == "") {
            throw new MyError("Bad Request")
        }
        let reqModel = EcommerceUtility.getBusinessUPIDetailsModel(req.paymentSettings)
        let paymentSettings = (await this.businessService.getBusinessById(req.businessId)).getPaymentSettings();
        if (paymentSettings.getUpi() == undefined) {
            paymentSettings.setUpi([]);
        }
        let index = paymentSettings.getUpi().findIndex(u => u.getPayeeAdress().toLowerCase() == reqModel.getPayeeAdress());
        if (index == -1) {
            throw new MyError(reqModel.getPayeeAdress() + " not exists");
        }
        paymentSettings.getUpi().splice(index, 1);
        let data = await this.businessService.updateBusinessPaymentSettings(req.businessId, paymentSettings);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }

    @Post("/delivery-settings")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateBusinessDeliverySettings(@Body() req: any): Promise<ResultModel> {
        if (req.deliverySettings == undefined || req.businessId == undefined || req.businessId == "") {
            throw new MyError("Bad Request")
        }
        let reqModel = EcommerceUtility.getBusinessDeliverySettingsModel(req.deliverySettings)
        let data = await this.businessService.updateBusinessDeliverySettings(req.businessId, reqModel);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Post("/timing")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateBusinessTiming(@Body() req: any): Promise<ResultModel> {
        if (req.businessTiming == undefined || req.businessId == undefined || req.businessTiming[0] == undefined || req.businessId == "") {
            throw new MyError("Bad Request")
        }
        let reqModel = EcommerceUtility.getBusinessTimingArray(req.businessTiming)
        let data = await this.businessService.updateBusinessTiming(req.businessId, reqModel);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Post("/currency/make-primary")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async makePrimaryCurrencySettings(@Body() req: any): Promise<ResultModel> {
        if (req.currency == undefined || req.businessId == undefined || req.businessId == "") {
            throw new MyError("Bad Request")
        }
        let products = await ServiceFactory.getProductsService().getProductsCountByBusinessId(req.businessId);
        if (products != undefined && products > 0) {
            throw new MyError("Unable to update primary currency")
        }
        let reqModel = EcommerceUtility.getBusinessCurrencyModel(req.currency)
        reqModel.setPrimaryCurrency(false);
        let data = await this.businessService.changePrimaryCurrencySettings(req.businessId, reqModel);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Post("/currency/add")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addNewCurrencySettings(@Body() req: any): Promise<ResultModel> {
        if (req.currency == undefined || req.businessId == undefined || req.businessId == "") {
            throw new MyError("Bad Request")
        }
        let reqModel = EcommerceUtility.getBusinessCurrencyModel(req.currency)
        reqModel.setPrimaryCurrency(false);
        let data = await this.businessService.addNewCurrencySettings(req.businessId, reqModel);
        let result = new ResultModel();
        result.setData(data);
        return result;

    }

    @Get("/currency/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getBusinessCurrencySettings(@Param("id") id: string): Promise<ResultModel> {

        let data = await this.businessService.getBusinessById(id);
        let result = new ResultModel();
        result.setData(data.getBusinessCurrencySettings());
        return result;
    }
    @Get("/timing/:businessId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getBusinessTiming(@Param("businessId") businessId: string): Promise<ResultModel> {
        let data = (await this.businessService.getBusinessById(businessId)).getBusinessTiming();
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Get("/delivery-settings/:businessId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getBusinessDeliverySettings(@Param("businessId") businessId: string): Promise<ResultModel> {
        let data = (await this.businessService.getBusinessById(businessId)).getDeliverySettings();
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Get("/payment-settings/:businessId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getBusinessPaymentSettings(@Param("businessId") businessId: string): Promise<ResultModel> {
        let data = (await this.businessService.getBusinessById(businessId)).getPaymentSettings();
        let result = new ResultModel();
        result.setData(data);
        return result;

    }
    @Get("/fuel-station-id/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getAllBusinessByFuelStationId(@Param("id") id: string): Promise<ResultModel> {

        let data = await this.businessService.getAllBusinessByFuelStationId(id);

        return data;
    }
}