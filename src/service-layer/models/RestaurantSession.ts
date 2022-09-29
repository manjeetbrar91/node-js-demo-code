export class RestaurantSession {
    private id: string;
    private restaurantId: string;
    private createdAt: Date;
    private updatedAt: Date;
    private sessionEnd: string;
    private sessionStart: string;
    private emailBody: string;
    private emailSubject: string;
    private isEmailBodyUpdated: boolean;

    public getSessionEnd(): string {
        return this.sessionEnd;
    }

    public setSessionEnd(sessionEnd: string): void {
        this.sessionEnd = sessionEnd;
    }

    public getSessionStart(): string {
        return this.sessionStart;
    }

    public setSessionStart(sessionStart: string): void {
        this.sessionStart = sessionStart;
    }

    public getEmailBody(): string {
        return this.emailBody;
    }

    public setEmailBody(emailBody: string): void {
        this.emailBody = emailBody;
    }

    public getEmailSubject(): string {
        return this.emailSubject;
    }

    public setEmailSubject(emailSubject: string): void {
        this.emailSubject = emailSubject;
    }

    public isIsEmailBodyUpdated(): boolean {
        return this.isEmailBodyUpdated;
    }

    public setIsEmailBodyUpdated(isEmailBodyUpdated: boolean): void {
        this.isEmailBodyUpdated = isEmailBodyUpdated;
    }


    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getRestaurantId(): string {
        return this.restaurantId;
    }

    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }
}