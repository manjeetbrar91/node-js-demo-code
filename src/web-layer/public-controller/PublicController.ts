import { Get, JsonController, Param, Redirect } from "routing-controllers";
import { ITinyURLService } from "../../service-layer/interfaces/ITinyURLService";
import { ServiceFactory } from "../../service-layer/ServiceFactory";

@JsonController()
export class PublicController {
    private readonly tinURLService: ITinyURLService;

    constructor() {
        this.tinURLService = ServiceFactory.getTinyURLService()

    }



    // @Redirect("example.com")
    // @Get(":code")
    // public async getUserPromotionOpticsForRestaurant(@Param("code") code: string,): Promise<any> {


    //     return await this.tinURLService.getTinyURL(code);
    // }
}