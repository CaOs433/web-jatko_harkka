// curl "https://api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin"
export namespace Candles {

    export interface Datum {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
        period: number;
    }

    export interface RootObject {
        data: Datum[];
        timestamp: number;
    }

}
