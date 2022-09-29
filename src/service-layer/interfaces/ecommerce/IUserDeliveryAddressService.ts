import { UserDeliveryAddressModel } from "../../models/ecommerce/response/UserDeliveryAddressModel";
export interface IUserDeliveryAddressService {
    addNewDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel>
    deleteUserDeliveryAddress(userId:string,id: string): Promise<UserDeliveryAddressModel>
    getAllDeliveryAddressOfUser(userId: string): Promise<Array<UserDeliveryAddressModel>>
    getUserDeliveryAddressById(id: string): Promise<UserDeliveryAddressModel>
    updateDeliveryAddress(data: UserDeliveryAddressModel): Promise<UserDeliveryAddressModel>
    makePrimaryAddress(addressId: string,userId:string): Promise<UserDeliveryAddressModel>
}