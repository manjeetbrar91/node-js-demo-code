import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { IUserDeliveryAddressService } from "../../service-layer/interfaces/ecommerce/IUserDeliveryAddressService";
import { AddNewUserDeliveryAddressRequestModel } from "../../web-layer/models/ecommerce/request/AddNewUserDeliveryAddressRequestModel";
import { Constants } from "../../common/utils/Constants";
import { EcommerceUtility } from "../../common/utils/ecommerce/EcommerceUtility";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { MyError } from "../../common/MyError";


@JsonController(Constants.ROUTER_PREFIX + "/user/delivery-address")
export class UserDeliveryAddressController {
    private readonly businessService: IUserDeliveryAddressService;

    constructor() {
        this.businessService = ServiceFactory.getUserDeliveryAddressService();
    }

    @Post("/add")
    public async addNewtUserDeliveryAddress(@Body() req: AddNewUserDeliveryAddressRequestModel): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getUserDeliveryAddressData(req);
        let result = await this.businessService.addNewDeliveryAddress(reqModel);

        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/primary")
    public async makePrimaryAddress(@Body() req: any): Promise<ResultModel> {
        if (req.id == undefined || req.id == "" || req.userId == undefined || req.userId == "") {
            throw new MyError("Bad request")
        }
        let result = await this.businessService.makePrimaryAddress(req.id,req.userId);

        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/update")
    public async updateUserDeliveryAddress(@Body() req: AddNewUserDeliveryAddressRequestModel): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getUserDeliveryAddressData(req);
        reqModel.setCreatedAt(undefined);
        reqModel.setLastModifiedAt(undefined);
        let result = await this.businessService.updateDeliveryAddress(reqModel);

        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }

    @Post("/delete")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteUserDeliveryAddress(@Body() req: AddNewUserDeliveryAddressRequestModel): Promise<ResultModel> {
        let result = await this.businessService.deleteUserDeliveryAddress(req.userId, req.id);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Get("/all/:userId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getAllDeliveryAddressOfUser(@Param('userId') userId: string): Promise<ResultModel> {
        let addressArray = await this.businessService.getAllDeliveryAddressOfUser(userId);
        let result = new ResultModel();
        result.setData(addressArray ? addressArray : []);
        return result;
    }
    @Get("/details/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getUserDeliveryAddressById(@Param("id") id: string): Promise<ResultModel> {

        let data = await this.businessService.getUserDeliveryAddressById(id);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }
}