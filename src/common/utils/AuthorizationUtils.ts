import { UserRole, RolePermissions } from '../../service-layer/models/User';

export class AuthorizationUtils {

    public static getRolesHigherThanOrEqual(role: UserRole): UserRole[] {
        let roles: Array<UserRole> = [];
        switch (role) {
            case UserRole.CustomerContributor:
                roles.push(UserRole.CustomerContributor);
            case UserRole.CustomerAdmin:
                roles.push(UserRole.CustomerAdmin);
            case UserRole.Waiter:
                roles.push(UserRole.Waiter);
            case UserRole.Chef:
                roles.push(UserRole.Chef);
            case UserRole.Cashier:
                roles.push(UserRole.Cashier);
            case UserRole.MenewAdmin:
                roles.push(UserRole.MenewAdmin);
            case UserRole.Manager:
                roles.push(UserRole.Manager);
            case UserRole.Owner:
                roles.push(UserRole.Owner);
            case UserRole.CloudKitchenOwner:{
                roles.push(UserRole.CloudKitchenOwner);
                return roles;
            }
            case UserRole.Unknown:
            default:
                return [UserRole.Unknown];
        }
    }

    public static grantAccess(roles: RolePermissions[]): RolePermissions[] {
        return roles;
    }
}