import { ServiceObject } from './ServiceObject';

export class CustomerGroup extends ServiceObject{
    private restaurantId: string;
    private name: string;
    private conditionLogic: string;

    private groupConditions: Array<object>;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getGroupConditions(): Array<object> {
        return this.groupConditions;
    }

    public setGroupConditions(groupConditions: Array<object>): void {
        this.groupConditions = groupConditions;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getConditionLogic(): string {
        return this.conditionLogic;
    }
    
    public setConditionLogic(value: string) {
        this.conditionLogic = value;
    }
}