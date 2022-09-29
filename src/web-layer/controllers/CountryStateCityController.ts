import { Get, JsonController } from "routing-controllers";
import { ICountryStateCityService } from "../../service-layer/interfaces/ecommerce/ICountryStateCityService";
import { Constants } from "../../common/utils/Constants";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";


@JsonController(Constants.ROUTER_PREFIX + "/csc")
export class CountryStateCityController {
    private readonly businessService: ICountryStateCityService;

    constructor() {
        this.businessService = ServiceFactory.getCountryStateCityService();
    }

    @Get("/countries")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getCountryList(): Promise<ResultModel> {
        let result = await this.businessService.getCountryList();
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }

}