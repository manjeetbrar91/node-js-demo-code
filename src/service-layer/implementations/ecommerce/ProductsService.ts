import { GetProductsRequestModel } from "../../../web-layer/models/ecommerce/request/GetProductsRequestModel";
import { DBManagerFactory } from "../../../db-layer/DataAccessLayerFactory";
import { IProductsDBManager } from "../../../db-layer/interfaces/ecommerce/IProductsDBManager";
import { IProductsService } from "../../../service-layer/interfaces/ecommerce/IProductsService";
import { ProductModel } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { ProductVariantModel } from "../../../service-layer/models/ecommerce/response/ProductVariantModel";
import { ResultModel } from "../../../service-layer/models/ResultModel";
import { CartResponseModel } from "../../../service-layer/models/ecommerce/response/CartResponseModel";
import { IUserWishListDBManager } from "../../../db-layer/interfaces/ecommerce/IUserWishListDBManager";
import { ServiceFactory } from "../../../service-layer/ServiceFactory";

export class ProductsService implements IProductsService {
    private readonly productsDBManager: IProductsDBManager;
    private readonly wishListDBManager: IUserWishListDBManager;

    constructor() {
        this.productsDBManager = DBManagerFactory.getProductsDBManager();
        this.wishListDBManager = DBManagerFactory.getUserWishListDBManager();
    }

    public async updateProductVariant(data: ProductVariantModel): Promise<ProductVariantModel> {
        return await this.productsDBManager.updateProductVariant(data);
    }
    public async addProductVariant(data: ProductVariantModel): Promise<ProductVariantModel> {
        return await this.productsDBManager.addProductVariant(data);
    }
    public async addNewProduct(data: ProductModel): Promise<ProductModel> {
        return await this.productsDBManager.addNewProduct(data);
    }
    public async updateProduct(data: ProductModel): Promise<ProductModel> {
        return await this.productsDBManager.updateProduct(data);
    }
    public async updateProductAverageRating(productId: string, rating: number): Promise<any> {
        return await this.productsDBManager.updateProductAverageRating(productId, rating, false);
    }
    public async updateProductImages(data: ProductModel): Promise<ProductModel> {
        return await this.productsDBManager.updateProductImages(data);
    }
    public async getAllProductsByBusinessId(req: GetProductsRequestModel, showRecommend?: boolean): Promise<ResultModel> {
        let wishListProducts = [];
        if (req.userId != undefined) {

            let wishList = await this.wishListDBManager.getWishListByUserId(req.userId)
            if (wishList && wishList.getProducts() && wishList.getProducts()[0]) {
                wishListProducts = wishList.getProducts()
            }
        }

        return await this.productsDBManager.getAllProductsByBusinessId(req, wishListProducts, showRecommend);
    }
    public async searchProducts(req: GetProductsRequestModel): Promise<ResultModel> {
        let wishListProducts = [];
        if (req.userId != undefined) {

            let wishList = await this.wishListDBManager.getWishListByUserId(req.userId)
            if (wishList && wishList.getProducts() && wishList.getProducts()[0]) {
                wishListProducts = wishList.getProducts()
            }
        }

        return await this.productsDBManager.searchProducts(req, wishListProducts);
    }
    public async getProductVariantsByProductId(productId: string): Promise<Array<ProductVariantModel>> {
        return await this.productsDBManager.getProductVariantsByProductId(productId);
    }
    public async getProductByProductId(productId: string): Promise<ProductModel> {
        return await this.productsDBManager.getProductByProductId(productId);
    }

    public async getCartProductsData(req: Array<any>): Promise<Array<CartResponseModel>> {
        let productId = [];
        let variantIdArray = [];
        for (let p of req) {
            if (p.variantId != undefined && p.variantId.trim() != "") {
                variantIdArray.push(p.variantId);
            } else {
                productId.push(p.productId);
            }
        }

        let arrVariants = await this.productsDBManager.getAllVariantsByVariantIdArray(variantIdArray);
        let arrProducts = await this.productsDBManager.getAllProductsByProductIdArray(productId);
        return arrProducts.concat(arrVariants);

    }
    public async searchProductsBySKU(sku: string, businessId: string): Promise<Array<CartResponseModel>> {



        let arrVariants = await this.productsDBManager.getAllVariantsBySKU(sku, businessId);
        let arrProducts = await this.productsDBManager.getAllProductsBySKU(sku, businessId)
        return arrProducts.concat(arrVariants);

    }
    public async getAllProductsByProductIdArray(req: Array<string>): Promise<Array<CartResponseModel>> {


        let arrProducts = await this.productsDBManager.getAllProductsByProductIdArray(req);
        return arrProducts;

    }
    public async getProductsCountByCategoryId(categoryId: string): Promise<number> {
        return await this.productsDBManager.getProductsCountByCategoryId(categoryId)
    }
    public async getProductsCountByBusinessId(businessId: string): Promise<number> {
        return await this.productsDBManager.getProductsCountByBusinessId(businessId)
    }
    public async getProductsCountBySubCategoryId(subCategoryId: string): Promise<number> {

        return await this.productsDBManager.getProductsCountBySubCategoryId(subCategoryId)
    }
    public async hardDeleteProduct(id: string): Promise<boolean> {
        return await this.productsDBManager.hardDeleteProduct(id);
    }
    public async hardDeleteProductVariant(id: string): Promise<boolean> {
        return await this.productsDBManager.hardDeleteProductVariant(id)
    }
    public async sendLowStockNotification(): Promise<Array<any>> {
        let result = await this.productsDBManager.getLowStockProductsCount()
        if (result) {
            for (let b of result) {
                if (b._id) {
                    let businessId = b._id.toString();
                    let count = (b.count != undefined ? b.count : 1)
                    let r = await ServiceFactory.getEcommerceNotificationService().lowStockNotification(businessId, count);
                }
            }
        }
        return result;
    }
}