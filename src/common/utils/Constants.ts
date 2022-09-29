 

export class Constants {
    public static readonly RESULT_CODE_OK = "OK";
    public static readonly RESULT_CODE_FAILED = "FAIL";


    public static readonly ROUTER_PREFIX = "api";
    public static readonly ERROR_DUPLICATE_BILL_NUMBER = "duplicateBillMumber";
    public static readonly RECOMMENDATION_SERVICE_BAYSIAN_BANDIT = "BaysianBandit";
    public static readonly RECOMMENDATION_SERVICE_RANDOM = "Random";
    public static readonly ONLINE_TABLE: string = 'counter';
    public static readonly DELIVERY_BILL_COUNTER: string = 'DeliveryBillCounter';

    public static readonly RECOMMENDATION_SERVICE_FAMILY = "Family";

    public static readonly RECOMMENDED_ITEM_RESULT_SUCCESS = "success";
    public static readonly RECOMMENDED_ITEM_RESULT_FAILURE = "failure";

    public static readonly RECOMMENDATION_TYPE_ITEMS_FOR_ITEMS = "ItemsForItem";

    public static readonly IMPLEMENTATION_NOT_FOUND_ERROR = "Implementation Not Found"

    public static readonly FROM_USER: string = 'fromUserSelection';
    public static readonly FROM_RECOMMENDATION: string = 'fromRecommendation';
    public static readonly GENERAL_MESSAGE: string = "The order has been accepted by the restaurant";
    public static readonly PAYMENT_METHODS = ['Cash', 'Card', 'Google Pay', 'PayTM', 'PhonePe', 'Payment Method', 'Other'];

    public static readonly SUBSCRIPTION_PAYLOAD_OPTIONS = {
        vapidDetails: {
            subject: 'mailto:kritika.thakur81@gmail.com',
            publicKey: 'BH_vrj30t71OnDht3pW5ZMyMc8bDt-Fy7gphWR2M7nIbqVBekyc0VY0M2XYqw5i5OcEd2yiSpWszI8eUw4b-fPk',
            privateKey: 'Q6jj4lx0DHTSw3djVafypbXxvYOCa0PH4MtEjS1wDyo'
        },
        TTL: 60,
        gcmAPIKey: 'AIzaSyAk1VfNd9ZEW3uXOpSSMHWqHIjhX-IQ9z4',
    }
}



export class MainDiscountTypes {
    public static readonly customDiscount: string = "Discount";
    public static readonly promotion: string = "COUPON";
    public static readonly swiggy: string = "Swiggy";
    public static readonly zomato: string = "Zomato";
    public static readonly automaticPromotion: string = "AUTOMATIC";

}
export class DiscountTypes {
    public static readonly categoryWise: string = "category";
    public static readonly itemWise: string = "item";
    public static readonly printerTag: string = "printerTag";
    public static readonly wholeBill: string = "all";
}
export class Messages {
    public static readonly GuestPhoneNumber: number = 9999999999;
    public static readonly GuestName: string = 'Guest';
    public static readonly UNAUTHORIZED = "Incorrect Username/password. Please try again.";
    public static readonly INVALID_USER = "User does not exist please do sign up!";
    public static readonly SENT_OTP = " is the OTP for your Menew account valid for next 1 min. PLS DO NOT SHARE IT WITH ANYONE. -Pwrd by example.com";
}