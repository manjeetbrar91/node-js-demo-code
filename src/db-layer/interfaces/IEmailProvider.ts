
export interface IEmailProvider {
    sendEmail(to: Array<string>, subject: string, message: string): Promise<boolean>;
}