export class OrderPayment {
    private paymentMethod: string;
    private paymentDetails: string;
    private paymentAmount: number;

    public getPaymentMethod(): string {
        return this.paymentMethod;
    }

    public setPaymentMethod(paymentMethod: string): void {
        this.paymentMethod = paymentMethod;
    }

    public getPaymentDetails(): string {
        return this.paymentDetails;
    }

    public setPaymentDetails(paymentDetails: string): void {
        this.paymentDetails = paymentDetails;
    }

    public getPaymentAmount(): number {
        return this.paymentAmount;
    }

    public setPaymentAmount(paymentAmount: number): void {
        this.paymentAmount = paymentAmount;
    }
}