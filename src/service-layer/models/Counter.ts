export class Counter {
    private name: string;
    private sequenceNo: number;

    public getName(): string {
        return this.name;
    }

    public setName(name: string
    ) {
        this.name = name;
    }

    public getSequenceNo(): number {
        return this.sequenceNo;
    }

    public setSequenceNo(sequenceNo: number) {
        this.sequenceNo = sequenceNo;
    }

}