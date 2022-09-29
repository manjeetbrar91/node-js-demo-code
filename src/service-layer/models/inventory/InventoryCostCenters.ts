import { ServiceObject } from "../ServiceObject";
export enum LocationType {
    Storage = 'Storage',
    CostCenter = 'CostCenter'
}
export class InventoryCostCenterMapping {
    private tables: Array<string>;
    private printTag: string;

    public getTables(): Array<string> {
        return this.tables;
    }

    public setTables(tables: Array<string>): void {
        this.tables = tables;
    }

    public getPrintTag(): string {
        return this.printTag;
    }

    public setPrintTag(printTag: string): void {
        this.printTag = printTag;
    }

}

export class InventoryCostCenters extends ServiceObject {
    private restaurantId: string;
    private locationName: string;
    private locationType: LocationType;
    private costCenterMapping: Array<InventoryCostCenterMapping>;

    public getCostCenterMapping(): Array<InventoryCostCenterMapping> {
        return this.costCenterMapping;
    }

    public setCostCenterMapping(costCenterMapping: Array<InventoryCostCenterMapping>): void {
        this.costCenterMapping = costCenterMapping;
    }


    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getLocationName(): string {
        return this.locationName;
    }

    public setLocationName(locationName: string): void {
        this.locationName = locationName;
    }

    public getLocationType(): LocationType {
        return this.locationType;
    }

    public setLocationType(locationType: LocationType): void {
        this.locationType = locationType;
    }


}