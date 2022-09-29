import { DBManagerFactory } from '../../db-layer/DataAccessLayerFactory';
import { ITinyUrlDBManager } from "../../db-layer/interfaces/ITinyUrlDBManager";
import { ITinyURLService } from "../../service-layer/interfaces/ITinyURLService";
export class TinyURLService implements ITinyURLService {
  private readonly tinyURL: ITinyUrlDBManager;

  constructor() {
    this.tinyURL = DBManagerFactory.getTinyURLDBManager();
  }

  public async saveTinyURL(url: string): Promise<string> {
    return await this.tinyURL.saveTinyURL(url);
  }
  public async getTinyURL(uniqueCode: string): Promise<string>{
    return await this.tinyURL.getTinyURL(uniqueCode);
  }
}
