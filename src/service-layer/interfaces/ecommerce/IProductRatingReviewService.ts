
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { GetProductReviewRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductReviewRequestModel";
import { ProductRatingReviewModel } from "../../../service-layer/models/ecommerce/response/ProductRatingReviewModel";
import { ProductRatingModel } from "../../../service-layer/models/ecommerce/response/ProductRatingModel";

export interface IProductRatingReviewService {
    addReview(data: ProductRatingReviewModel): Promise<ProductRatingReviewModel>
    getRatingReviewListByProductId(req: GetProductReviewRequestModel): Promise<ResultModel>;
    getProductRatingByCategory(productId: string): Promise<ProductRatingModel>;
}