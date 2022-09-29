export class PaymentGatewayResponse {
    private paymentId: string;
    private paymentAmount: number;
    private paymentStatus: string;
    private paymentReceipt: string;
    private captured: boolean;

    getPaymentId(): string {
        return this.paymentId;
    }

    setPaymentId(paymentId: string): void {
        this.paymentId = paymentId
    }

    getPaymentAmount(): number {
        return this.paymentAmount;
    }

    setPaymentAmount(paymentAmount: number): void {
        this.paymentAmount = paymentAmount
    }

    getPaymentStatus(): string {
        return this.paymentStatus;
    }

    setPaymentStatus(paymentStatus: string): void {
        this.paymentStatus = paymentStatus
    }

    getPaymentReceipt(): string {
        return this.paymentReceipt;
    }

    setPaymentReceipt(paymentReceipt: string): void {
        this.paymentReceipt = paymentReceipt
    }

    isPaymentCaptured(): boolean {
        return this.captured;
    }

    setPaymentCaptured(captured: boolean): void {
        this.captured = captured
    }
}