import { IAWSS3Service } from "../../service-layer/interfaces/IAWSS3Service";
import { Config } from "../../config/Config";
import { Utils } from "../../common/utils/Utils";
const AWS = require('aws-sdk');
const sharp = require('sharp');

export class AWSS3Service implements IAWSS3Service {
    private ID: string;
    private SECRET: string;
    private BUCKET_NAME: string;
    constructor() {
        this.ID = Config.getInstance().getAwsS3AccessKeyId();
        this.SECRET = Config.getInstance().getAwsS3SecretAccessKey();
        this.BUCKET_NAME = Config.getInstance().getAwsS3BucketName();

    }

    public async init(): Promise<any> {

        return new AWS.S3({
            accessKeyId: this.ID,
            secretAccessKey: this.SECRET
        });
    }

    public async uploadFile(file: Express.Multer.File, type: AWSUploadType) {
        if (file == undefined) {
            return "";
        }
        let name = file.originalname.split(".");
        // let fileName = `${type}/${Utils.getAlphaNumericCAPSString(4)}_${new Date().getTime()}_${Utils.getAlphaNumericCAPSString(4)}.${name[name.length - 1]}`;
        let fileName = `${type}/${Utils.generateUniqueAWSKey()}.${name[name.length - 1]}`;
        const params = {
            Bucket: this.BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: file.buffer
        };
        let s3 = (await this.init());
        let res = new Promise((resolve, reject) => {

            s3.upload(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return resolve("");
                }
                console.log(`File uploaded successfully. ${data.Location}`);
                return resolve(data.key);
            });

        });
        return res

        // return (await this.init()).upload(params, function (err, data) {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(`File uploaded successfully. ${data.Location}`);
        // });



    }
    public async downloadImage(key: string): Promise<any> {
        let s3 = (await this.init());


        const params = {
            Bucket: this.BUCKET_NAME,
            Key: key, // File name you want to save as in S3
            // Body: fileContent
        };

        let res = new Promise((resolve, reject) => {
            s3.getObject(params, function (err, res) {
                if (err == null) {
                    //    res.attachment('file.ext'); // or whatever your logic needs
                    let x = res.Body;
                    return resolve(x);

                } else {
                    return reject(new Error("not founr"))
                    // new Error("Not PFund")
                }
            });
        });


        return res
    }
    public async downloadImagexxx(key: string): Promise<any> {
        let s3 = (await this.init());


        const params = {
            Bucket: this.BUCKET_NAME,
            Key: key, // File name you want to save as in S3
            // Body: fileContent
        };
        try {

            let readStream = s3.getObject(params);
            console.log(readStream);
            if (readStream && readStream.get)
                return readStream.createReadStream();

        } catch (e) {
            return null
        }
    }

}

export enum AWSUploadType {
    Category = "category",
    SubCategory = "sub-category",
    Product = "product",
}