import { ServiceObject } from "./ServiceObject";
import { Restaurant } from "./Restaurant";

export class Host extends ServiceObject {
    private hostName: string;
    private restaurantId: string;
    private chainId: string;

    public getHostName(): string {
        return this.hostName;
    }

    public setHostName(hostName: string): void {
        this.hostName = hostName;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getChainId(): string {
        return this.chainId;
    }

    public setChainId(chainId: string): void {
        this.chainId = chainId;
    }
}

export class HostResponse extends Host {
    private restaurant: Restaurant;
    private code: string;

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getRestaurant(): Restaurant {
        return this.restaurant;
    }

    public setRestaurant(restaurant: Restaurant): void {
        this.restaurant = restaurant;
    }
}