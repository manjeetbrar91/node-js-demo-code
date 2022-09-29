export class RestaurantAuditLog {
    private id: string;
    private restaurantId: string;
    private event: string;
    private employeeId: string;
    private employeeName: string;
    private createdAt: string;

    public setId(id: string): void {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setEvent(event: string): void {
        this.event = event;
    }

    public getEvent(): string {
        return this.event;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeName(employeeName: string): void {
        this.employeeName = employeeName;
    }

    public getEmployeeName(): string {
        return this.employeeName;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }
}