import { staging } from "./staging";
import { production } from "./production";
import { localDevelopment } from './localDevelopment';
import { development } from './development';
import { preprod } from "./preprod";

export class Config {
    private static _instance: Config;

    private env: string;

    private port: number;
    private logLevel: string;
    private frontEndUrl: string;
    private tinyUrl: string;
    private frontEndQRUrl: string;
    private serviceBusUrl: string;
    private secretKey: string;
    private uuidNamespace: string;
    private tokenExpiryInSecs: number;
    private customerTokenExpiryInSecs: number;
    private paymentProviderKey: string;
    private paymentProviderSecret: string;

    private mongoUrl: string;
    private telemetryEnabled: boolean;
    private statsdHost: string;
    private statsdPort: number;

    private telemetryInstrumentationKey: string;

    private urbanPiperUrl: string;
    private urbanPiperBaseUrl: string;

    private googleClientId: string;
    private googleClientSecret: string;
    private googleRedirectUri: string;

    private transactionUrl: string;
    private otpUrl: string;
    private recommendationUrl: string;
    private smsSender: string;
    private otpApiKey: string;
    private transactionApiKey: string;
    private smsCallBackUrl: string;

    private azureAccount: string;
    private azureSecret: string;
    private rootContainer: string;

    private dunzoClientId: string;
    private dunzoClientSecret: string;
    private dunzoRedirectUri: string;

    private rapidoRedirectUri: string;
    private rapidoApiKey: string;

    private sendgridApiKey: string;

    private ezeepClientId: string;
    private ezeepClientSecret: string;
    private ezeepRedirectUri: string;
    private ezeepAccountUrl: string;
    private ezeepPrintUrl: string;

    private printNodeUrl: string;
    private printNodeApiKey: string;



    private awsS3BucketName: string;
    private awsS3AccessKeyId: string;
    private awsS3SecretAccessKey: string;

    public getAwsS3BucketName(): string {
        return this.awsS3BucketName;
    }

    public setAwsS3BucketName(awsS3BucketName: string): void {
        this.awsS3BucketName = awsS3BucketName;
    }

    public getAwsS3AccessKeyId(): string {
        return this.awsS3AccessKeyId;
    }

    public setAwsS3AccessKeyId(awsS3AccessKeyId: string): void {
        this.awsS3AccessKeyId = awsS3AccessKeyId;
    }

    public getAwsS3SecretAccessKey(): string {
        return this.awsS3SecretAccessKey;
    }

    public setAwsS3SecretAccessKey(awsS3SecretAccessKey: string): void {
        this.awsS3SecretAccessKey = awsS3SecretAccessKey;
    }




    public getTinyUrl(): string {
        return this.tinyUrl;
    }

    public setTinyUrl(tinyUrl: string): void {
        this.tinyUrl = tinyUrl;
    }
    public getPrintNodeUrl(): string {
        return this.printNodeUrl;
    }

    public setPrintNodeUrl(printNodeUrl: string): void {
        this.printNodeUrl = printNodeUrl;
    }

    public getPrintNodeApiKey(): string {
        return this.printNodeApiKey;
    }

    public setPrintNodeApiKey(printNodeApiKey: string): void {
        this.printNodeApiKey = printNodeApiKey;
    }

    public getEzeepAccountUrl(): string {
        return this.ezeepAccountUrl;
    }

    public setEzeepAccountUrl(ezeepAccountUrl: string): void {
        this.ezeepAccountUrl = ezeepAccountUrl;
    }

    public getEzeepPrintUrl(): string {
        return this.ezeepPrintUrl;
    }

    public setEzeepPrintUrl(ezeepPrintUrl: string): void {
        this.ezeepPrintUrl = ezeepPrintUrl;
    }

    public getEzeepClientId(): string {
        return this.ezeepClientId;
    }

    public setEzeepClientId(ezeepClientId: string): void {
        this.ezeepClientId = ezeepClientId;
    }

    public getEzeepClientSecret(): string {
        return this.ezeepClientSecret;
    }

    public setEzeepClientSecret(ezeepClientSecret: string): void {
        this.ezeepClientSecret = ezeepClientSecret;
    }

    public getEzeepRedirectUri(): string {
        return this.ezeepRedirectUri;
    }

    public setEzeepRedirectUri(ezeepRedirectUri: string): void {
        this.ezeepRedirectUri = ezeepRedirectUri;
    }

    public getSendgridApiKey(): string {
        return this.sendgridApiKey;
    }

    public setSendgridApiKey(value: string) {
        this.sendgridApiKey = value;
    }

    private constructor() {
        this.env = process.env.NODE_ENV || 'localDevelopment';
        this.load(this.getData());
    }

    public static getInstance(): Config {
        return this._instance || (this._instance = new this());
    }

    private getData(): any {
        switch (this.env) {
            case "production":
                return production;
            case "staging":
                return staging;
            case "staging-archive":
                return staging;
            case "preprod":
                return preprod;
            case "development":
                return development;
            default:
                return localDevelopment;
        }
    }

    private load(data: any): void {
        this.port = parseInt(process.env.PORT ? process.env.PORT : (data.app.port || 3000));
        this.frontEndUrl = data.app.frontEndUrl;
        this.tinyUrl = data.app.tinyUrl;
        this.frontEndQRUrl = data.app.frontEndQRUrl;
        this.logLevel = data.app.logLevel || 'debug';
        this.serviceBusUrl = process.env.SERVICE_BUS_URL ? process.env.SERVICE_BUS_URL : (data.app.serviceBusUrl || "Endpoint=sb://xxxxxxx-orders.servicebus.windows.net/;SharedAccessKeyName=xxxxxxx.com;SharedAccessKey=geyoMAmdADqQzA/xt/qtCfKy72cd9fQQ296d3aF+3vs=");
        this.secretKey = data.authentication.secretKey;
        this.uuidNamespace = data.authentication.uuidNamespace;
        this.tokenExpiryInSecs = data.authentication.tokenExpiryInSecs || 12 * 60 * 60;
        this.customerTokenExpiryInSecs = data.authentication.customerTokenExpiryInSecs || 24 * 60 * 60;
        this.mongoUrl = process.env.MONGO_CONNECTION_STRING || data.mongodb.url;
        this.telemetryEnabled = data.telemetry.enabled || false;
        this.statsdHost = data.telemetry.statsd.host || "localhost";
        this.statsdPort = parseInt(data.telemetry.statsd.port) || 8125;
        this.telemetryInstrumentationKey = process.env.APP_INSIGHTS_INSTRUMENTATION_KEY || data.app.telemetryInstrumentationKey;

        this.transactionUrl = data.sms.transactionUrl;
        this.otpUrl = data.sms.otpUrl;
        this.smsSender = data.sms.sender;
        this.otpApiKey = data.sms.otpApiKey;
        this.transactionApiKey = data.sms.transactionApiKey;
        this.smsCallBackUrl = data.sms.smsCallBackUrl;
        this.paymentProviderKey = data.payment.paymentProviderKey;
        this.paymentProviderSecret = data.payment.paymentProviderSecret;
        this.urbanPiperUrl = data.urbanPiper.url;
        this.urbanPiperBaseUrl = data.urbanPiper.actionBaseUrl;
        this.googleClientId = data.google.clientId;
        this.googleClientSecret = data.google.clientSecret;
        this.googleRedirectUri = data.google.redirectUri;

        this.azureAccount = data.azure.account
        this.azureSecret = data.azure.secret;
        this.rootContainer = data.azure.rootContainer;

        this.dunzoClientId = data.dunzo.clientId;
        this.dunzoClientSecret = data.dunzo.clientSecret;
        this.dunzoRedirectUri = data.dunzo.redirectUri;

        this.rapidoRedirectUri = data.rapido.redirectUri;
        this.rapidoApiKey = data.rapido.apikey;

        this.sendgridApiKey = data.email.sendGridApi;
        this.recommendationUrl = data.recommendation.url;

        this.ezeepClientId = data.ezeep.clientId;
        this.ezeepClientSecret = data.ezeep.clientSecret;
        this.ezeepRedirectUri = data.ezeep.redirectUri;
        this.ezeepAccountUrl = data.ezeep.accountUrl;
        this.ezeepPrintUrl = data.ezeep.printUrl;

        this.printNodeApiKey = data.printNode.apiKey;
        this.printNodeUrl = data.printNode.url;
        this.awsS3AccessKeyId = data.aws.accessKeyId;
        this.awsS3SecretAccessKey = data.aws.secretAccessKey;
        this.awsS3BucketName = data.aws.bucketName;
    }

    public getRecommendationUrl(): string {
        return this.recommendationUrl;
    }

    public getFrontEndUrl(): string {
        return this.frontEndUrl;
    }

    public getFrontEndQRUrl(): string {
        return this.frontEndQRUrl;
    }

    public getDunzoRedirectUri(): string {
        return this.dunzoRedirectUri;
    }

    public getDunzoClientId(): string {
        return this.dunzoClientId;
    }

    public getDunzoClientSecret(): string {
        return this.dunzoClientSecret;
    }

    public getGoogleRedirectUri(): string {
        return this.googleRedirectUri;
    }

    public getGoogleClientId(): string {
        return this.googleClientId;
    }

    public getGoogleClientSecret(): string {
        return this.googleClientSecret;
    }

    public getUrbanPiperUrl(): string {
        return this.urbanPiperUrl;
    }

    public getUrbanPiperBaseUrl(): string {
        return this.urbanPiperBaseUrl;
    }

    public getEnvironment(): string {
        return this.env
    }

    public isDevelopment(): boolean {
        return this.getEnvironment() == "development";
    }

    public isProduction(): boolean {
        return this.getEnvironment() == "production";
    }

    public getLogLevel(): string {
        return this.logLevel
    }

    public getPort(): number {
        return this.port
    }

    public getServiceBusUrl(): string {
        return this.serviceBusUrl;
    }

    public getSecretKey(): string {
        return this.secretKey;
    }

    public getUuidNamespace(): string {
        return this.uuidNamespace;
    }

    public getTokenExpiryInSecs(): number {
        return this.tokenExpiryInSecs;
    }

    public getCustomerTokenExpiryInSecs(): number {
        return this.customerTokenExpiryInSecs;
    }

    public getPaymentProviderSecret() {
        return this.paymentProviderSecret;
    }

    public getPaymentProviderKey() {
        return this.paymentProviderKey;
    }

    public getJwtSession(): any {
        return { session: false }
    }

    public getMongoUrl(): string {
        return this.mongoUrl;
    }

    public isTelemetryEnabled(): boolean {
        return this.telemetryEnabled;
    }

    public getStatsHost(): string {
        return this.statsdHost;
    }

    public getStatsPort(): number {
        return this.statsdPort;
    }

    public getTelemetryInstrumentationKey(): string {
        return this.telemetryInstrumentationKey;
    }

    public getTransactionUrl(): string {
        return this.transactionUrl;
    }

    public getOtpUrl(): string {
        return this.otpUrl;
    }

    public getSmsSender(): string {
        return this.smsSender;
    }

    public getOtpApiKey(): string {
        return this.otpApiKey;
    }

    public geTtransactionApiKey(): string {
        return this.transactionApiKey;
    }

    public getSmsCallBackUrl(): string {
        return this.smsCallBackUrl;
    }

    public getAzureAccount(): string {
        return this.azureAccount;
    }

    public getAzureSecret(): string {
        return this.azureSecret;
    }

    public getRootContainer(): string {
        return this.rootContainer;
    }

    public getRapidoApiKey(): string {
        return this.rapidoApiKey;
    }

    public getRapidoRedirectUri(): string {
        return this.rapidoRedirectUri;
    }

}
