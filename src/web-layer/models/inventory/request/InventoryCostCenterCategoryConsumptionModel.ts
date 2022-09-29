import { ServiceObject } from '../../../../service-layer/models/ServiceObject';

export class InventoryCostCenterCategoryConsumptionModel extends ServiceObject {

    private  items: Array<InventoryCostCenterConsumptionItem>
    private totalPrice: number
    private totalQty: number
    private categoryName: string
    private categoryId: string

    public getCategoryName(): string {
        return this.categoryName;
    }

    public setCategoryName(categoryName: string): void {
        this.categoryName = categoryName;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }


    public getItems(): Array<InventoryCostCenterConsumptionItem> {
        return this.items;
    }

    public setItems(items: Array<InventoryCostCenterConsumptionItem>): void {
        this.items = items;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    public getTotalQty(): number {
        return this.totalQty;
    }

    public setTotalQty(totalQty: number): void {
        this.totalQty = totalQty;
    }

}
export class InventoryCostCenterConsumptionItem {
    private itemId: string;
    private itemName: string;
    private itemQty: number
    private itemCost: number
    private itemQtyUnit: string

    public getItemQtyUnit(): string {
        return this.itemQtyUnit;
    }

    public setItemQtyUnit(itemQtyUnit: string): void {
        this.itemQtyUnit = itemQtyUnit;
    }


    public getItemId(): string {
        return this.itemId;
    }

    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }

    public getItemName(): string {
        return this.itemName;
    }

    public setItemName(itemName: string): void {
        this.itemName = itemName;
    }

    public getItemQty(): number {
        return this.itemQty;
    }

    public setItemQty(itemQty: number): void {
        this.itemQty = itemQty;
    }

    public getItemCost(): number {
        return this.itemCost;
    }

    public setItemCost(itemCost: number): void {
        this.itemCost = itemCost;
    }

}