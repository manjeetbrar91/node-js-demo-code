import { RestaurantExtraCharge } from '../RestaurantExtraCharge';

export class OrderExtraCharge extends RestaurantExtraCharge {
    private amount: number;
    private taxableAmount: number;
    private aggregatorPaid: boolean;

    /**
     *
     */
    constructor(name: string, value: number, amount?: number, taxableAmount?: number) {
        super(name, value);
        this.amount = amount;
        this.taxableAmount = taxableAmount;
        this.aggregatorPaid = false;
    }

    public isAggregatorPaid(): boolean {
        return this.aggregatorPaid;
    }

    public setAggregatorPaid(aggregatorPaid: boolean): void {
        this.aggregatorPaid = aggregatorPaid;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

    public getTaxableAmount(): number {
        return this.taxableAmount;
    }

    public setTaxableAmount(taxableAmount: number): void {
        this.taxableAmount = taxableAmount;
    }

}