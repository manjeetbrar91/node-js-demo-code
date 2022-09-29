import { GetProductReviewRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductReviewRequestModel";
import { ProductRatingReviewModel } from "../../../service-layer/models/ecommerce/response/ProductRatingReviewModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { ProductRatingModel } from "../../../service-layer/models/ecommerce/response/ProductRatingModel";
export interface IProductRatingReviewDBManager {
    addReview(data: ProductRatingReviewModel): Promise<boolean>
    getAverageRatingByProductId(data: ProductRatingReviewModel): Promise<number>
    getRatingReviewListByProductId(data: GetProductReviewRequestModel, myReview: boolean): Promise<ResultModel>
    getProductRatingByCategory(productId: string): Promise<ProductRatingModel>
}