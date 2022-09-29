
export interface IEmailProviderSMTP {
    sendHTMLEmail(to: Array<string>, subject: string, message: string, html?: string): Promise<boolean> 
}