import { MyError } from "../../common/MyError";
import { Body, Get, JsonController, Param, Post, UploadedFile } from "routing-controllers";
import { AWSUploadType } from "../../service-layer/implementations/AWSS3Service";
import { ProductType } from "../../service-layer/models/ecommerce/response/ProductModel";
import { Constants } from "../../common/utils/Constants";
import { EcommerceUtility } from "../../common/utils/ecommerce/EcommerceUtility";
import { IProductsService } from "../../service-layer/interfaces/ecommerce/IProductsService";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { GetProductsRequestModel } from "../../web-layer/models/ecommerce/request/GetProductsRequestModel";
import { IProductRatingReviewService } from "../../service-layer/interfaces/ecommerce/IProductRatingReviewService";
import { GetProductReviewRequestModel } from "../../web-layer/models/ecommerce/request/GetProductReviewRequestModel";
import { IUserWishListService } from "../../service-layer/interfaces/ecommerce/IUserWishListService";


@JsonController(Constants.ROUTER_PREFIX + "/products")
export class ProductsController {
    private readonly productService: IProductsService;
    private readonly productRatingReviewService: IProductRatingReviewService;
    private readonly userWishListService: IUserWishListService;

    constructor() {
        this.productService = ServiceFactory.getProductsService();
        this.productRatingReviewService = ServiceFactory.getProductRatingReviewService();
        this.userWishListService = ServiceFactory.getUserWishListService();
    }

    @Post("/add")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addNewProducts(@Body() req: any): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getProductModelData(req);

        if (reqModel.getVariants() != undefined && reqModel.getVariants()[0] != undefined) {
            reqModel.setMrp(reqModel.getVariants()[0].getMrp())
            reqModel.setMsp(reqModel.getVariants()[0].getMsp())
            reqModel.setSellingPrice(reqModel.getVariants()[0].getSellingPrice())
            reqModel.setQty(reqModel.getVariants()[0].getQty())
            reqModel.setQtyUnit(reqModel.getVariants()[0].getQtyUnit())
        }
        let result = await this.productService.addNewProduct(reqModel);
        for (let v of reqModel.getVariants()) {
            v.setProductId(result.getId());
            await this.productService.addProductVariant(v);
        }
        result.setVariants(reqModel.getVariants());

        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/add-variant")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addProductVariant(@Body() req: any): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getProductVariantModel(req);

        if (reqModel.getProductId() == undefined || reqModel.getMsp() == undefined || reqModel.getSellingPrice() == undefined || reqModel.getMrp() == undefined) {
            throw new MyError("Bad Request")
        }
        if (reqModel.getProductId() == undefined || reqModel.getProductId().trim() == "") {
            throw new MyError("Product id required field")
        }
        let result = await this.productService.addProductVariant(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/update")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateProduct(@Body() req: any): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getProductModelData(req);

        let result = await this.productService.updateProduct(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/update-variant")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async updateProductVariant(@Body() req: any): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getProductVariantModel(req);

        let result = await this.productService.updateProductVariant(reqModel);
        let producst = await this.productService.getProductByProductId(reqModel.getProductId())
        let variants = await this.productService.getProductVariantsByProductId(reqModel.getProductId())
        if (producst && variants) {

            if (variants != undefined && variants[0] != undefined) {
                producst.setMrp(variants[0].getMrp())
                producst.setMsp(variants[0].getMsp())
                producst.setSellingPrice(variants[0].getSellingPrice())
                producst.setQty(variants[0].getQty())
                producst.setQtyUnit(variants[0].getQtyUnit())
                try {
                    await this.productService.updateProduct(producst);
                } catch (err) { }
            }
        }
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }

    @Post("/add/images")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async uploadProductImage(@UploadedFile("fileToUpload", { required: true }) file: Express.Multer.File, @Body() req: any): Promise<ResultModel> {
        if (req.productId == undefined || req.productId == "") {
            throw new MyError("Product id is required field")
        }
        let data = await this.productService.getProductByProductId(req.productId);
        if (data == undefined || data == null) {
            throw new MyError("Product not found")
        }

        let s3Key = await ServiceFactory.getAwsS3Service().uploadFile(file, AWSUploadType.Product)
        if (s3Key && s3Key != "") {
            data.getPhotos().push(s3Key);
            data.setDefaultImage(data.getPhotos()[0]);
            let updatedData = await this.productService.updateProductImages(data);
        } else {
            throw new MyError("File upload failed.")
        }


        let result = new ResultModel();
        result.setData(data);
        return result;
    }
    @Post("/all")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getAllProductsByBusinessId(@Body() req: GetProductsRequestModel): Promise<ResultModel> {
        let data = await this.productService.getAllProductsByBusinessId(req);

        return data;
    }

    @Post("/sku")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async searchProductBySKUAndBusinessId(@Body() req: GetProductsRequestModel): Promise<ResultModel> {
        let data = await this.productService.searchProductsBySKU(req.sku, req.businessId);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }
    @Post("/search")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async searchProducts(@Body() req: GetProductsRequestModel): Promise<ResultModel> {
        let data = await this.productService.searchProducts(req);
        return data;
    }
    @Post("/recommended")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getRecommendedProductsByBusinessId(@Body() req: GetProductsRequestModel): Promise<ResultModel> {
        let data = await this.productService.getAllProductsByBusinessId(req, true);

        return data;
    }
    @Post("/top")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getTopProductsByBusinessId(@Body() req: GetProductsRequestModel): Promise<ResultModel> {
        req.onlyTopProducts = true;
        let data = await this.productService.getAllProductsByBusinessId(req, true);

        return data;
    }
    @Get("/detail/:id/:userId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getProductDetailsByProductIdAndUserId(@Param('id') id: string, @Param('userId') userId?: string): Promise<ResultModel> {
        let data = await this.productService.getProductByProductId(id);
        if (data == undefined || data == null) {
            throw new MyError("Product not found")
        }
        if (data.getProductType() == ProductType.RegularPlusVariants) {
            let variants = await this.productService.getProductVariantsByProductId(id);
            data.setVariants(variants);
        }
        data.setRatingPercentage(await this.productRatingReviewService.getProductRatingByCategory(id));
        data.setInWishList(false);
        if (userId != undefined && userId != "") {
            console.log("YUSERIDD ", userId);
            try {

                let wishList = await this.userWishListService.getWishListByUserId(userId)
                if (wishList && wishList.getProducts() && wishList.getProducts()[0]) {
                    let wishListProducts = wishList.getProducts()
                    if (wishListProducts && wishListProducts.findIndex(r => r.toString() == data.getId().toString()) > -1) {
                        data.setInWishList(true);
                    }
                }
            } catch (err) {

            }

        }
        let result = new ResultModel();
        result.setData(data);

        return result;
    }
    @Get("/detail/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getProductDetailsByProductId(@Param('id') id: string): Promise<ResultModel> {


        return await this.getProductDetailsByProductIdAndUserId(id);
    }
    @Get("/count/:businessId")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getProductsCountByBusinessId(@Param('businessId') businessId: string): Promise<ResultModel> {
        let count = await this.productService.getProductsCountByBusinessId(businessId);
        let result = new ResultModel();
        result.setData(count);
        return result;
    }

    // @Post("/update")
    // // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    // public async updateBusiness(@Body() req: AddNewBuisnessRequestModel): Promise<ResultModel> {
    //     let reqModel = EcommerceUtility.getBusinessData(req);
    //     EcommerceUtility.validateUpdateBusinessData(reqModel);
    //     let result = await this.businessService.updateBusiness(reqModel);
    //     let resultModel = new ResultModel();
    //     resultModel.setData(result);
    //     return resultModel;

    // }
    // @Get("/details/:id")
    // // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    // public async getBusinessDetails(@Param("id") id: string): Promise<ResultModel> {

    //     let data = await this.businessService.getBusinessById(id);
    //     let result = new ResultModel();
    //     result.setData(data);
    //     return result;
    // }
    @Post("/cart")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getAllCartProducts(@Body() req: any): Promise<ResultModel> {
        let data = await this.productService.getCartProductsData(req.cartProducts);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }
    @Post("/createWish")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addToWishList(@Body() req: any): Promise<ResultModel> {
        if (req.userId == undefined || req.productId == undefined) {
            throw new MyError("Bad request")
        }
        let data = await this.productService.getCartProductsData(req.cartProducts);
        let result = new ResultModel();
        result.setData(data);
        return result;
    }


    @Post("/add-review")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addProductReview(@Body() req: any): Promise<ResultModel> {
        let reqModel = EcommerceUtility.getProductRatingReviewModelData(req);
        let result = await this.productRatingReviewService.addReview(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/reviews")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getRatingReviewListByProductId(@Body() req: GetProductReviewRequestModel): Promise<ResultModel> {
        let result = await this.productRatingReviewService.getRatingReviewListByProductId(req);

        // resultModel.setData(result);
        return result;

    }

    @Get("/delete/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteProduct(@Param('id') id: string): Promise<ResultModel> {
        let count = await ServiceFactory.getUserOrderService().getOrdersCountByProductId(id)
        if (count > 0) {
            throw new MyError("Unable to delete product");
        }
        await this.productService.hardDeleteProduct(id);
        let result = new ResultModel();
        result.setData(null);
        return result
    }
    @Get("/delete/variant/:id")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteProductVariant(@Param('id') id: string): Promise<ResultModel> {
        let count = await ServiceFactory.getUserOrderService().getOrdersCountByVariantId(id)
        if (count > 0) {
            throw new MyError("Unable to delete product variant");
        }
        await this.productService.hardDeleteProductVariant(id);
        let result = new ResultModel();
        result.setData(null);
        return result
    }

    @Post("/delete/images")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async deleteProductImage(@Body() req: any): Promise<ResultModel> {
        if (req.imageId == undefined || req.imageId == "" || req.productId == undefined || req.productId == "") {
            throw new MyError("Product id is required field")
        }
        let data = await this.productService.getProductByProductId(req.productId);
        if (data == undefined || data == null) {
            throw new MyError("Product not found")
        }



        let index = data.getPhotos().findIndex(img => img == req.imageId);
        if (index == -1) {
            throw new MyError("Image Not Found")
        } else {
            data.getPhotos().splice(index, 1);
            if (data.getPhotos() && data.getPhotos().length > 0) {
                data.setDefaultImage(data.getPhotos()[0]);
            } else {
                data.setDefaultImage("");
            }
            let updatedData = await this.productService.updateProductImages(data);
            let result = new ResultModel();
            result.setData(data);
            return result;
        }




    }
    @Get("/low-stock-notification")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async sendLowStockNotification(): Promise<ResultModel> {
        await this.productService.sendLowStockNotification();
        let result = new ResultModel();
        result.setData(null);
        return result
    }
}