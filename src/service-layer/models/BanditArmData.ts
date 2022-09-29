// TODO remove later
export class BanditArmData {

    private id: string;
    private banditName: string;
    private armName: string;
    private trials: number;
    private rewards: number;
    //failures can be derived by trials-rewards

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getBanditName(): string {
        return this.banditName;
    }

    public setBanditName(banditName: string): void {
        this.banditName = banditName;
    }

    public getArmName(): string {
        return this.armName;
    }

    public setArmName(armName: string): void {
        this.armName = armName;
    }

    public getTrials(): number {
        return this.trials;
    }

    public setTrials(trials: number): void {
        this.trials = trials;
    }

    public getRewards(): number {
        return this.rewards;
    }

    public setRewards(rewards: number): void {
        this.rewards = rewards;
    }
}