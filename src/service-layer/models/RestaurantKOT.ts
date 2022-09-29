import { ServiceObject } from './ServiceObject';
import { OrderedDish } from './dashboard/kotmodels/OrderedDish';
import { DeliveryTask } from './delivery/DeliveryTask';

export class RestaurantKOT extends ServiceObject {
    private restaurantId: string;
    private waiterId: string;
    private orderId: string;
    private tableId: string;
    private kotVersion: number;
    private kotNumber: number;
    private orderedDishes: OrderedDish[];
    private kotSequenceNumber: number;
    private instructions: string;
    private promotions: Array<string>;

    // Represents discount for KOT
    private totalDiscount: number;

    // Represents tip collected for KOT
    private collectedTips: number;

    // Sum of all item's/ addOn items  price x Qts (without extra charges etc.)
    private subtotal: number;

    private deliveryDetails: DeliveryTask;
    private foodStatus: string;
    private kotAutoClosed:boolean;
    private preparationTime: Date;
    private isVIP: boolean;
    private dirtyFlag: boolean;
    private additionalInstructions: AdditionalInstructions;

    public getAdditionalInstructions(): AdditionalInstructions {
        return this.additionalInstructions;
    }

    public setAdditionalInstructions(additionalInstructions: AdditionalInstructions): void {
        this.additionalInstructions = additionalInstructions;
    }

    public isDirtyFlag(): boolean {
        return this.dirtyFlag;
    }

    public setDirtyFlag(dirtyFlag: boolean): void {
        this.dirtyFlag = dirtyFlag;
    }

    public isIsVIP(): boolean {
        return this.isVIP;
    }

    public setIsVIP(isVIP: boolean): void {
        this.isVIP = isVIP;
    }

    public getPreparationTime(): any {
        return this.preparationTime;
    }

    public setPreparationTime(preparationTime: any): void {
        this.preparationTime = preparationTime;
    }

    public getFoodStatus(): string {
        return this.foodStatus;
    }

    public setFoodStatus(foodStatus: string): void {
        this.foodStatus = foodStatus;
    }
    public getkotAutoClosed(): boolean {
        return this.kotAutoClosed;
    }

    public setKotAutoClosed(kotAutoClosed: boolean): void {
        this.kotAutoClosed = kotAutoClosed;
    }

    public getDeliveryDetails(): DeliveryTask {
        return this.deliveryDetails;
    }

    public setDeliveryDetails(deliveryDetails: DeliveryTask): void {
        this.deliveryDetails = deliveryDetails;
    }

    public getCollectedTips(): number {
        return this.collectedTips;
    }

    public setCollectedTips(collectedTips: number): void {
        this.collectedTips = collectedTips;
    }

    public getTotalDiscount(): number {
        return this.totalDiscount;
    }

    public setTotalDiscount(totalDiscount: number): void {
        this.totalDiscount = totalDiscount;
    }
    public getPromotions(): Array<string> {
        return this.promotions;
    }

    public setPromotions(promotions: Array<string>): void {
        this.promotions = promotions;
    }

    public getInstructions(): string {
        return this.instructions;
    }

    public setInstructions(instructions: string): void {
        this.instructions = instructions;
    }

    public getOrderedDishes(): OrderedDish[] {
        return this.orderedDishes;
    }

    public setOrderedDishes(orderedDishes: OrderedDish[]): void {
        this.orderedDishes = orderedDishes;
    }

    public getKotSequenceNumber(): number {
        return this.kotSequenceNumber;
    }

    public setKotSequenceNumber(kotSequenceNumber: number): void {
        this.kotSequenceNumber = kotSequenceNumber;
    }

    public getSubTotal(): number {
        return this.subtotal;
    }

    public setSubTotal(subtotal: number): void {
        this.subtotal = subtotal;
    }

    public getKotNumber(): number {
        return this.kotNumber;
    }

    public setKotNumber(kotNumber: number): void {
        this.kotNumber = kotNumber;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setWaiterId(waiterId: string): void {
        this.waiterId = waiterId;
    }
    public getWaiterId(): string {
        return this.waiterId;
    }
    public setKOtVersion(kotVersion: number): void {
        this.kotVersion = kotVersion;
    }
    public getKOTVersion(): number {
        return this.kotVersion;
    }
    public setTableId(tableId: string): void {
        this.tableId = tableId;
    }
    public getTableId(): string {
        return this.tableId;
    }
}

export class AdditionalInstructions {
    private getAllItemsTogether: boolean;

    public isGetAllItemsTogether(): boolean {
        return this.getAllItemsTogether;
    }

    public setGetAllItemsTogether(getAllItemsTogether: boolean): void {
        this.getAllItemsTogether = getAllItemsTogether;
    }
}