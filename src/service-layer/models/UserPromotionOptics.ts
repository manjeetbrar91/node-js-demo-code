export class UserPromotionOptics {
    private id: string;
    private accountId: string;
    private orderId: string;
    private phoneNumber: string;
    private customerName: string;
    private orderAmount: number;
    private promotionId: string;
    private createdAt: string;
    private updatedAt: string;
    private orderStatus: string;

    public getOrderStatus(): string {
        return this.orderStatus;
    }

    public setOrderStatus(orderStatus: string): void {
        this.orderStatus = orderStatus;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getCustomerName(): string {
        return this.customerName;
    }

    public setCustomerName(customerName: string): void {
        this.customerName = customerName;
    }

    public getOrderAmount(): number {
        return this.orderAmount;
    }

    public setOrderAmount(orderAmount: number): void {
        this.orderAmount = orderAmount;
    }

    public getPromotionId(): string {
        return this.promotionId;
    }

    public setPromotionId(promotionId: string): void {
        this.promotionId = promotionId;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: string): void {
        this.updatedAt = updatedAt;
    }
}