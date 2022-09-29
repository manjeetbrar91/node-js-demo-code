import { IProductRatingReviewDBManager } from "../../../db-layer/interfaces/ecommerce/IProductRatingReviewDBManager";
import { ProductRatingReviewModel } from "../../../service-layer/models/ecommerce/response/ProductRatingReviewModel";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IProductRatingReviewService } from "../../interfaces/ecommerce/IProductRatingReviewService";
import { IProductsDBManager } from "../../../db-layer/interfaces/ecommerce/IProductsDBManager";
import { GetProductReviewRequestModel } from "web-layer/models/ecommerce/request/GetProductReviewRequestModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { EcommerceUtility } from "../../../common/utils/ecommerce/EcommerceUtility";
import { ProductRatingModel } from "../../../service-layer/models/ecommerce/response/ProductRatingModel";

export class ProductRatingReviewService implements IProductRatingReviewService {
    private readonly productRatingReviewDBManager: IProductRatingReviewDBManager;
    private readonly productsDBManager: IProductsDBManager;
    constructor() {
        this.productRatingReviewDBManager = DBManagerFactory.getProductRatingReviewDBManager();
        this.productsDBManager = DBManagerFactory.getProductsDBManager();
    }
    public async addReview(data: ProductRatingReviewModel): Promise<ProductRatingReviewModel> {
        let isUpdate = await this.productRatingReviewDBManager.addReview(data);
        let rating = await this.productRatingReviewDBManager.getAverageRatingByProductId(data);
        await this.productsDBManager.updateProductAverageRating(data.getProductId(), rating,isUpdate);
        return data;
    }
    public async getProductRatingByCategory(productId: string): Promise<ProductRatingModel> {
        return await this.productRatingReviewDBManager.getProductRatingByCategory(productId);
    }
    public async getRatingReviewListByProductId(req: GetProductReviewRequestModel): Promise<ResultModel> {

        let data = {
            myReview: null,
            otherReview: []
        }

        let myReviewList = await this.productRatingReviewDBManager.getRatingReviewListByProductId(req, true);
        let otherReviewList = await this.productRatingReviewDBManager.getRatingReviewListByProductId(req, false);

        data.myReview = (myReviewList.getData() && myReviewList.getData()[0]) ? (myReviewList.getData()[0]) : null;
        data.otherReview = (otherReviewList.getData() && otherReviewList.getData()[0]) ? otherReviewList.getData() : [];


        let resultModel = new ResultModel();
        resultModel = EcommerceUtility.baseRequestToResultModel(req, resultModel);
        resultModel.setData(data)
        resultModel.setTotal(otherReviewList.getTotal())
        return resultModel;
    }
}