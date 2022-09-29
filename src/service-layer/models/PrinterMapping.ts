export class PrinterMapping {
    private id: string;
    private printerId: string;
    private tables: Array<string>;
    private tag: string;
    private accountId: string;
    private numberOfCopies: number;
    private paperSize: number;

    public getPaperSize(): number {
        return this.paperSize;
    }

    public setPaperSize(paperSize: number): void {
        this.paperSize = paperSize;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getPrinterId(): string {
        return this.printerId;
    }

    public setPrinterId(printerId: string): void {
        this.printerId = printerId;
    }

    public getTables(): Array<string> {
        return this.tables;
    }

    public setTables(tables: Array<string>): void {
        this.tables = tables;
    }

    public getTag(): string {
        return this.tag;
    }

    public setTag(tag: string): void {
        this.tag = tag;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getNumberOfCopies(): number {
        return this.numberOfCopies;
    }

    public setNumberOfCopies(numberOfCopies: number): void {
        this.numberOfCopies = numberOfCopies;
    }

}