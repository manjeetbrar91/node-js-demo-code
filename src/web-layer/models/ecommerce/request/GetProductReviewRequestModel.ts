import { BaseRequest } from "../../../BaseRequest";

export class GetProductReviewRequestModel extends BaseRequest {
    productId: string;
    userId: string;    

}
