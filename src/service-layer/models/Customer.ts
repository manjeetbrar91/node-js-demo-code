import { User, UserRole, UserType } from './User';

export class Customer extends User {

    constructor() {
        super(UserType.Customer);
        this.addRole(UserRole.CustomerAdmin);
    }
}