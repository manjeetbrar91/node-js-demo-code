import { ServiceObject } from './ServiceObject';
export class TableSection extends ServiceObject {
    private name: string;
    private restaurantId: string;
    private order: number;
    private sectionCharges: number;
    private sectionChargesInPercentage: boolean;

    public setSectionChargesInPercentage(sectionChargesInPercentage: boolean): void {
        this.sectionChargesInPercentage = sectionChargesInPercentage;
    }


    public isSectionChargesInPercentage(): boolean {
        
        return this.sectionChargesInPercentage != undefined ? this.sectionChargesInPercentage : false;
    }

    




    public getSectionCharges(): number {
        return this.sectionCharges != undefined ? this.sectionCharges : 0;
    }

    public setSectionCharges(sectionCharges: number): void {
        this.sectionCharges = sectionCharges;
    }


    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public getOrder(): number {
        return this.order;
    }

    public setOrder(order: number) {
        this.order = order;
    }
}