// curl "https://api.coincap.io/v2/markets"
export namespace Markets {

    export interface Datum {
        exchangeId: string;
        rank: string;
        baseSymbol: string;
        baseId: string;
        quoteSymbol: string;
        quoteId: string;
        priceQuote: string;
        priceUsd: string;
        volumeUsd24Hr: string;
        percentExchangeVolume: string;
        tradesCount24Hr: string;
        updated: number;
    }

    export interface RootObject {
        data: Datum[];
        timestamp: number;
    }

}
