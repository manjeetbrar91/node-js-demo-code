import { ServiceObject } from "./ServiceObject";

export enum PrinterTags {
    Unknown = "unknown",
    Alcohol = "alcohol",
    Food = "food",
    Drinks = "drinks",
    Bill = "bill",
    Chat = "chat"
}

export class GooglePrinterInfo {
    private id: string;
    private name: string;
    private description: string;
    private type: string;
    private status: string;
    private location: string;

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
    
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

}

export class PrinterInfo extends ServiceObject {
    private printerName: string;
    private accountId: string;
    private tags: Array<PrinterTags>;
    private tables: Array<string>;
    private lengthOfPrinter: number;
    private googlePrinterInfo:GooglePrinterInfo;
    private numberOfCopies: number;

    public getNumberOfCopies(): number {
        return this.numberOfCopies;
    }

    public setNumberOfCopies(numberOfCopies: number): void {
        this.numberOfCopies = numberOfCopies;
    }

    public getGooglePrinterInfo(): GooglePrinterInfo {
        return this.googlePrinterInfo;
    }

    public setGooglePrinterInfo(googlePrinterInfo: GooglePrinterInfo): void {
        this.googlePrinterInfo = googlePrinterInfo;
    }

    public getLengthOfPrinter(): number {
        return this.lengthOfPrinter;
    }

    public setLengthOfPrinter(lengthOfPrinter: number): void {
        this.lengthOfPrinter = lengthOfPrinter;
    }

    public getPrinterName(): string {
        return this.printerName;
    }

    public setPrinterName(printerName: string): void {
        this.printerName = printerName;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getTags(): Array<PrinterTags> {
        return this.tags;
    }

    public setTags(tag: Array<PrinterTags>): void {
        this.tags = tag;
    }

    public getTables(): Array<string> {
        return this.tables;
    }

    public setTables(tables: Array<string>): void {
        this.tables = tables;
    }
}