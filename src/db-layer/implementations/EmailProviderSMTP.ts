import { IEmailProviderSMTP } from '../../db-layer/interfaces/IEmailProviderSMTP';
const nodemailer = require('nodemailer');

export class EmailProviderSMTP implements IEmailProviderSMTP {
    private emailAddress: string
    private password: string
    private fromEmail: string = '"EFUEL APP" <noreply@efuel.app>';

    constructor() {
        this.emailAddress = 'noreply@efuel.app';
        this.password = 'efuelapp21'
    }

    public async sendHTMLEmail(to: Array<string>, subject: string, message: string, html?: string): Promise<boolean> {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: this.emailAddress,
                pass: this.password
            }
        });



        transporter.sendMail({
            from: this.fromEmail,
            to: to,
            subject: subject,
            message: message,
            html: html
        }, (error, info) => {
            console.log("GMAIL error====>", error);
            console.log("GMAIL INFO======>", info);

        });

        return false;
    }
}