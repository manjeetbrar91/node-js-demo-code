import { BusinessUserModel } from "../../models/fuel/BusinessUserModel";

export interface IBusinessUsersService {
  register(promotion: BusinessUserModel): Promise<BusinessUserModel>;
  getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel>
}