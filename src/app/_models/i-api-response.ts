export interface IApiResponse {
    result: string; // 'success' or 'error'
    error: string; // only if result is 'error'
    provider: string; // "https://www.exchangerate-api.com",
    terms: string; // "https://www.exchangerate-api.com/terms",
    base: string; // "GBP",
    date: Date; // "2021-10-19",
    timeLast_updated: number; // 1634601602,
    rates: any; // response is {} not [] !!!!
}
