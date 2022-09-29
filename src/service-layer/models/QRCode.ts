import { Table } from "./Table";

export class QRCode {
    private id: string;
    private accountId: string;
    private tableId: string;
    private code: string;
    private status: string;
    private createdAt: Date;
    private updatedAt: Date;
    private table: Table;

    public getTable(): Table {
        return this.table;
    }

    public setTable(table: Table): void {
        this.table = table;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
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

    public getTableId(): string {
        return this.tableId;
    }

    public setTableId(tableId: string): void {
        this.tableId = tableId;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }
}