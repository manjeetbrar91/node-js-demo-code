import { RestaurantExtraCharge } from './RestaurantExtraCharge';
export class RestaurantPreferences {
    private id: string;
    private extraCharges: RestaurantExtraCharge[];
    private paymentMethods: Array<string>;
    private channels: Array<string>;
    private productTags: Array<string>;

    public getChannels(): Array<string> {
        return this.channels;
    }

    public setChannels(channels: Array<string>): void {
        this.channels = channels;
    }

    public getExtraCharges(): RestaurantExtraCharge[] {
        return this.extraCharges;
    }

    public setExtraCharges(extraCharges: RestaurantExtraCharge[]): void {
        this.extraCharges = extraCharges;
    }

    public getPaymentMethods(): Array<string> {
        return this.paymentMethods;
    }

    public setPaymentMethods(paymentMethods: Array<string>): void {
        this.paymentMethods = paymentMethods;
    }

    public getProductTags(): Array<string> {
        return this.productTags;
    }

    public setProductTags(productTags: Array<string>): void {
        this.productTags = productTags;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
}