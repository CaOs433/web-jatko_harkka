import { Exchanges as ExchangesType } from "../type";
import axios from "axios";

export class Exchanges {
    exchanges?: ExchangesType.RootObject;

    updateCount: number;

    baseUrl = "https://crypto-web-projekti.herokuapp.com/exchanges.json"; //"https://api.coincap.io/v2"; //"https://api.saarinen.xyz/AssetsExampleData.json";

    constructor(exchanges?: ExchangesType.RootObject) {
        this.update = this.update.bind(this);
        this.getExchanges = this.getExchanges.bind(this);
        this.parseExchanges = this.parseExchanges.bind(this);

        this.updateCount = 0;

        if (exchanges === undefined) {
            this.update();
        } else {
            this.exchanges = exchanges;
        }
    }

    async update() {
        this.updateCount++;
        console.log(`${this.updateCount}. update`);
        await this.getExchanges();
    }

    async getExchanges() {
        const url = this.baseUrl;//'http://localhost:3001/exchanges.json';

        const response = await axios.get(url);
        if (response.status === 200) {
            const data = await response.data;
            //console.log(JSON.stringify(data));
            console.log('(200): success')
            this.parseExchanges(data);

        } else { console.log(`status (${response.status}): ${response.statusText}`); }
    }

    parseExchanges(data: any) {
        try {
            console.log(`data: ${data}`);
            const parsed: ExchangesType.RootObject = JSON.parse(JSON.stringify(data));
            console.log('parsed ok');
            this.exchanges = parsed;

        } catch (e) {
            console.log(`Error while parsing JSON: ${e}`);
        }
    }

}