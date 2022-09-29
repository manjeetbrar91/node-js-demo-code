
export interface ITinyURLService {
    saveTinyURL(url: string): Promise<string>
    getTinyURL(uniqueCode: string): Promise<string>
}
