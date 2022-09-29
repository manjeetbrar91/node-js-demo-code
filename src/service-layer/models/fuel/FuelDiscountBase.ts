export abstract class FuelDiscountBase {

    // protected itemService: IMenuItemServiceV2;

    constructor() {
        // this.itemService = ServiceFactory.getMenuItemServiceV2();
    }

    abstract CheckEligibility();
}