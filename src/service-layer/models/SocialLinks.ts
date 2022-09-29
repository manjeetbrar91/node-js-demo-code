export class SocialLinks {
    // socialLinks  for restaurant
    private fbLink: string;
    private instagramLink: string;

    public getFbLink(): string {
        return this.fbLink;
    }

    public setFbLink(fbLink: string): void {
        this.fbLink = fbLink;
    }

    public getInstagramLink(): string {
        return this.instagramLink;
    }

    public setInstagramLink(instagramLink: string): void {
        this.instagramLink = instagramLink;
    }
}