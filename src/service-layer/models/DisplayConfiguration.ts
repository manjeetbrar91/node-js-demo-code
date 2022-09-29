export class DisplayConfiguration {

    constructor()
    {
        this.welcomeMessage = "Welcome to the restaurant!!!"
        this.themeName = "DeMenew";
        this.greetingText = "Hello";
        this.promotionImageUri = ["https://menewcdn.blob.core.windows.net/femcafeandrestaurant/Upam.jpg", "https://menewcdn.blob.core.windows.net/femcafeandrestaurant/Upam.jpg"];
    }

    private themeName: string;

    private welcomeMessage: string;

    private greetingText: string;

    private promotionImageUri: Array<string> = [];

    public getThemeName(): string {
        return this.themeName;
    }

    public setThemeName(themeName: string): void {
        this.themeName = themeName;
    }

    public getWelcomeMessage(): string {
        return this.welcomeMessage;
    }

    public setWelcomeMessage(welcomeMessage: string): void {
        this.welcomeMessage = welcomeMessage;
    }

    public getGreetingText(): string {
        return this.greetingText;
    }

    public setGreetingText(greetingText: string): void {
        this.greetingText = greetingText;
    }
    
    public getPromotionImageUri(): string[] {
        return this.promotionImageUri;
    }

    public setPromotionImageUri(promotionImageUri: string[]): void {
        this.promotionImageUri = promotionImageUri;
    } 
}
