import { Config } from '../../config/Config';
import { logger } from '../../logs';
import { IEmailProvider } from '../interfaces/IEmailProvider';
const sgMail = require('@sendgrid/mail');

export class EmailProvider implements IEmailProvider {

    constructor() {
        sgMail.setApiKey(Config.getInstance().getSendgridApiKey());
    }

    public async sendEmail(to: Array<string>, subject: string, message: string): Promise<boolean> {
        const msg = {
            to: to,
            // from: 'notification@demenew.com',
            from: 'notification@example.com',
            subject: subject,
            html: message,
        };

        sgMail
            .send(msg)
            .then(() => {
                return true;
            }, error => {
                logger.error(error);
                if (error.response) {
                    logger.error(error.response.body)
                }
                return false;
            });

        return false;
    }
}