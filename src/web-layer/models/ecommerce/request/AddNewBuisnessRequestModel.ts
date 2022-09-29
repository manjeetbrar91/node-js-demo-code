import { IsMongoId } from 'class-validator';
import { BusinessTypeEnum } from 'service-layer/models/ecommerce/BusinessTypeEnum';


export class AddNewBuisnessRequestModel {
     id: string;
     ownerId: string;
     businessId: string;
     businessName: string;
     businessLegalName: string;
     altNumber: string;

     gstNumber: string;
     businessType: BusinessTypeEnum;
     startTime: string;
     endTime: string;

     countryCode: number;
     phoneNumber: string;
     primaryLanguage: string;
     primaryCurrency: string;

     primaryCurrencySymbol: string;
     addressLine1: string;
     addressLine2: string;
     locality: string;

     state: string;
     city: string;
     country: string;
     countryAbbreviation: string;
    
     zipCode: string;
     latitude: number;
     longitude: number;
}