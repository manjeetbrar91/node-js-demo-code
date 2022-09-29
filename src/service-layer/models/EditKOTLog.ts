export class EditKOTLog {
    private id: string;
    private orderId: string;
    private kotId: string;
    private tableNumber: string;
    private billNumber: number;
    private employeeId: string;
    private restaurantId: string;
    private employeeName: string;
    private reason: string;
    private createdAt: string;
    private itemName: string;
    private previousQuantity: number;
    private updatedQuantity: number;
    private kotNumber: number;

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public getKotNumber(): number {
        return this.kotNumber;
    }

    public setKotNumber(kotNumber: number): void {
        this.kotNumber = kotNumber;
    }

    public getQuantityUpdated(): number {
        return this.updatedQuantity;
    }

    public setQuantityUpdated(updatedQuantity: number): void {
        this.updatedQuantity = updatedQuantity;
    }

    public getPreviousQuantity(): number {
        return this.previousQuantity;
    }

    public setPreviousQuantity(previousQuantity: number): void {
        this.previousQuantity = previousQuantity;
    }

    public getReason(): string {
        return this.reason;
    }

    public setReason(reason: string): void {
        this.reason = reason;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getKOTId(): string {
        return this.kotId;
    }

    public setKOTId(kotId: string): void {
        this.kotId = kotId;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    public getOrderId(): string {
        return this.orderId;
    }

    public setTableNumber(tableNumber: string): void {
        this.tableNumber = tableNumber;
    }

    public getTableNumber(): string {
        return this.tableNumber;
    }

    public setBillNumber(billNumber: number): void {
        this.billNumber = billNumber;
    }

    public getBillNumber(): number {
        return this.billNumber;
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