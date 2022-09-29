import * as WebSocket from 'ws';
// import { PubSubMessage } from "../../service-layer/pubsub/models/PubSubMessage";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
// import { MessageType } from "../../service-layer/pubsub/models/MessageType";
import { logger } from "../../logs";

export class PubSubController {

    private webSocket: WebSocket;

    private restaurantId: string;
    private deviceId: string;

    private isSubscribed: boolean;

    private intervalId: any;
    private messageIdToLockTokenMap: Map<string, string>;
    private creationTimestamp: number;

    constructor(webSocket: WebSocket, restaurantId: string, deviceId: string) {
        this.webSocket = webSocket;
        this.restaurantId = restaurantId;
        this.deviceId = deviceId;
        this.isSubscribed = false;
        // this.receiveMessage = this.receiveMessage.bind(this);
        this.messageIdToLockTokenMap = new Map<string, string>();
        this.creationTimestamp = new Date().getTime();
    }

    public getCreationTimestamp(): number {
        return this.creationTimestamp;
    }

    public handleMessage(pubSubMessage: any): void {
        switch (pubSubMessage.getMessageType()) {
            // case MessageType.SUBSCRIBE:
            //     this.handleSubscription();
            //     break;
            // case MessageType.PUBLISH:
            //     let messageString: string = pubSubMessage.getMessagePayload()['msg'];
            //     this.handlePublish(messageString);
            //     break;
            // case MessageType.ACK:
            //     let messageId: string = pubSubMessage.getMessagePayload()['msgId'];
            //     this.handleAck(messageId);
            //     break;
            // case MessageType.DISCONNECT:
            //     this.handleDisconnect();
            //     break;
            // case MessageType.PING:
            //     this.handlePing();
            //     break;
        }
    }

    private handlePing(): void {
        logger.info("Received ping restaurant [" + this.restaurantId + "], device [" + this.deviceId + "]");
    }

    // public handleSubscription(): void {

    //     if (this.isSubscribed) {
    //         return;
    //     }
    //     ServiceFactory.getPubSubService().initDeviceSubscription(this.restaurantId, this.deviceId);
    //     // polling messages in some interval
    //     this.intervalId = setInterval(() => ServiceFactory.getPubSubService().receiveSubscriptionMessage(this.restaurantId, this.deviceId, this.receiveMessage), 5000);
    //     logger.info("Subscribed restaurant [" + this.restaurantId + "], device [" + this.deviceId + "]");
    //     this.isSubscribed = true;
    // }

    // public handleDisconnect() {
    //     logger.info("Disconnecting restaurant [" + this.restaurantId + "], device [" + this.deviceId + "]");
    //     if (this.intervalId) {
    //         clearInterval(this.intervalId);
    //         this.intervalId = undefined;
    //         this.isSubscribed = false;
    //         for (let [messageId, lockToken] of this.messageIdToLockTokenMap) {
    //             const messageToken = this.getMessageToken(messageId, lockToken);
    //             ServiceFactory.getPubSubService().unlockMessage(this.restaurantId, this.deviceId, messageToken);
    //         }
    //     }
    // }

    // public handleAck(messageId: string) {
    //     logger.info("Received ack restaurant [" + this.restaurantId + "], device [" + this.deviceId + "], msgId [" + messageId + "]");
    //     let lockToken = this.messageIdToLockTokenMap.get(messageId);
    //     if (lockToken != undefined) {
    //         const messageToken = this.getMessageToken(messageId, lockToken);
    //         ServiceFactory.getPubSubService().deleteLockedMessage(this.restaurantId, this.deviceId, messageToken);
    //         this.messageIdToLockTokenMap.delete(messageId);
    //         logger.info("handled ack for messageId %s messageToken:%s", messageId, messageToken);
    //     }
    // }

    // public handlePublish(messageString: string) {
    //     logger.info("Received publish restaurant [" + this.restaurantId + "], device [" + this.deviceId + "], messageString [" + messageString + "]");
    //     ServiceFactory.getPubSubService().sendMessageToAllDevices(this.restaurantId, messageString);
    // }

    // private getMessageToken(messageId: string, lockToken: string): string {
    //     return `${messageId}/${lockToken}`;
    // }

    // public receiveMessage(error, lockedMessage: any): void {
    //     if (!error) {
    //         try {
    //             const messageId = lockedMessage.brokerProperties.MessageId;
    //             const lockToken = lockedMessage.brokerProperties.LockToken;
    //             // Message received and locked
    //             let message:any;//: PubSubMessage = new PubSubMessage();
    //             message.setId(messageId);
    //             message.setMessagePayload(JSON.parse(lockedMessage.body));
    //             // this.messageIdToLockTokenMap.set(message.getId(), lockToken);
    //             this.webSocket.send(JSON.stringify(message));
    //             // logger.info("MsgId: " + message.getId() + " Restaurant [" + this.restaurantId + "], device [" + this.deviceId + "] - " + lockedMessage.body);
    //         }
    //         catch (e) {
    //             logger.error(e, "Unable to process received lockedMessage: %s for restaurantId: %s deviceId: %s so we will retry after some time.",
    //                 lockedMessage.body, this.restaurantId, this.deviceId);
    //         }
    //     }
    //     else if(error == "No messages to receive"){
    //         // logger.debug("No message for restaurantId: %s deviceId: %s", this.restaurantId, this.deviceId);
    //     }
    //     else {
    //         logger.warn("Unable to retrieve message for restaurantId: %s deviceId: %s error: %j", this.restaurantId, this.deviceId, error);
    //     }
    // }

    // public isIsSubscribed(): boolean {
    //     return this.isSubscribed;
    // }

    // public getWebSocket(): WebSocket {
    //     return this.webSocket;
    // }

    // public getRestaurantId(): string {
    //     return this.restaurantId;
    // }

    // public getDeviceId(): string {
    //     return this.deviceId;
    // }

    // public toString(): string {
    //     return JSON.stringify({
    //         restaurantId: this.restaurantId,
    //         deviceId: this.deviceId,
    //         isSubscribed: this.isSubscribed,
    //         creationTimestamp: this.creationTimestamp
    //     })
    // }
}    