export class OrderAuditLog {
    private id: string;
    private orderId: string;
    private event: string;
    private employeeType: string;
    private employeeName: string;
    private employeeId: string;
    private createdAt: string;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getEvent(): string {
        return this.event;
    }

    public setEvent(event: string): void {
        this.event = event;
    }

    public getEmployeeType(): string {
        return this.employeeType;
    }

    public setEmployeeType(employeeType: string): void {
        this.employeeType = employeeType;
    }

    public getEmployeeName(): string {
        return this.employeeName;
    }

    public setEmployeeName(employeeName: string): void {
        this.employeeName = employeeName;
    }

    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    

}