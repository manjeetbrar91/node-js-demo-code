export class Channel {
    private name: string;
    private status: string;
    private type: string;
    private restaurantId: string;

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getrestaurantId(): string {
        return this.restaurantId;
    }

    public setrestaurantId(restaurantId: string): void {
        this.status = restaurantId;
    }
}