export class ProductTags {
    private name: string;
    private status: string;
    private type: string;
    private restaurantId: string;
    private id: string;

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

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

}