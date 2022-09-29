import { AWSUploadType } from "../../service-layer/implementations/AWSS3Service";

export interface IAWSS3Service {
      uploadFile(file: Express.Multer.File, type: AWSUploadType);

      downloadImage(key: string): Promise<any>
}