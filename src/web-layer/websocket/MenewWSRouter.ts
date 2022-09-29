import { Request, Response, Router } from "express";
import * as WebSocket from 'ws';
// import { PubSubMessage } from "../../service-layer/pubsub/models/PubSubMessage";
import { PubSubController } from "./PubSubController";
// import { PubSubSessionManager } from "../../service-layer/pubsub/implementations/PubSubSessionManager";
import { logger } from '../../logs';
// import { MessageType } from "../../service-layer/pubsub/models/MessageType";

interface WsRouter extends Router {
    [x: string]: any;
}

export class MenuWSRoute {
    private static readonly CLOSE_UNUSED_CONNECTIONS_DURATION_MS = 300 * 1000;

    private router: WsRouter;
    private socketToControllerMap: Map<WebSocket, PubSubController>;
    private cleanUpIntervalId: any;
    constructor() {
        this.router = Router();
        this.socketToControllerMap = new Map<WebSocket, PubSubController>();
    }

    public routes(app): Router {
        this.cleanUpIntervalId = setInterval(() => this.cleanUpClosedConnections(), MenuWSRoute.CLOSE_UNUSED_CONNECTIONS_DURATION_MS);

        this.router
            .ws('/subscribe', async (ws: WebSocket, req: Request) => {
                logger.info("websocket connection open");

                // Check JWT token header and set error message if any

                ws.on('message', (message: string) => {
                    this.onMessage(message, ws);
                });

                ws.on('close', (message: string) => {
                    this.closeConnection(`on user's close request code: ${message}`, ws);
                });

                ws.on('ping', (message: string) => {
                    logger.info("Received ping on websocket message: %s", message);
                });
            });
        return this.router;
    }

    private onMessage(message: string, ws: WebSocket) {
        logger.info('received message on websocket: %s', message);
        // let syncMessage: PubSubMessage;

        // // Send some error to client and close the connection in case of malformed messages received from client
        // try {
        //     syncMessage = PubSubMessage.fromJSON(message);
        // }
        // catch (e) {
        //     logger.error("Exception while parsing PubSubMessage e=", e);
        //     return;
        // }

        // if (!syncMessage.isValid()) {
        //     logger.error("message: %s is not valid PubSubMessage", message);
        //     return;
        // }

        // let controller: PubSubController = PubSubSessionManager.getPubSubController(syncMessage.getRestaurantId(), syncMessage.getDeviceId());

        // // controller already exists and user is trying to subscribe again !
        // if (controller != undefined &&
        //     syncMessage.getMessageType() === MessageType.SUBSCRIBE) {
        //     this.closeConnection("Cleaning older controller", controller.getWebSocket());
        //     controller = undefined;
        // }

        // // First time subscription of device
        // if (controller == undefined &&
        //     syncMessage.getMessageType() === MessageType.SUBSCRIBE) {
        //     controller = new PubSubController(ws, syncMessage.getRestaurantId(), syncMessage.getDeviceId());
        //     this.socketToControllerMap.set(ws, controller);
        //     PubSubSessionManager.addPubSubController(syncMessage.getRestaurantId(), syncMessage.getDeviceId(), controller);
        // }

        // if (controller == undefined) {
        //     // subscribe should be always first message
        //     // send some error to client and close the socket
        //     return;
        // }

        // // handle message
        // try {
        //     controller.handleMessage(syncMessage);
        // }
        // catch (e) {
        //     logger.error(e, "Exception while handing message: %s controller: %s", message, controller.toString());
        //     return;
        // }
        
    }

    private closeConnection(reason: string, ws: WebSocket) {
        let controller: PubSubController = this.socketToControllerMap.get(ws);
        logger.info('websocket connection closing. reason= %s', reason);
        if (controller != undefined) {
            logger.info('closing controller= %s', controller.toString());
            // controller.handleDisconnect();
            // PubSubSessionManager.removePubSubController(controller.getRestaurantId(), controller.getDeviceId());
            this.socketToControllerMap.delete(ws);
        }
    }

    private printStats(): void {
        // logger.info("Total number of web sockets: %s ", this.socketToControllerMap.size);
        // const restaurantDevicesMap: Map<string, Set<string>> = new Map<string, Set<string>>();
        // for (let [key, controller] of this.socketToControllerMap) {
        //     const restaurantId: string = controller.getRestaurantId();
        //     let deviceIds:Set<string> = restaurantDevicesMap.get(restaurantId);
        //     if(deviceIds == undefined){
        //         deviceIds = new Set<string>();
        //         restaurantDevicesMap.set(restaurantId, deviceIds);
        //     } 
        //     // deviceIds.add(controller.getDeviceId());
        // }
        // for (let [restaurantId, deviceIds] of restaurantDevicesMap) {
        //     logger.info("Active web sockets of restaurantId: %s deviceIds: %j", restaurantId, deviceIds);
        // }
    }

    private cleanUpClosedConnections(): void {

        // clean socketToController Map
        for (let [key, controller] of this.socketToControllerMap) {
            let currentTimeStamp: number = new Date().getTime();
            // if ((currentTimeStamp - controller.getCreationTimestamp() > 300000) &&
            //     !controller.isIsSubscribed()) {
            //     this.closeConnection("unregistered websocket", controller.getWebSocket());
            // }
        }
        this.printStats();
    }
}