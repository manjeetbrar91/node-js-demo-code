import { ServiceObject } from "./ServiceObject";

export class Role extends ServiceObject{
    private name: string;
    private order: number;
    private isCustomRole: boolean;
    private restaurantId: string;

    public isIsCustomRole(): boolean {
        return this.isCustomRole;
    }

    public setIsCustomRole(isCustomRole: boolean): void {
        this.isCustomRole = isCustomRole;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }



    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getOrder(): number {
        return this.order;
    }

    public setOrder(order: number): void {
        this.order = order;
    }
}