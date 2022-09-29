import { ServiceObject } from "./ServiceObject";

export class MenewRevenue extends ServiceObject {
    private restaurantId: string;
    private orderId: string;
    private commisionRevenue: number;
    private deliveryRevenue: number;
    private totalRevenue: number;

    constructor (restaurantId: string, orderId: string) {
        super();
        this.restaurantId = restaurantId;
        this.orderId = orderId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getCommisionRevenue(): number {
        return this.commisionRevenue;
    }

    public setCommisionRevenue(commisionRevenue: number): void {
        this.commisionRevenue = commisionRevenue;
    }
    
    public getDeliveryRevenue(): number {
        return this.deliveryRevenue;
    }

    public setDeliveryRevenue(deliveryRevenue: number): void {
        this.deliveryRevenue = deliveryRevenue;
    }

    public getTotalRevenue(): number {
        return this.totalRevenue;
    }

    public setTotalRevenue(totalRevenue: number): void {
        this.totalRevenue = totalRevenue;
    }
}