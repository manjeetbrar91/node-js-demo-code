import { ServiceObject } from "../ServiceObject";
export enum LocationType {
    Storage = 'Storage',
    CostCenter = 'CostCenter'
}


export class InventoryLocations extends ServiceObject {
    private restaurantId: string;
    private locationName: string;
    private locationType: LocationType;
    

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