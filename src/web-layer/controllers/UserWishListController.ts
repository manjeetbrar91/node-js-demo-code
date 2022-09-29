import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { IProductsService } from "../../service-layer/interfaces/ecommerce/IProductsService";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { IUserWishListService } from "../../service-layer/interfaces/ecommerce/IUserWishListService";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";


@JsonController(Constants.ROUTER_PREFIX + "/wishlist")
export class UserWishListController {
    private readonly wishListService: IUserWishListService;
    private readonly productsService: IProductsService;

    constructor() {
        this.wishListService = ServiceFactory.getUserWishListService();
        this.productsService = ServiceFactory.getProductsService();
    }

    @Post("/create")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addToWishList(@Body() req: any): Promise<ResultModel> {
        if (req.userId == undefined || req.productId == undefined) {
            throw new MyError("Bad request")
        }
        let data = await this.wishListService.createWishList(req.userId, req.productId);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }
    @Post("/clear")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async clearWishList(@Body() req: any): Promise<ResultModel> {
        if (req.userId == undefined) {
            throw new MyError("Bad request")
        }
        let data = await this.wishListService.clearWishList(req.userId, null);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }
    @Post("/remove")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async removeWishList(@Body() req: any): Promise<ResultModel> {
        if (req.userId == undefined || req.productId == undefined) {
            throw new MyError("Bad request")
        }
        let data = await this.wishListService.removeProductFromWishList(req.userId, req.productId);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }
    @Get("/:userId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getUserWishList(@Param("userId") userId: string): Promise<ResultModel> {
        let data = await this.wishListService.getWishListByUserId(userId);
        let productArray = []
        if (data != null && data != undefined) {
            let products = data.getProducts();
            products = products.map(p => p.toString());
            productArray = await this.productsService.getAllProductsByProductIdArray(products);
        }
        let result = new ResultModel();
        result.setData(productArray);
        return result;
    }
}