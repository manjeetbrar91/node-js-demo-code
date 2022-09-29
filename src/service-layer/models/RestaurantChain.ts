import { Tenant } from "./Tenant";
import { AccountType } from './AccountInfo';

export class RestaurantChain extends Tenant {
    private cuisines: Array<string>;

    public getCuisines(): Array<string> {
        return this.cuisines;
    }

    public setCuisines(cuisines: Array<string>): void {
        this.cuisines = cuisines;
    }

    public getTenantType(): AccountType {
        return AccountType.RestaurantChain;
    }

}