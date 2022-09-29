import { IsMongoId } from 'class-validator';
import { BusinessTypeEnum } from 'service-layer/models/ecommerce/BusinessTypeEnum';


export class UserLoginRequestModel {
     countryCode: string;
     countryShortName: string;
     mobileNumber: string;
     otp: string;
}