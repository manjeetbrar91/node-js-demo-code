export enum RazorPayPaymentMethod {
    Unknown = "unknown",
    Card = "card",
    NetBanking = "netbanking",
    Wallet = "wallet",
    Emi = "emi",
    Upi = "upi"
}

export class PaymentGatewayCaptureResponse {
    private paymentId: string;
    private paymentAmount: number;
    private method: string;
    private international: boolean;
    private bank: string;
    private wallet: string;
    private fee: number;
    private tax: number;
    private cardType: string;
    private cardNetwork: string;

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

    getMethod(): string {
        return this.method;
    }

    setMethod(paymentStatus: string): void {
        this.method = paymentStatus
    }

    isInternational(): boolean {
        return this.international;
    }

    setInternational(international: boolean): void {
        this.international = international
    }

    getBank(): string {
        return this.bank;
    }

    setBank(bank: string): void {
        this.bank = bank
    }

    getWallet(): string {
        return this.wallet;
    }

    setWallet(wallet: string): void {
        this.wallet = wallet
    }

    getFee(): number {
        return this.fee;
    }

    setFee(fee: number): void {
        this.fee = fee
    }

    getTax(): number {
        return this.tax;
    }

    setTax(tax: number): void {
        this.tax = tax
    }

    getCardNetwork(): string {
        return this.cardNetwork;
    }

    setCardNetwork(cardNetwork: string): void {
        this.cardNetwork = cardNetwork
    }

    getCardType(): string {
        return this.cardType;
    }

    setCardType(cardType: string): void {
        this.cardType = cardType
    }
}