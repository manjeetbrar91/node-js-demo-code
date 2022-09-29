export class RestaurantExtraCharge {
    private name: string;
    private isFixed: boolean;
    private value: number;

    /**
     *
     */
    constructor(name?: string, value?: number) {
        this.name = name;
        this.value = value;
        this.isFixed = false;        
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public isIsFixed(): boolean {
        return this.isFixed;
    }

    public setIsFixed(isFixed: boolean): void {
        this.isFixed = isFixed;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

}