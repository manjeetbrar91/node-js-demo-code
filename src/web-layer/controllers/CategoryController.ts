
import { Body, ContentType, Get, JsonController, Post, Req, Res, UploadedFile, UseBefore } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { AWSUploadType } from "../../service-layer/implementations/AWSS3Service";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { EcommerceUtility } from "../../common/utils/ecommerce/EcommerceUtility";
import { ICategoryService } from "../../service-layer/interfaces/ecommerce/ICategoryService";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { GetCategoryRequestModel } from "../../web-layer/models/ecommerce/request/GetCategoryRequestModel";
import { GetSubCategoryRequestModel } from "../../web-layer/models/ecommerce/request/GetSubCategoryRequestModel";
import { IProductsService } from "../../service-layer/interfaces/ecommerce/IProductsService";




@JsonController(Constants.ROUTER_PREFIX + "/category")
export class CategoryController {
    private readonly categoryService: ICategoryService;
    private readonly productsService: IProductsService;

    constructor() {
        this.categoryService = ServiceFactory.getCategoryService();
        this.productsService = ServiceFactory.getProductsService();
    }


    // @Get("/list")
    // public async getC(): Promise<any> {
    //     const s3 = new AWS.S3({
    //         accessKeyId: ID,
    //         secretAccessKey: SECRET
    //     });


    //     const params = {
    //         Bucket: BUCKET_NAME,
    //         Key: 'category/10BJ-ABU0-TL8J-MTY0MzYxNDY2MDc0NA==.jpg', // File name you want to save as in S3
    //         // Body: fileContent
    //     };
    //     let readStream = s3.getObject(params).createReadStream();
    //     return readStream;
    // }

    @Post("/add/category")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    // public async addCategory(@UploadedFile("fileToUpload", { required: false }) file: Express.Multer.File, @Body() req: any): Promise<ResultModel> {
    public async addCategory(@UploadedFile("fileToUpload") file: Express.Multer.File, @Body() req: any): Promise<ResultModel> {


        let reqModel = EcommerceUtility.getCategoryData(req);
        let category = await this.categoryService.getCategoryByName(reqModel.getCategoryName());
        if (category != null && category != undefined) {
            // throw new MyError("Category with same name already exsits",null);
            throw new MyError("Category with same name already exsits");
        }

        let s3Key = await ServiceFactory.getAwsS3Service().uploadFile(file, AWSUploadType.Category)
        // let s3Key = s3Response.Key ? s3Response.Key : "";
        reqModel.setDefaultImage(s3Key);
        if (s3Key && s3Key != "") {
            reqModel.getPhotos().push(s3Key);
        }
        EcommerceUtility.validateCreateCategoryData(reqModel);
        let result = await this.categoryService.addNewCategory(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }



    @Post("/add/subcategory")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async addSubCategory(@UploadedFile("fileToUpload", { required: false }) file: Express.Multer.File, @Body() req: any): Promise<ResultModel> {

        let reqModel = EcommerceUtility.getSubCategoryData(req);
        EcommerceUtility.validateCreateSubCategoryData(reqModel);
        let subCategoryByName = await this.categoryService.getSubCategoryByName(reqModel.getCategoryId(), reqModel.getSubCategoryName().trim());
        if (subCategoryByName != null && subCategoryByName != undefined) {
            // throw new MyError("Category with same name already exsits",null);
            throw new MyError("Sub Category with same name already exsits");
        }
        let s3Key = await ServiceFactory.getAwsS3Service().uploadFile(file, AWSUploadType.Category)
        reqModel.setDefaultImage(s3Key);
        if (s3Key && s3Key != "") {
            reqModel.getPhotos().push(s3Key);
        }

        let result = await this.categoryService.addNewSubCategory(reqModel);
        let resultModel = new ResultModel();
        resultModel.setData(result);
        return resultModel;

    }
    @Post("/all")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async getAllCategory(@Body() req: GetCategoryRequestModel): Promise<ResultModel> {

        if (req.businessType == undefined || req.businessType.trim() == "") {
            throw new MyError("Business Type is required field");
        }

        return await this.categoryService.getAllCategory(req);
    }


    @Post("/all/subcatgory")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    @ResponseSchema(ResultModel, { statusCode: '400' })
    public async getAllSubCateogory(@Body() req: GetSubCategoryRequestModel): Promise<ResultModel> {
        if (req.categoryId == undefined || req.categoryId.trim() == "") {
            throw new MyError("Category id is required field");
        }

        return await this.categoryService.getAllSubCategory(req);
    }

    @Post("/delete/category")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))    
    public async deleteCategory(@Body() req: any): Promise<ResultModel> {

        if (req.categoryId == undefined || req.categoryId == "" || req.createdBy == undefined || req.createdBy == "") {
            throw new MyError("Bad Request");
        }
        let count = await this.productsService.getProductsCountByCategoryId(req.categoryId)
        if (count > 0) {
            throw new MyError("Unable to delete category");
        }
        let r = await this.categoryService.deleteCategory(req.categoryId, req.createdBy)
        let resultModel = new ResultModel();
        resultModel.setData(null);
        return resultModel;
    }

    @Post("/delete/subcategory")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))    
    public async deleteSubCategory(@Body() req: any): Promise<ResultModel> {

        if (req.subCategoryId == undefined || req.subCategoryId == "" || req.createdBy == undefined || req.createdBy == "") {
            throw new MyError("Bad Request");
        }
        let count = await this.productsService.getProductsCountBySubCategoryId(req.subCategoryId)
        if (count > 0) {
            throw new MyError("Unable to delete sub category");
        }
        
        let r = await this.categoryService.deleteSubCategory(req.subCategoryId, req.createdBy)
        let resultModel = new ResultModel();
        resultModel.setData(null);
        return resultModel;
    }
}

