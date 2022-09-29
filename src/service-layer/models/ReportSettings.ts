
export class ReportSettings {
    // general settings for restaurant
    private itemsToTrack: Array<string>;

    public getItemsToTrack(): Array<string> {
        return this.itemsToTrack;
    }

    public setItemsToTrack(itemsToTrack: Array<string>): void {
        this.itemsToTrack = itemsToTrack;
    }


}
