import { IRecommendationEngine } from "../../db-layer/interfaces/IRecommendationEngine";
import { Config } from "../../config/Config";
import { RecommendationResponse } from "../../web-layer/models/response/RecommendationResponse";
import * as request from 'request-promise-native';
import { logger } from '../../logs';

export class RecommendationEngine implements IRecommendationEngine {
    private readonly recommendationUrl: string;

    constructor() {
        this.recommendationUrl = Config.getInstance().getRecommendationUrl();
    }

    public async getRecommendations(itemIds: Array<string>, restaurantId: string, veg: number): Promise<RecommendationResponse> {
        var options = { 
            method: 'POST',
            url: this.recommendationUrl,
            headers: 
            {
                'Content-Type': 'application/json' 
            },
            body: 
            { 
                "products_selected": itemIds,
                "restaurant_id": restaurantId,
                "veg": veg
            },
            json: true 
        };
        try{
            let resp = await request(options);
            let response = this.getRecommendationResponse(resp);
            return response;
        }catch(err){
            logger.error(err, "caught exception while getting recommendations: %s", err.message);
            throw err;
        }
    }

    private getRecommendationResponse(data): RecommendationResponse {
        let response: RecommendationResponse = new RecommendationResponse();
        response.setProducts(Object.values(data.products));
        response.setRestaurantId(data.restaurant_id);
        response.setVeg(data.veg === 1);
        return response;
    }
}