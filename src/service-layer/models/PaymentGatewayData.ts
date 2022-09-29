export class PaymentGatewayData {
    private orderDate: Date;
    private orderTime: Date;
    private id: string;
    private billNumber: number;
    private orderAmount: number;
    private transactionType: string;
    private pgPercentage: number;
    private pgAmount: number;
    private pgGstAmount: number;
    private gstPercentageOnAmount: number;
    private totalPgCharges: number;
    private transferAmount: number;

    public getOrderDate(): Date {
        return this.orderDate;
    }

    public setOrderDate(orderDate: Date): void {
        this.orderDate = orderDate;
    }

    public getOrderTime(): Date {
        return this.orderTime;
    }

    public setOrderTime(orderTime: Date): void {
        this.orderTime = orderTime;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getBillNumber(): number {
        return this.billNumber;
    }

    public setBillNumber(billNumber: number): void {
        this.billNumber = billNumber;
    }

    public getOrderAmount(): number {
        return this.orderAmount;
    }

    public setOrderAmount(orderAmount: number): void {
        this.orderAmount = orderAmount;
    }

    public getTransactionType(): string {
        return this.transactionType;
    }

    public setTransactionType(transactionType: string): void {
        this.transactionType = transactionType;
    }

    public getPgPercentage(): number {
        return this.pgPercentage;
    }

    public setPgPercentage(pgPercentage: number): void {
        this.pgPercentage = pgPercentage;
    }

    public getPgAmount(): number {
        return this.pgAmount;
    }

    public setPgAmount(pgAmount: number): void {
        this.pgAmount = pgAmount;
    }

    public getPgGstAmount(): number {
        return this.pgGstAmount;
    }

    public setPgGstAmount(pgGstAmount: number): void {
        this.pgGstAmount = pgGstAmount;
    }

    public getGstPercentageOnAmount(): number {
        return this.gstPercentageOnAmount;
    }

    public setGstPercentageOnAmount(gstPercentageOnAmount: number): void {
        this.gstPercentageOnAmount = gstPercentageOnAmount;
    }

    public getTotalPgCharges(): number {
        return this.totalPgCharges;
    }

    public setTotalPgCharges(totalPgCharges: number): void {
        this.totalPgCharges = totalPgCharges;
    }

    public getTransferAmount(): number {
        return this.transferAmount;
    }

    public setTransferAmount(transferAmount: number): void {
        this.transferAmount = transferAmount;
    }
}