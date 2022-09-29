// TODO remove later
export class Filter {
    private id: string;
    private field: string;
    private displayField: string;
    private accountId: string;
    private values: string;
    private status: string;
    private accountType: string;

    public getAccountType(): string {
        return this.accountType;
    }

    public setAccountType(accountType: string): void {
        this.accountType = accountType;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getField(): string {
        return this.field;
    }

    public setField(field: string): void {
        this.field = field;
    }

    public getDisplayField(): string {
        return this.displayField;
    }

    public setDisplayField(displayField: string): void {
        this.displayField = displayField;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getValues(): string {
        return this.values;
    }

    public setValues(values: string): void {
        this.values = values;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

}