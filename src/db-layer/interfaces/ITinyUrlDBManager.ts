
export interface ITinyUrlDBManager {
    saveTinyURL(url: string): Promise<string>;
    getTinyURL(uniqueCode: string): Promise<string>
}