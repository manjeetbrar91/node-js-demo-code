export class RestaurantTheme {
    private accountId: string;
    private logo: string;
    private backgroundImage: string;
    private backgroundColor: string;
    private buttonColor: string;
    private textColor: string;
    private greetingTextColor: string;
    private welcomeTextColor: string;
    private greetingMessage: string;
    private welcomeMessage: string;
    private promoImages: Array<string>;
    private likesThreshold: number;
    private recommendationEnable: boolean;

    public isRecommendationEnable(): boolean {
        return this.recommendationEnable;
    }

    public setRecommendationEnable(recommendationEnable: boolean): void {
        this.recommendationEnable = recommendationEnable;
    }

    public getPromoImages(): Array<string> {
        return this.promoImages;
    }

    public setPromoImages(promoImages: Array<string>): void {
        this.promoImages = promoImages;
    }

    public getAccountId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getLogo(): string {
        return this.logo;
    }

    public setLogo(logo: string): void {
        this.logo = logo;
    }

    public getBackgroundImage(): string {
        return this.backgroundImage;
    }

    public setBackgroundImage(backgroundImage: string): void {
        this.backgroundImage = backgroundImage;
    }

    public getBackgroundColor(): string {
        return this.backgroundColor;
    }

    public setBackgroundColor(backgroundColor: string): void {
        this.backgroundColor = backgroundColor;
    }

    public getButtonColor(): string {
        return this.buttonColor;
    }

    public setButtonColor(buttonColor: string): void {
        this.buttonColor = buttonColor;
    }

    public getTextColor(): string {
        return this.textColor;
    }

    public setTextColor(textColor: string): void {
        this.textColor = textColor;
    }

    public getGreetingTextColor(): string {
        return this.greetingTextColor;
    }

    public setGreetingTextColor(greetingTextColor: string): void {
        this.greetingTextColor = greetingTextColor;
    }

    public getWelcomeTextColor(): string {
        return this.welcomeTextColor;
    }

    public setWelcomeTextColor(welcomeTextColor: string): void {
        this.welcomeTextColor = welcomeTextColor;
    }

    public getGreetingMessage(): string {
        return this.greetingMessage;
    }

    public setGreetingMessage(greetingMessage: string): void {
        this.greetingMessage = greetingMessage;
    }

    public getWelcomeMessage(): string {
        return this.welcomeMessage;
    }

    public setWelcomeMessage(welcomeMessage: string): void {
        this.welcomeMessage = welcomeMessage;
    }

    public getLikesThreshold(): number {
        return this.likesThreshold;
    }

    public setLikesThreshold(likesThreshold: number): void {
        this.likesThreshold = likesThreshold;
    }
}