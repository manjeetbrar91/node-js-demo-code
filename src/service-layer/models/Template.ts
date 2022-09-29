import { ServiceObject } from "./ServiceObject";

export class Template extends ServiceObject {
    private type: TemplateType;
    private data: string;
    private description: string;
    private restaurantId: string;
    private templateId: string;

    public getTemplateId(): string {
        return this.templateId;
    }
    
    public setTemplateId(templateId: string): void {
        this.templateId = templateId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getType(): TemplateType {
        return this.type;
    }

    public setType(type: TemplateType): void {
        this.type = type;
    }

    public getData(): string {
        return this.data;
    }

    public setData(data: string): void {
        this.data = data;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
}

export enum TemplateType {
    BillHtml = "billhtml",
    SplitBillHtml = "splitbillhtml",
    OnlineBillHtml = "onlinebillhtml",
    kotHtml = "kothtml",
    masterKotHtml = "masterkothtml",
    TheatreKotHtml = "theatrekothtml",
    TakeawayBillHtml = "takeawaybillhtml",
    HomeDeliveryBillHtml = "homedeliverybillhtml",
    TheatreBillHtml = "theatrebillhtml",
    TakeawayKotHtml = "takeawaykothtml",
    HomeDeliveryKotHtml = "homedeliverykothtml",
    OnlineKotHtml = "onlinekothtml",
    ReportsHtml = "reportshtml",
    DailySummaryHtml = "dailySummaryhtml",
    TaxSummaryHtml = "taxSummaryhtml",
    ItemReportHtml = "itemReportshtml",
    WaitersReportHtml = "waiterReportshtml",
    TableReportHtml = "tableReportshtml",
    ReportsSessionHtml = "reportsSessionhtml",
    IHFReportsHtml = "ihfReportshtml"
}