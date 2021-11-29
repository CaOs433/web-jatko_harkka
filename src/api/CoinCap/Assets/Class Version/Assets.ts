import { Assets as AssetsType, History, Markets, FinalAssets } from "../type";
import axios from "axios";

import React from "react";

//import { ConvertAssets, Assets as AssetsType } from "./ParseAssets";

interface Props {
    assets?: FinalAssets.RootObject;
}

interface State {
    assets?: FinalAssets.RootObject;
}

export class Assets extends React.Component<Props, State> {
  //assets?: FinalAssets.RootObject;
  //history: History.RootObject;
  //markets: Markets.RootObject;

  updateCount: number;

  baseUrl = "https://crypto-web-projekti.herokuapp.com/assets.json"; //"https://api.coincap.io/v2"; //"https://api.saarinen.xyz/AssetsExampleData.json";

  constructor(assets?: FinalAssets.RootObject) {
    super({ assets });

    this.update = this.update.bind(this);
    this.getAssets = this.getAssets.bind(this);
    this.parseAssets = this.parseAssets.bind(this);

    this.updateCount = 0;

    this.state = { assets };

    if (assets === undefined) {
      this.update();
    } else {
      //this.assets = assets;
      this.setState({ assets: assets });
    }
  }

  async update() {
    this.updateCount++;
    console.log(`${this.updateCount}. update`);
    await this.getAssets();
  }

  async getAssets(coin?: string) {
    const coins = coin === undefined || coin === "";
    /*const endfix = (coins) ? "" : "/"+coin;
        const url = this.baseUrl; //`${this.baseUrl}/assets${endfix}`;*/
    const url = this.baseUrl; //'http://localhost:3001/assets.json';

    const response = await axios.get(url);
    if (response.status === 200) {
      const data = await response.data;
      console.log(JSON.stringify(data));
      console.log("(200): success");
      await this.parseAssets(data, coins);
    } else {
      console.log(`status (${response.status}): ${response.statusText}`);
    }
  }

  async parseAssets(data: any, coins: boolean) {
    if (coins) {
      try {
        console.log(`data: ${data}`);
        const parsed: AssetsType.RootObject = JSON.parse(JSON.stringify(data));
        console.log("parsed ok");

        const historyObjects = this.getHistoryObjects();
        const newAssets = parsed.data.map((asset) => {
          const rtn: any = asset;
          const history = historyObjects?.find((obj) => obj?.id === asset.id);
          rtn.history = history !== undefined ? history.history : [];
          return rtn;
        });
        console.log("newAssets ok");
        const rtnData: FinalAssets.RootObject = {
          timestamp: parsed.timestamp,
          data: newAssets,
        };
        console.log("rtnData ok");
        console.log(`rtnData: ${rtnData}`);
        //this.assets = rtnData;
        this.setState({ assets: rtnData });
      } catch (e) {
        console.log(`Error while parsing JSON: ${e}`);
      }
    }
  }

  getHistoryObjects() {
    return this.state.assets?.data.map((asset) => {
      if (!(asset.history === undefined || asset.history.length === 0)) {
        return { id: asset.id, history: asset.history };
      } return undefined;
    });
  }

  public getAssetsData() {
    return this.state.assets;
  }

  async getAssetHistory(id: string) {
    const url = "http://localhost:3001/history.json";

    const response = await axios.get(url);
    if (response.status === 200) {
      const data = await response.data;
      console.log(JSON.stringify(data));
      console.log("(200): success");
      return this.parseAssetHistory(data, id);
    } else {
      console.log(`status (${response.status}): ${response.statusText}`);
    }
  }

  parseAssetHistory(data: any, id: string) {
    try {
      console.log(`data: ${data}`);
      const parsed: FinalAssets.History[] = JSON.parse(JSON.stringify(data));
      console.log("parsed ok");

      let assetsData: FinalAssets.Asset[] = this.state.assets !== undefined
        ? this.state.assets.data
        : [];
      for (const item of assetsData) {
        if (item.id === id) {
          item.history = parsed;
          break;
        }
      }
      const timeVal = parsed.pop()?.time;
      this.setState({ assets: { data: assetsData, timestamp: (timeVal !== undefined) ? timeVal : 0 } });
      //assetsData.forEach((x: FinalAssets.Asset) => (!x.id || x.id === id) ? 'MyVAL' : x.id);

      return parsed;
    } catch (e) {
      console.log(`Error while parsing JSON: ${e}`);
    }
  }
}

/*export class Assets {
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

    async update() {
        this.updateCount++;
        console.log(`${this.updateCount}. update`);
        await this.getAssets();
    }

    async getAssets(coin?: string) {
        const coins = coin === undefined || coin === "";
        /*const endfix = (coins) ? "" : "/"+coin;
        const url = this.baseUrl; //`${this.baseUrl}/assets${endfix}`;* /
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

    async getAssetHistory(id: string) {
        const url = 'http://localhost:3001/history.json';

        const response = await axios.get(url);
        if (response.status === 200) {
            const data = await response.data;
            console.log(JSON.stringify(data));
            console.log('(200): success')
            return this.parseAssetHistory(data, id);

        } else { console.log(`status (${response.status}): ${response.statusText}`); }
    }

    parseAssetHistory(data: any, id: string) {
        try {
            console.log(`data: ${data}`);
            const parsed: FinalAssets.History[] = JSON.parse(JSON.stringify(data));
            console.log('parsed ok');

            let assetsData: FinalAssets.Asset[] = (this.assets) ? this.assets.data : [];
            for (const item of assetsData) {
                if (item.id === id) {
                    item.history = parsed;
                    break;
                }
            }

            return parsed;

        } catch (e) {
            console.log(`Error while parsing JSON: ${e}`);
        }
    }

}*/
