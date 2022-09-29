
import { BusinessUserModel } from "../../../service-layer/models/fuel/BusinessUserModel";


export interface IBusinessUsersDBManager {
    register(promotion: BusinessUserModel): Promise<BusinessUserModel>;  
    getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel> 
}