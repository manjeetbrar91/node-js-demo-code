import { PermissionType } from "./User";
import { ServiceObject } from "./ServiceObject";

export class Permission extends ServiceObject{
    private name: PermissionType;
    private order: number;
    private category: string;
    
    public getName(): PermissionType {
        return this.name;
    }

    public setName(name: PermissionType): void {
        this.name = name;
    }

    public getOrder(): number {
        return this.order;
    }

    public setOrder(order: number): void {
        this.order = order;
    }
   
    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }
}