import { ServiceObject } from "./ServiceObject";

export class TableReservation extends ServiceObject {
    private accountId: string;
    private customerId: string;
    private customerName: string;
    private phoneNumber: number;
    private numberOfAdults: number;
    private numberOfKids: number;
    private date: string;
    private time: string;
    private updatedAt: string;

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getCustomerName(): string {
        return this.customerName;
    }

    public setCustomerName(customerName: string): void {
        this.customerName = customerName;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: number): void {
        this.phoneNumber = phoneNumber;
    }

    public getCustomerId(): string {
        return this.customerId;
    }

    public setCustomerId(customerId: string): void {
        this.customerId = customerId;
    }

    public getNumberOfAdults(): number {
        return this.numberOfAdults;
    }

    public setNumberOfAdults(numberOfAdults: number): void {
        this.numberOfAdults = numberOfAdults;
    }

    public getNumberOfKids(): number {
        return this.numberOfKids;
    }

    public setNumberOfKids(numberOfKids: number): void {
        this.numberOfKids = numberOfKids;
    }

    public getDate(): string {
        return this.date;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    public getTime(): string {
        return this.time;
    }

    public setTime(time: string): void {
        this.time = time;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: string): void {
        this.updatedAt = updatedAt;
    }
}