import { ServiceObject } from "../../ServiceObject";

export class ProductRatingReviewModel extends ServiceObject {
    private productId: string;
    private rating: number;
    private review: string;
    private userId: string;
    private firstName: string;
    private lastName: string;
    private image: string;

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }


    public getProductId(): string {
        return this.productId;
    }

    public setProductId(productId: string): void {
        this.productId = productId;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getReview(): string {
        return this.review;
    }

    public setReview(review: string): void {
        this.review = review;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }



}

