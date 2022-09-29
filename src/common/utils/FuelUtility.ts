import { FuelEligibilityType, FuelFixedAmountDiscount, FuelMinMaxRequirementType } from "../../service-layer/models/fuel/FuelFixedAmountDiscount";
import { DishEligibility, DishEligibilityType } from "../../service-layer/models/ecommerce/discount/DishEligibility";
import { FuelDiscountBase } from "../../service-layer/models/fuel/FuelDiscountBase";
import { FuelDiscountCouponModel, FuelDiscountType } from "../../service-layer/models/fuel/FuelDiscountCouponModel";
import { Utils } from "./Utils";
import { BusinessUserAccountStatus, BusinessUserModel, BusinessUserTypes } from "../../service-layer/models/fuel/BusinessUserModel";
import { Utility } from "./Utility";

export class FuelUtility {





  public static getFuelDiscountCoupon(data): FuelDiscountCouponModel {
    let promotion: FuelDiscountCouponModel = new FuelDiscountCouponModel();
    promotion.setId(data.id ? data.id : data._id);
    promotion.setName(data.name);
    promotion.setStatus(data.status);
    promotion.setCreatedAt(data.createdAt);
    promotion.setLastModifiedAt(data.updatedAt);
    promotion.setEnable(data.enable);
    promotion.setStartDate(data.startDate);
    promotion.setEndDate(data.endDate);
    promotion.setFuelStationId(data.fuelStationId);
    promotion.setCreatedBy(data.createdBy);
    promotion.setDontShowToCustomer(data.dontShowToCustomer);


    let discountType: FuelDiscountType = Utils.parseDefaultEnum(data.discountType, FuelDiscountType, FuelDiscountType.Unknown);
    promotion.setDiscountType(discountType);
    promotion.setDiscountMetadata(FuelUtility.getDiscountMetaData(data.discountMetadata, discountType));
    promotion.setFuelTypes(data.fuelTypes ? data.fuelTypes : []);
    promotion.setUsageLimit(data.usageLimit);
    promotion.setPerCustomerUsage(data.perCustomerUsage);
    promotion.setLimitTotalUsage(data.limitTotalUsage);
    promotion.setActualUsage(data.actualUsage);
    promotion.setUnusableCount(data.unusableCount);
    // if (promotion.getPromotionType() === PromotionType.automatic && (data.scheduleDays && data.scheduleDays.length > 0)) {
    // promotion.setScheduleDays(Utility.getListOfItems(data.scheduleDays, Utility.getSchedule));
    // }
    promotion.setSummaryCardList(data.summaryCardList);
    return promotion;
  }
  public static getDiscountMetaData(data, discountType): FuelDiscountBase {
    let discountBase = null;
    if (discountType == FuelDiscountType.FixedAmount || discountType == FuelDiscountType.Percentage) {
      discountBase = new FuelFixedAmountDiscount();
      const fixedAmount = FuelUtility.setBasicFixedDiscountBaseProperties(data);
      discountBase.setValue(fixedAmount.getValue());
      discountBase.setEligibilityType(fixedAmount.getEligibilityType());
      discountBase.setMinRequirement(fixedAmount.getMinRequirement());
      discountBase.setMinimumRequirementType(fixedAmount.getMinimumRequirementType());

      discountBase.setMaxRequirementType(fixedAmount.getMaxRequirementType());
      discountBase.setMaxRequirement(fixedAmount.getMaxRequirement());
    }
    return discountBase;
  }
  public static setBasicFixedDiscountBaseProperties(data): FuelFixedAmountDiscount {
    let fixedAmountDiscount: FuelFixedAmountDiscount = new FuelFixedAmountDiscount();
    if (isNaN(parseFloat(data.value)) == false) {
      data.value = parseFloat(data.value);
    }
    fixedAmountDiscount.setValue(data.value);
    // eligibilityType

    fixedAmountDiscount.setEligibilityType(Utils.parseDefaultEnum(data.eligibilityType, FuelEligibilityType, FuelEligibilityType.order));
    let reqType = Utils.parseDefaultEnum(data.minimumRequirementType, FuelMinMaxRequirementType, FuelMinMaxRequirementType.none);
    if (reqType !== FuelMinMaxRequirementType.none) {

      if (isNaN(parseFloat(data.minRequirement)) == false) {
        data.minRequirement = parseFloat(data.minRequirement);
      }
      fixedAmountDiscount.setMinRequirement(data.minRequirement);
    }
    fixedAmountDiscount.setMinimumRequirementType(reqType);



    let reqMaxType = Utils.parseDefaultEnum(data.maxRequirementType, FuelMinMaxRequirementType, FuelMinMaxRequirementType.none);
    if (reqMaxType !== FuelMinMaxRequirementType.none) {

      if (isNaN(parseFloat(data.maxRequirement)) == false) {
        data.maxRequirement = parseFloat(data.maxRequirement);
      }
      fixedAmountDiscount.setMaxRequirement(data.maxRequirement);
    }
    fixedAmountDiscount.setMaxRequirementType(reqMaxType);


    return fixedAmountDiscount;
  }


  public static getDishEligibility(data): DishEligibility {
    let dishEligibility: DishEligibility = new DishEligibility();
    let type = Utils.parseDefaultEnum(data.eligibilityType, DishEligibilityType, DishEligibilityType.order);
    dishEligibility.setEligilibityType(type);
    if (type === DishEligibilityType.item) {
      dishEligibility.setProductIds(data.productIds);
    } else if (type === DishEligibilityType.category) {
      dishEligibility.setCategoryIds(data.categoryIds);
    }
    return dishEligibility;
  }


  public static getBusinessUserModel(data): BusinessUserModel {
    let model: BusinessUserModel = new BusinessUserModel();
    // model.setMobileNumber(data. ? : "")
    model.setProfileCompleted(data.profileCompleted ? data.profileCompleted : false)
    model.setPinUpdated(data.pinUpdated ? data.pinUpdated : false)
    model.setMobileVerified(data.mobileVerified ? data.mobileVerified : false)
    // model.set(data. ? data. : false)
    model.setCountryCode(data.countryCode ? data.countryCode : "")
    model.setMobileNumber(data.mobileNumber ? data.mobileNumber : "")
    model.setPin(data.pin ? data.pin : "")
    model.setCountryShortName(data.countryShortName ? data.countryShortName : "")
    model.setLastName(data.lastName ? data.lastName : "")
    model.setFirstName(data.firstName ? data.firstName : "")
    model.setEmail(data.email ? data.email : "")
    model.setUserType(data.userType ? data.userType : BusinessUserTypes.Owner)
    model.setCountry(data.country ? data.country : "")
    model.setLanguage(data.language ? data.language : "")
    model.setPincode(data.pincode ? data.pincode : "")
    model.setImage(data.image ? data.image : "")
    model.setAltMobileNumber(data.altMobileNumber ? data.altMobileNumber : "")
    model.setDob(data.dob ? data.dob : "")
    // model.setStatus(data.status ? data.status : BusinessUserAccountStatus.pending)
    model.setAccountStatus(data.accountStatus ? data.accountStatus : BusinessUserAccountStatus.pending)
    model.setLatitude(data.latitude ? data.latitude : 0)
    model.setLongitude(data.longitude ? data.longitude : 0)
    Utility.setServiceObjectProperties(model, data)

    return model;
  }
}
