import { IPushNotificationService } from "../../../service-layer/interfaces/ecommerce/IPushNotificationService";
import { PushNotificationBaseModel } from "../../../service-layer/models/PushNotificationBaseModel";
var gcm = require('node-gcm');
var apn = require('apn');

export class PushNotificationService implements IPushNotificationService {

    public async sendNotificationToFCM(model: PushNotificationBaseModel, regTokens: string[]): Promise<PushNotificationBaseModel> {
        var message = new gcm.Message(model);

        // message.addData('hello', 'world');
        // message.addNotification('title', 'Hello');
        // message.addNotification('icon', 'ic_launcher');
        // message.addNotification('body', 'World');


        //Add your mobile device registration tokens here
        // regTokens = ['cbMrasVPQ-mylti-wnKLvM:APA91bFRon9I2GWocrLoPZHlHUz3JY-1IhUB3PEXMhHh8H6wjWyPIxFRvGUi3IzXD3sORTbH9e9tj1-LZM8v_PKf-k_4CO7v0VPdFEodqPiuRmXX8HBT3CVjY6JgtAnjHOqkqN2mKRYo'];
        //Replace your developer API key with GCM enabled here

        var sender = new gcm.Sender('AAAAHphuQto:APA91bF_o4kohxvAqVADqbc4B70OBhUhyvmlCccpy_IE61RuVvRbOSyQdWW0VpE66ioA-pipGmnfSEmmajb5sznV2z9NdshqqkMfGfJ4m_Gm0w_k6uT-Gxp_hGgnSkFghhPTD4gDl3f5');
        console.log("________________________________________");

        sender.send(message, regTokens, function (err, response) {
            if (err) {
                console.log("XXXXXXXXXXXXXX");
                console.error(err);
            } else {
                console.log("YYYYYYYYYYYYYYYYYY");
                console.log(response);
            }
        });

        return model;
    }


    public async sendNotificationToAPN(model: PushNotificationBaseModel, pushToken: string): Promise<PushNotificationBaseModel> {
        // let basePath = "D:\\_Projects\\_EFuel\\_Node\\efuel-backend-2022\\src\\service-layer\\implementations\\ecommerce\\";
        let basePath = "/home/ec2-user/efuel-backend-2022/src/service-layer/implementations/ecommerce/";
        var FSO_CERT = `${basePath}FSOCERT_2021.pem`;
        var FSO_KEY = `${basePath}FSOKEY_2021.pem`;
        var VCO_CERT = `${basePath}vcocert.pem`;
        var VCO_KEY = `${basePath}vockey.pem`;
        if (model.getType() == "VCO" || model.getType() == "DRV") {
            var CERT = VCO_CERT;
            var KEY = VCO_KEY;
        } else {
            var CERT = FSO_CERT;
            var KEY = FSO_KEY;
        }

        console.log(CERT);
        console.log(KEY)
        let Service = new apn.Provider({
            cert: CERT,
            key: KEY,
            passphrase: "1234",
            production: true
        });

        var note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600;
        note.badge = 1;
        note.sound = 'default';
        note.alert = model.getMessage();
        note.payload = {
            title: model.getMessage(),
            message: model.getMessage(),
            type: model.getType(),
            // sender: sender,
            // senderId: senderId,
            extra: model.getExtra(),
            action_noti: model.getClickAction()
        };



        if (model.getType() == "FSO" || model.getType() == "OPR") {
            note.topic = 'station.efuel.app';
        } else {
            note.topic = 'efuel.app';
        }

        Service.send(note, pushToken)
            .then(result => {
                console.log(`******************* ${model.getType()} --  ${pushToken}  ==>Sent : ${result.sent.length} -- Failed : ${result.failed.length} `);
                console.log(JSON.stringify(result));

                // sails.log.info(result.failed);
                // sails.log.info(result);

            });
        return model;
    }

}