import { GetProductsRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductsRequestModel";
import { ProductModel } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { ProductVariantModel } from "../../../service-layer/models/ecommerce/response/ProductVariantModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";
export interface IProductsDBManager {
    addProductVariant(data: ProductVariantModel): Promise<ProductVariantModel>;
    addNewProduct(data: ProductModel): Promise<ProductModel>;
    updateProductImages(data: ProductModel): Promise<ProductModel>;
    getAllProductsByBusinessId(req: GetProductsRequestModel, wishListProducts: any[], showRecommend?: boolean): Promise<ResultModel>;
    getProductVariantsByProductId(productId: string): Promise<Array<ProductVariantModel>>;
    getProductByProductId(productId: string): Promise<ProductModel>;
    getAllVariantsByVariantIdArray(variantId: Array<string>): Promise<Array<CartResponseModel>>;
    getAllProductsByProductIdArray(productId: Array<string>): Promise<Array<CartResponseModel>>;
    updateProductAverageRating(productId: string, rating: number, isUpdate: boolean): Promise<any>;
    searchProducts(req: GetProductsRequestModel, wishListProducts: any[]): Promise<ResultModel>;
    getAllVariantsBySKU(sku: string, businessId: string): Promise<Array<CartResponseModel>>;
    getAllProductsBySKU(sku: string, businessId: string): Promise<Array<CartResponseModel>>;
    getProductsCountByCategoryId(categoryId: string): Promise<number>;
    getProductsCountBySubCategoryId(subCategoryId: string): Promise<number>;
    hardDeleteProduct(id: string): Promise<boolean>;
    hardDeleteProductVariant(id: string): Promise<boolean>;
    updateProduct(data: ProductModel): Promise<ProductModel>
    updateProductVariant(data: ProductVariantModel): Promise<ProductVariantModel>
    getProductsCountByBusinessId(businessId: string): Promise<number> 
    getLowStockProductsCount(): Promise<Array<any>>
}