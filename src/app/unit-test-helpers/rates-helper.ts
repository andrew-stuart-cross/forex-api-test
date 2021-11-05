import { IRate } from "../_models";

export const fakeRates: IRate[] = [{ code: 'AED', rate: 5.04 }, { code: 'YER', rate: 342.25 }];


// important to check that the object is valid JSON!
// use https://jsonlint.com/ to validate the object
// it causes all sorts of issues if the object is not valid!!!!!
export const fakeApiResponse: any =
{
  "provider": "https://www.exchangerate-api.com",
  "WARNING_UPGRADE_TO_V6": "https://www.exchangerate-api.com/docs/free",
  "terms": "https://www.exchangerate-api.com/terms",
  "base": "GBP",
  "date": "2021-11-02",
  "time_last_updated": 1635811201,
  "rates": {
    "AED": 5.04,
    "YER": 342.25
  }
}