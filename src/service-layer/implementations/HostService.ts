import { IHostService } from "../../service-layer/interfaces/IHostService";
import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IHostDBManager } from "../../db-layer/interfaces/IHostDBManager";
import { Host } from "../../service-layer/models/Host";
import { logger } from "../../logs";

export class HostService implements IHostService {

    private readonly hostDBManager: IHostDBManager;

    constructor() {
        this.hostDBManager = DBManagerFactory.getHostDBManager();
    }

    public async getHostByHostName(name: string): Promise<Host> {
        let savedHost: Host = await this.hostDBManager.getHostByHostName(name);
        logger.info("getHostByHostName - %O", savedHost);
        return savedHost;
    }

    public async createHosts(host: Host): Promise<Host> {
        let savedHost: Host = await this.hostDBManager.createHosts(host);
        logger.info("getHostByHostName - %O", savedHost);
        return savedHost;
    }

    public async getHostByRestaurantId(restaurantId: string): Promise<Host> {
        let savedHost: Host = await this.hostDBManager.getHostByRestaurantId(restaurantId);
        logger.info("getHostByRestaurantId - %O", savedHost);
        return savedHost;
    }
}