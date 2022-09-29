import { User } from '../models/User';
import { AccountInfo } from '../models/AccountInfo';
import { Employee } from '../models/Employee';
import { UserSession } from '../models/UserSession';
import { CustomerSession } from '../models/CustomerSession';
import { Customer } from '../models/Customer';

export interface IAuthService {
    createCustomerSession(accountInfo: AccountInfo, user: User, orderId: string): Promise<CustomerSession>;
    createSession(accountInfo: AccountInfo, user: User): Promise<UserSession>;

    getCustomerSessionFromCode(code: string): Promise<[CustomerSession, Customer]>;
    getSessionFromRefreshToken(refreshToken: string): Promise<[UserSession, Employee]>;
    updateUserSession(session: UserSession): Promise<UserSession>;
    getMenewAdminUser(): Employee;
    getUser(jwtToken: string): Promise<User>;
}