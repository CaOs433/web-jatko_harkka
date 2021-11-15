// curl "https://api.coincap.io/v2/rates"
// curl "https://api.coincap.io/v2/rates/bitcoin"
export namespace Rates {

    export interface Rate {
        id: string;
        symbol: string;
        currencySymbol: string;
        type: string;
        rateUsd: string;
    }

    export interface RootObject {
        data: Rate[];
        timestamp: number;
    }

}
