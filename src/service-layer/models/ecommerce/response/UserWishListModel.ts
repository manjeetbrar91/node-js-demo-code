import { ServiceObject } from "../../ServiceObject";

export class UserWishListModel extends ServiceObject {
    private userId: string;
    private products: Array<string>;
 

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getProducts(): Array<string> {
        if(this.products == undefined){
            this.products = [];
        }
        return this.products;
    }

    public setProducts(products: Array<string>): void {
        this.products = products;
    }

}