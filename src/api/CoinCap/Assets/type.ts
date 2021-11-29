// curl "https://api.coincap.io/v2/assets"
// curl "https://api.coincap.io/v2/assets/bitcoin"
export declare namespace Assets {

    export interface Asset {
        id: string;
        rank?: string;
        symbol?: string;
        name?: string;
        supply?: string;
        maxSupply?: string;
        marketCapUsd?: string;
        volumeUsd24Hr?: string;
        priceUsd?: string;
        changePercent24Hr?: string;
        vwap24Hr?: string;
        explorer?: string;
    }

    export interface RootObject {
        data: Asset[];
        timestamp: number;
    }

}


// curl "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1"
export declare namespace History {

    export interface Datum {
        priceUsd: string;
        time: number;
        date: string; //Date;
    }

    export interface RootObject {
        data: Datum[];
        timestamp: number;
    }

}


// curl "https://api.coincap.io/v2/assets/bitcoin/markets"
export declare namespace Markets {

    export interface Datum {
        exchangeId: string;
        baseId: string;
        quoteId: string;
        baseSymbol: string;
        quoteSymbol: string;
        volumeUsd24Hr: string;
        priceUsd: string;
        volumePercent: string;
    }

    export interface RootObject {
        data: Datum[];
        timestamp: number;
    }

}


// Final type for assets after JSON parsing
export declare namespace FinalAssets {

    export interface History {
        priceUsd: string;
        time: any;
        date: string; //Date;
    }

    export interface Asset {
        id: string;
        rank: string;
        symbol: string;
        name: string;
        supply: string;
        maxSupply: string;
        marketCapUsd: string;
        volumeUsd24Hr: string;
        priceUsd: string;
        changePercent24Hr: string;
        vwap24Hr: string;
        explorer: string;
        history: History[];
    }

    export interface RootObject {
        data: Asset[];
        timestamp: number;
    }

}
