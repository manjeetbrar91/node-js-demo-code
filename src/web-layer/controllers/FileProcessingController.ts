import { Constants } from "../../common/utils/Constants";
import { Get, JsonController, Param } from "routing-controllers";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
const sharp = require('sharp');


@JsonController(Constants.ROUTER_PREFIX + "/images")
export class FileProcessingController {
    @Get("/:file/:size")
    public async getFileWithSizeVariant(@Param('file') file: string, @Param('size') size: number): Promise<any> {
        let awsImageBuffer = await ServiceFactory.getAwsS3Service().downloadImage(file);
        const resizedImageBuffer = await sharp(awsImageBuffer).resize(size).toBuffer();
        return resizedImageBuffer;
    }
    @Get("/:file/:w/:h")
    public async getFileWithSizeVariantWAndH(@Param('file') file: string, @Param('w') w: number,@Param('h') h: number): Promise<any> {
        let awsImageBuffer = await ServiceFactory.getAwsS3Service().downloadImage(file);
        const resizedImageBuffer = await sharp(awsImageBuffer).resize(w,h).toBuffer();
        return resizedImageBuffer;
    }
    @Get("/:file")
    public async getOrignalFile(@Param('file') file: string): Promise<any> {
        let awsImageBuffer = await ServiceFactory.getAwsS3Service().downloadImage(file);
        return awsImageBuffer;
    }
}