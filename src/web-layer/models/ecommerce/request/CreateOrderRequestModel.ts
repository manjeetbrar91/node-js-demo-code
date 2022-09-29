export interface CreateOrderRequestModel {
    id: string;
    currency: string;
    userId: string;
    businessId: string;
    products: Product[];
    orderType: string;
    addressId: string;
    vehicleNo: string;
    mobileNo: string;
    pickUpDate: string;
    pickUpTime: string;
    fromBusiness: boolean;
    employeeId: string;
    employeeName: string;
    couponCode:string
}

export interface Product {
    productId: string;
    quantity: number;
    variantId: string;
}