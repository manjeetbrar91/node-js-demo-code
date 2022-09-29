export class OrderUpSell {
    private totalRevenue: number;

    public getTotalRevenue(): number {
        return this.totalRevenue;
    }

    public setTotalRevenue(totalRevenue: number): void {
        this.totalRevenue = totalRevenue;
    }
}