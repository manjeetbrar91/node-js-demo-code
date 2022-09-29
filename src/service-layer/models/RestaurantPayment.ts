export class RestaurantPayment {
    private id: string;
    private accountId: string;
    private paymentAmount: number;
    private dueDate: Date;
    private createdTS: number;
    private updatedTS: number;
    private status: string;

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getId(): string{
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getAccountId(): string
    {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getPaymentAmount(): number{
        return this.paymentAmount;
    }

    public setPaymentAmount(paymentAmount: number): void {
        this.paymentAmount = paymentAmount;
    }

    public getDueDate(): Date{
        return this.dueDate;
    }

    public setDueDate(dueDate: Date): void {
        this.dueDate = dueDate;
    }

    public getCreatedTS(): number
    {
        return this.createdTS;
    }

    public setCreatedTS(createdTS: number): void {
        this.createdTS = createdTS;
    }

    public getUpdatedTS(): number {
        return this.updatedTS;
    }

    public setUpdatedTS(updatedTS: number): void {
        this.updatedTS = updatedTS;
    }
}