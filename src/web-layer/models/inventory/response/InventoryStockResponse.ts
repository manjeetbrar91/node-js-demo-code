import { ItemVariant } from "../../../../service-layer/models/inventory/ItemVariant";

export class InventoryStockResponse {
    private restaurant: string;
    private data: Array<ItemVariant>;
    private totalNumberOfItems: number;
    private totalValue: number;
    private page: number;
    private limit: number;
    private totalPages: number;
    private currentPageItemCount: number;

    public getTotalPages(): number {
        return this.totalPages;
    }

    public setTotalPages(totalPages: number): void {
        this.totalPages = totalPages;
    }

    public getCurrentPageItemCount(): number {
        return this.currentPageItemCount;
    }

    public setCurrentPageItemCount(currentPageItemCount: number): void {
        this.currentPageItemCount = currentPageItemCount;
    }

    public getRestaurant(): string {
        return this.restaurant;
    }

    public setRestaurant(restaurant: string): void {
        this.restaurant = restaurant;
    }

    public getData(): Array<ItemVariant> {
        return this.data;
    }

    public setData(data: Array<ItemVariant>): void {
        this.data = data;
    }

    public getTotalNumberOfItems(): number {
        return this.totalNumberOfItems;
    }

    public setTotalNumberOfItems(totalNumberOfItems: number): void {
        this.totalNumberOfItems = totalNumberOfItems;
    }

    public getTotalValue(): number {
        return this.totalValue;
    }

    public setTotalValue(totalValue: number): void {
        this.totalValue = totalValue;
    }

    public getPage(): number {
        return this.page;
    }

    public setPage(page: number): void {
        this.page = page;
    }

    public getLimit(): number {
        return this.limit;
    }

    public setLimit(limit: number): void {
        this.limit = limit;
    }

}
// export class ItemResponse {
//     private name: string;
//     private category: string;
//     private quantity: number;
//     private rate: number;
//     private value: number;
//     private qtyUnit: string;
//     private item: Item;
//     private unitDetails: InventoryMeasurementUnitConverstions;

//     public getUnitDetails(): InventoryMeasurementUnitConverstions {
//         return this.unitDetails;
//     }

//     public setUnitDetails(unitDetails: InventoryMeasurementUnitConverstions): void {
//         this.unitDetails = unitDetails;
//     }

//     public getItem(): Item {
//         return this.item;
//     }

//     public setItem(item: Item): void {
//         this.item = item;
//     }

//     public getQtyUnit(): string {
//         return this.qtyUnit;
//     }

//     public setQtyUnit(qtyUnit: string): void {
//         this.qtyUnit = qtyUnit;
//     }

//     public getName(): string {
//         return this.name;
//     }

//     public setName(name: string): void {
//         this.name = name;
//     }

//     public getCategory(): string {
//         return this.category;
//     }

//     public setCategory(category: string): void {
//         this.category = category;
//     }

//     public getQuantity(): number {
//         return this.quantity;
//     }

//     public setQuantity(quantity: number): void {
//         this.quantity = quantity;
//     }

//     public getRate(): number {
//         return this.rate;
//     }

//     public setRate(rate: number): void {
//         this.rate = rate;
//     }

//     public getValue(): number {
//         return this.value;
//     }

//     public setValue(value: number): void {
//         this.value = value;
//     }

// }