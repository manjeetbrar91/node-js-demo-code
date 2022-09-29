import { ServiceObject } from "./ServiceObject";

export enum RazorPayPaymentStatus {
    Authorized = "authorized"
}
export enum WebhookEvents {
    Authorized = "payment.authorized",
    Failed = "payment.failed",
    Captured = "payment.captured"
}
export enum RazorpayPaymentStatus {
    Authorized = "authorized",
    Failed = "failed",
    Captured = "captured",
    Initiated = "initiated",
}
export enum PaymentStatus {
    Initiated = "initiated",
    Created = "created",
    Attempted = "attempted",
    Paid = "paid",
    SignatureVerificationFailed = "signatureVerificationFailed",
    Pending = "pending",
    Cancelled = "cancelled",
    Credit = "credit"
}

export class Payment extends ServiceObject {
    private orderId: string;
    private customerId: string;
    private accountId: string;
    private usedPointsAmount: number;
    private eligiblePointsAmount: number;
    private paymentGatewayRefId: string;
    private paymentAmount: number;
    private paymentStatus: PaymentStatus;
    private postPaymentRefId: string;
    private paymentGatewaySignature: string
    private paymentCurrency: string;
    private autoCapturePayment: boolean;
    private menewPayPayment: boolean;

    private commisionGst: number;
    private totalCommision: number;
    private netcommision: number;
    private commisionPercentage: number;
    private transferAmount: number;
    private transactionType: string;
    private currency: string;

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }



    public getCommisionGst(): number {
        return this.commisionGst;
    }

    public setCommisionGst(commisionGst: number): void {
        this.commisionGst = commisionGst;
    }

    public getTotalCommision(): number {
        return this.totalCommision;
    }

    public setTotalCommision(totalCommision: number): void {
        this.totalCommision = totalCommision;
    }

    public getNetcommision(): number {
        return this.netcommision;
    }

    public setNetcommision(netcommision: number): void {
        this.netcommision = netcommision;
    }

    public getCommisionPercentage(): number {
        return this.commisionPercentage;
    }

    public setCommisionPercentage(commisionPercentage: number): void {
        this.commisionPercentage = commisionPercentage;
    }

    public getTransactionType(): string {
        return this.transactionType;
    }

    public setTransactionType(transactionType: string): void {
        this.transactionType = transactionType;
    }

    public getTransferAmount(): number {
        return this.transferAmount;
    }

    public setTransferAmount(transferAmount: number): void {
        this.transferAmount = transferAmount;
    }





    public isMenewPayPayment(): boolean {
        return this.menewPayPayment;
    }

    public setMenewPayPayment(menewPayPayment: boolean): void {
        this.menewPayPayment = menewPayPayment;
    }


    public isAutoCapturePayment(): boolean {
        return this.autoCapturePayment;
    }

    public setAutoCapturePayment(autoCapturePayment: boolean): void {
        this.autoCapturePayment = autoCapturePayment;
    }



    public getUsedPointsAmount(): number {
        if (this.usedPointsAmount == undefined || isNaN(this.usedPointsAmount)) {
            this.usedPointsAmount = 0;
        }
        return this.usedPointsAmount;
    }

    public setUsedPointsAmount(usedPointsAmount: number): void {
        this.usedPointsAmount = usedPointsAmount;
    }

    public getEligiblePointsAmount(): number {
        if (this.eligiblePointsAmount == undefined || isNaN(this.eligiblePointsAmount)) {
            this.eligiblePointsAmount = 0;
        }
        return this.eligiblePointsAmount;
    }

    public setEligiblePointsAmount(eligiblePointsAmount: number): void {
        this.eligiblePointsAmount = eligiblePointsAmount;
    }

    getPaymentCurrency(): string {
        return this.paymentCurrency;
    }

    setPaymentCurrency(paymentCurrency: string): void {
        this.paymentCurrency = paymentCurrency
    }

    getPostPaymentRefId(): string {
        return this.postPaymentRefId;
    }

    setPostPaymentRefId(postPaymentRefId: string): void {
        this.postPaymentRefId = postPaymentRefId
    }

    getPaymentGatewaySignature(): string {
        return this.paymentGatewaySignature;
    }

    setPaymentGatewaySignature(paymentGatewaySignature: string): void {
        this.paymentGatewaySignature = paymentGatewaySignature
    }

    getPaymentAmount(): number {
        return this.paymentAmount;
    }

    setPaymentAmount(paymentAmount: number): void {
        this.paymentAmount = paymentAmount
    }

    getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }

    setPaymentStatus(paymentStatus: PaymentStatus): void {
        this.paymentStatus = paymentStatus
    }
    setPaymentStatusRaw(paymentStatus: any): void {
        this.paymentStatus = paymentStatus
    }

    getPaymentGatewayRefId(): string {
        return this.paymentGatewayRefId;
    }

    setPaymentGatewayRefId(paymentGatewayRefId: string): void {
        this.paymentGatewayRefId = paymentGatewayRefId
    }

    getOrderId(): string {
        return this.orderId;
    }

    setOrderId(orderId: string): void {
        this.orderId = orderId
    }

    getCustomerId(): string {
        return this.customerId;
    }

    setCustomerId(customerId: string): void {
        this.customerId = customerId
    }

    getAccountId(): string {
        return this.accountId;
    }

    setAccountId(accountId: string): void {
        this.accountId = accountId
    }
}
export class PaymentWebhookRespone extends Payment {
    private paymentId: string;
    private paymentAccountId: string;


    private entity: string;
    private amount: string;
    // private currency: string;
    private paymentOrderId: string;
    private invoiceId: string;
    private international: boolean;

    private method: string;
    private amountRefunded: string;
    private refundStatus: string;
    private captured: boolean;
    private description: string;
    private cardId: string;
    private bank: string;
    private wallet: string;
    private vpa: string;
    private email: string;
    private contact: string;
    private fee: number;
    private tax: number;
    private errorCode: string;
    private errorDescription: string;
    private errorSource: string;
    private errorStep: string;
    private errorReason: string;
    private bankTransaction_id: string;
    private paymentCreatedAt: string;
    private event: string;
    private eventStatus: string;
    private verified: boolean;


    public isInternational(): boolean {
        return this.international;
    }

    public setInternational(international: boolean): void {
        this.international = international;
    }

    public getPaymentAccountId(): string {
        return this.paymentAccountId;
    }

    public setPaymentAccountId(paymentAccountId: string): void {
        this.paymentAccountId = paymentAccountId;
    }
    public isVerified(): boolean {
        return this.verified;
    }

    public setVerified(verified: boolean): void {
        this.verified = verified;
    }


    public getEventStatus(): string {
        return this.eventStatus;
    }

    public setEventStatus(eventStatus: string): void {
        this.eventStatus = eventStatus;
    }

    public getEvent(): string {
        return this.event;
    }

    public setEvent(event: string): void {
        this.event = event;
    }



    public getPaymentId(): string {
        return this.paymentId;
    }

    public setPaymentId(paymentId: string): void {
        this.paymentId = paymentId;
    }

    public getEntity(): string {
        return this.entity;
    }

    public setEntity(entity: string): void {
        this.entity = entity;
    }

    public getAmount(): string {
        return this.amount;
    }

    public setAmount(amount: string): void {
        this.amount = amount;
    }

    // public getCurrency(): string {
    //     return this.currency;
    // }

    // public setCurrency(currency: string): void {
    //     this.currency = currency;
    // }

    public getPaymentOrderId(): string {
        return this.paymentOrderId;
    }

    public setPaymentOrderId(paymentOrderId: string): void {
        this.paymentOrderId = paymentOrderId;
    }

    public getInvoiceId(): string {
        return this.invoiceId;
    }

    public setInvoiceId(invoiceId: string): void {
        this.invoiceId = invoiceId;
    }


    public getMethod(): string {
        return this.method;
    }

    public setMethod(method: string): void {
        this.method = method;
    }

    public getAmountRefunded(): string {
        return this.amountRefunded;
    }

    public setAmountRefunded(amountRefunded: string): void {
        this.amountRefunded = amountRefunded;
    }

    public getRefundStatus(): string {
        return this.refundStatus;
    }

    public setRefundStatus(refundStatus: string): void {
        this.refundStatus = refundStatus;
    }

    public isCaptured(): boolean {
        return this.captured;
    }

    public setCaptured(captured: boolean): void {
        this.captured = captured;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getCardId(): string {
        return this.cardId;
    }

    public setCardId(cardId: string): void {
        this.cardId = cardId;
    }

    public getBank(): string {
        return this.bank;
    }

    public setBank(bank: string): void {
        this.bank = bank;
    }

    public getWallet(): string {
        return this.wallet;
    }

    public setWallet(wallet: string): void {
        this.wallet = wallet;
    }

    public getVpa(): string {
        return this.vpa;
    }

    public setVpa(vpa: string): void {
        this.vpa = vpa;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getContact(): string {
        return this.contact;
    }

    public setContact(contact: string): void {
        this.contact = contact;
    }

    public getFee(): number {
        return this.fee;
    }

    public setFee(fee: number): void {
        this.fee = fee;
    }

    public getTax(): number {
        return this.tax;
    }

    public setTax(tax: number): void {
        this.tax = tax;
    }

    public getErrorCode(): string {
        return this.errorCode;
    }

    public setErrorCode(errorCode: string): void {
        this.errorCode = errorCode;
    }

    public getErrorDescription(): string {
        return this.errorDescription;
    }

    public setErrorDescription(errorDescription: string): void {
        this.errorDescription = errorDescription;
    }

    public getErrorSource(): string {
        return this.errorSource;
    }

    public setErrorSource(errorSource: string): void {
        this.errorSource = errorSource;
    }

    public getErrorStep(): string {
        return this.errorStep;
    }

    public setErrorStep(errorStep: string): void {
        this.errorStep = errorStep;
    }

    public getErrorReason(): string {
        return this.errorReason;
    }

    public setErrorReason(errorReason: string): void {
        this.errorReason = errorReason;
    }

    public getBankTransaction_id(): string {
        return this.bankTransaction_id;
    }

    public setBankTransaction_id(bankTransaction_id: string): void {
        this.bankTransaction_id = bankTransaction_id;
    }

    public getPaymentCreatedAt(): string {
        return this.paymentCreatedAt;
    }

    public setPaymentCreatedAt(paymentCreatedAt: string): void {
        this.paymentCreatedAt = paymentCreatedAt;
    }

    public setBasePayment(payment: Payment) {
        // this.setAccountId(payment.getAccountId());
        // this.setOrderId(payment.getOrderId());
        // this.set(payment.getOrderId());
        Object.assign(this, payment);
    }






}