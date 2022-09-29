export class DeliveryCharge {
    private maximumDistance: number;
    private minumumDistance: number;
    private amount: number;
 
    public getAmount(): number {
        return this.amount;
    }
 
    public setAmount(value: number) {
        this.amount = value;
    }
 
    public getMinumumDistance(): number {
        return this.minumumDistance;
    }
 
    public setMinumumDistance(value: number) {
        this.minumumDistance = value;
    }    
    
    public getMaximumDistance(): number {
        return this.maximumDistance;
    }
 
    public setMaximumDistance(value: number) {
        this.maximumDistance = value;
    }
}