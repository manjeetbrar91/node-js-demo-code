import { Permission } from "./Permission";
import { ServiceObject } from "./ServiceObject";
import { Role } from "./Role";

export class RolePermissionMapping extends ServiceObject{
    private roleId: string;
    private permissions: Array<Permission>;
    private restaurantChainId: string;
    private restaurantId: string;
    private permissionIds: Array<string>;
    private roles: Role;

    public getRoles(): Role {
        return this.roles;
    }

    public setRoles(roles: Role): void {
        this.roles = roles;
    }

    public getPermissionIds(): Array<string> {
        return this.permissionIds;
    }

    public setPermissionIds(permissionIds: Array<string>): void {
        this.permissionIds = permissionIds;
    }

    public getRoleId(): string {
        return this.roleId;
    }

    public setRoleId(roleId: string): void {
        this.roleId = roleId;
    }

    public getPermissions(): Array<Permission> {
        return this.permissions;
    }

    public setPermissions(permissions: Array<Permission>): void {
        this.permissions = permissions;
    }

    public getRestaurantChainId(): string {
        return this.restaurantChainId;
    }

    public setRestaurantChainId(restaurantChainId: string): void {
        this.restaurantChainId = restaurantChainId;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

}