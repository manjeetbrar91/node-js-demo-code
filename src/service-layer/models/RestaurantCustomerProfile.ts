import { Customer } from "./Customer";

export class RestaurantCustomerProfile extends Customer {
    private orders: number;
    private totalSpent: number;
    private noOfGuests: number;

    public getOrders(): number {
        return this.orders;
    }

    public setOrders(orders: number): void {
        this.orders = orders;
    }

    public getTotalSpent(): number {
        return this.totalSpent;
    }

    public setTotalSpent(totalSpent: number): void {
        this.totalSpent = totalSpent;
    }

    public getNoOfGuests(): number {
        return this.noOfGuests;
    }

    public setNoOfGuests(noOfGuests: number): void {
        this.noOfGuests = noOfGuests;
    }

}