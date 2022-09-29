export class SMSResponse{
    private success: boolean;
    private transactionId: string;
    private message: string;
    private phoneNumbers: Array<string>;
    private data: Array<string>;

    public getData(): Array<string> {
        return this.data;
    }

    public setData(data: Array<string>): void {
        this.data = data;
    }

    public getPhoneNumber(): Array<string> {
        return this.phoneNumbers;
    }

    public setPhoneNumber(phoneNumbers: Array<string>): void {
        this.phoneNumbers = phoneNumbers;
    }

    public isSuccess(): boolean {
        return this.success;
    }

    public setSuccess(success: boolean): void {
        this.success = success;
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public getTransactionId(): string {
        return this.transactionId;
    }

    public setTransactionId(transactionId: string): void {
        this.transactionId = transactionId;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }
}