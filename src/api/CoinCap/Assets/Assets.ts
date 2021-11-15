import { Assets as AssetsType, History, Markets, FinalAssets } from "./type";
import axios from "axios";

//import { ConvertAssets, Assets as AssetsType } from "./ParseAssets";

export class Assets {
    assets?: FinalAssets.RootObject;
    //history: History.RootObject;
    //markets: Markets.RootObject;

    updateCount: number;

    baseUrl = "https://crypto-web-projekti.herokuapp.com/assets.json"; //"https://api.coincap.io/v2"; //"https://api.saarinen.xyz/AssetsExampleData.json";

    constructor(assets?: FinalAssets.RootObject) {
        this.update = this.update.bind(this);
        this.getAssets = this.getAssets.bind(this);
        this.parseAssets = this.parseAssets.bind(this);

        this.updateCount = 0;

        if (assets === undefined) {
            this.update();
        } else {
            this.assets = assets;
        }
    }

    update() {
        this.updateCount++;
        console.log(`${this.updateCount}. update`);
        this.getAssets();
    }

    async getAssets(coin?: string) {
        const coins = coin === undefined || coin === "";
        /*const endfix = (coins) ? "" : "/"+coin;
        const url = this.baseUrl; //`${this.baseUrl}/assets${endfix}`;*/
        const url = this.baseUrl;//'http://localhost:3001/assets.json';

        const response = await axios.get(url);
        if (response.status === 200) {
            const data = await response.data;
            console.log(JSON.stringify(data));
            console.log('(200): success')
            this.parseAssets(data, coins);

        } else { console.log(`status (${response.status}): ${response.statusText}`); }
    }

    parseAssets(data: any, coins: boolean) {
        if (coins) {
            try {
                console.log(`data: ${data}`);
                const parsed: AssetsType.RootObject = JSON.parse(JSON.stringify(data));
                console.log('parsed ok');
                const newAssets = parsed.data.map(asset => {
                    let rtn: any = asset;
                    rtn.history = [];
                    return rtn;
                });
                console.log('newAssets ok');
                const rtnData: FinalAssets.RootObject = { timestamp: parsed.timestamp, data: newAssets };
                console.log('rtnData ok');
                console.log(`rtnData: ${rtnData}`);
                this.assets = rtnData;

                //console.log(JSON.stringify(this.assets));

                //const assets = ConvertAssets.toAssets(JSON.stringify(data));
                //console.log(assets);
            } catch (e) {
                console.log(`Error while parsing JSON: ${e}`);
            }
        }
    }

}
