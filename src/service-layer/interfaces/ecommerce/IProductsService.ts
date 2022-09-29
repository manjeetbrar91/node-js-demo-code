import { GetProductsRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductsRequestModel";
import { ProductModel } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { ProductVariantModel } from "../../../service-layer/models/ecommerce/response/ProductVariantModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";

export interface IProductsService {
    addProductVariant(data: ProductVariantModel): Promise<ProductVariantModel>
    addNewProduct(data: ProductModel): Promise<ProductModel>
    updateProductImages(data: ProductModel): Promise<ProductModel>
    getAllProductsByBusinessId(req: GetProductsRequestModel, showRecommend?: boolean):  Promise<ResultModel>
    getProductVariantsByProductId(productId: string): Promise<Array<ProductVariantModel>>
    getProductByProductId(productId: string): Promise<ProductModel>
    getCartProductsData(req: Array<any>): Promise<Array<CartResponseModel>>
    getAllProductsByProductIdArray(req: Array<string>): Promise<Array<CartResponseModel>> 
    updateProductAverageRating(productId: string, rating: number): Promise<any>

    searchProducts(req: GetProductsRequestModel): Promise<ResultModel>
    searchProductsBySKU(sku:string,businessId:string): Promise<Array<CartResponseModel>>
    getProductsCountByCategoryId(categoryId:string): Promise<number> ;
    getProductsCountBySubCategoryId(subCategoryId:string): Promise<number>
    hardDeleteProduct(id: string): Promise<boolean>;
    hardDeleteProductVariant(id: string): Promise<boolean>;
    updateProduct(data: ProductModel): Promise<ProductModel>
    updateProductVariant(data: ProductVariantModel): Promise<ProductVariantModel>
    getProductsCountByBusinessId(businessId: string): Promise<number> 
    sendLowStockNotification(): Promise<Array<any>>
}