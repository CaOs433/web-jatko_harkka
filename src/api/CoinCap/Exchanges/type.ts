// curl "https://api.coincap.io/v2/exchanges"
// curl "https://api.coincap.io/v2/exchanges/binance"
export namespace Exchanges {

    export interface Datum {
        exchangeId: string;
        name: string;
        rank: string;
        percentTotalVolume: string;
        volumeUsd: string;
        tradingPairs: string;
        socket?: boolean;
        exchangeUrl: string;
        updated: any;
    }

    export interface RootObject {
        data: Datum[];
        timestamp: number;
    }

}
