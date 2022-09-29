
export enum OrderPaymentType {
    COD = "cod",
    ONLINE = "online"
}

export enum OrderCreatedFrom {
    User = "user",
    Business = "business"
}
export enum OrderStatusEnum {
    Created = "Created",
    Placed = "Placed",
    Approved = "Approved", //Approved = "Approved",
    Rejected = "Rejected",
    PaymentRequested = "PaymentRequested",
    Packed = "Packed",
    ReadytoShip = "ReadyToShip",
    Dispatched = "Dispatched",
    OutForDelivery = "OutForDelivery",
    Delivered = "Delivered",
    Picked = "Picked",
    ReadyForPickUp = "ReadyForPickUp",
    Completed = "Completed",
    Cancelled = "Cancelled",
    InProgress = "InProgress",
    ReturnInitiated = "ReturnInitiated",
    ReturnComplete = "ReturnComplete",
    RefundInitiated = "RefundInitiated",
    RefundCompleted = "RefundCompleted",
    Rescheduled = "Rescheduled",
    Unknown = 'unknown'

}