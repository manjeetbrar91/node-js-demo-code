import { Host } from "../../service-layer/models/Host";

export interface IHostService {
    getHostByHostName(hostName: string): Promise<Host>;
    createHosts(host: Host): Promise<Host>;
    getHostByRestaurantId(restaurantId: string): Promise<Host>;
}