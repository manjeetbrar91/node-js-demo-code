import { FuelUtility } from "../../common/utils/FuelUtility";
import { Config } from "../../config/Config";
import * as jwt from "jwt-simple";
import { Body, JsonController, Post } from "routing-controllers";
import { IBusinessUsersService } from "../../service-layer/interfaces/fuel/IBusinessUsersService";
import { BusinessUserModel } from "../../service-layer/models/fuel/BusinessUserModel";
import { UserLoginResponseModel } from "../../service-layer/models/fuel/UserLoginResponseModel";
import { JWTTokenClaims } from "../../service-layer/models/JWTtokenClaims";
import { UserLoginRequestModel } from "../../web-layer/models/fuel/UserLoginRequestModel";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";


@JsonController(Constants.ROUTER_PREFIX + "/business/auth")
export class BusinessUserAuthController {
    private readonly userService: IBusinessUsersService;

    constructor() {
        this.userService = ServiceFactory.getBusinessUsersService();
    }

    @Post("/login")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async login(@Body() req: UserLoginRequestModel): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);

        let result = await this.userService.getUserByMobileNumber(reqModel);
        let response = new UserLoginResponseModel()
        if (result == null || result == undefined) {
            // send otp
            // response.setOtpId("121212112")
            let user = await this.userService.register(reqModel)
            response.setIsNewUser(true);
            response.setUser(user);
        } else {
            response.setUser(result)
        }
        let resultModel = new ResultModel();
        resultModel.setData(response);
        return resultModel;

    }

    @Post("/verify")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async verifyOTP(@Body() req: UserLoginRequestModel): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);
        let otp = req.otp ? req.otp : ""
        let result = await this.userService.getUserByMobileNumber(reqModel);
        let response = new UserLoginResponseModel()
        if (result == null || result == undefined) {
            throw new MyError("User not found")
        } else {
            //Verify OTP
            response.setAccessToken(this.getAccessToken(result))
            response.setUser(result)
        }
        let resultModel = new ResultModel();
        resultModel.setData(response);
        return resultModel;

    }


    private getAccessToken(user: BusinessUserModel): string {

        let claims: JWTTokenClaims = new JWTTokenClaims(
            user.getId(),
            "sessionId",
            60,
            user.getUserType().toString(),
            [],//get roles
            null,
            []
        );
        return this.getJWTToken(claims);
    }



    private getJWTToken(claims: JWTTokenClaims): string {
        let jwtToken = jwt.encode(
            this.toJWTPayload(claims),
            Config.getInstance().getSecretKey(),
            this.Algorithm
        );
        return jwtToken;
    }
    private Algorithm: jwt.TAlgorithm = "HS256";

    private toJWTPayload(claims: JWTTokenClaims): any {
        return {
            aud: claims.getUserId(),
            exp: claims.getExpiresAt(),
            r: claims.getRoles(),
            pers: claims.getPermissions(),
            sid: claims.getSessionId(),
            // aid: claims.getAccountInfo().getAccountId(),
            ut: claims.getUserType(),
            at: claims.getUserType()//.getAccountType(),
        }
    }

}