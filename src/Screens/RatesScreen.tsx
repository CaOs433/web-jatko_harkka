// React
import React from "react";

// React Bootstrap elements
import { Table, Button } from "react-bootstrap";

// Typescript interfaces for rates data
import { Rates as RatesType } from "../api/CoinCap/Rates/type";

// Function to fetch rates data
import { getRates } from "../api/CoinCap/Rates/Rates";

export default function RatesScreen() {

    // Rates data
    const [rates, setRates] = React.useState<RatesType.RootObject>();

    // Fetch rates data from the server and save it into state
    const updateRatesData = async () => {
        const data = await getRates();
        setRates(data);
    }

    // Fetch rates data from the server on page load
    React.useEffect(() => {
        updateRatesData();
    }, []);

    const getTrElement = (item: RatesType.Rate, index: number) => {
        // Key for tr element
        const trKey = (item.id === null) ? `${index}_null` : `${index}_${item.id}`;
        // Currency name
        const name = item.id.replace(/-/g, ' ').toUpperCase();
        // Currency symbol character (example: € for Euro)
        const symbol = (item.currencySymbol) ? item.currencySymbol : "-";
        // Currency type (Crypto or Fiat)
        const cType = (item.type === "crypto") ? "Crypto" : "Fiat";
        // Color for currency type
        const color = (cType === "Crypto") ? "orange" : "cyan";

        return (
            <tr key={trKey} style={{textShadow: "-1px -1px 1px #BCDBFC33"}} >
                <td>{index}</td>
                <td>{name}</td>
                <td><span style={{color: "#BCDBFC", fontStyle: "italic"}}>{item.symbol}</span></td>
                <td>{symbol}</td>
                <td><span style={{color: color}}>{cType}</span></td>
                <td><span style={{color: (!isNaN(Number(item.rateUsd))) ? "#4C7" : "#F22"}}>{item.rateUsd}</span> $</td>
            </tr>
        );
    }

    // Get update button and last updated date and time string
    const getUpdatedTime = () => {
        // Is the timestamp defined?
        if (rates?.timestamp !== undefined) {
            // Get Date from the timestamp
            const date = new Date(rates.timestamp);

            return (
                <div style={{backgroundColor: "#ffffff99", textAlign: "left", paddingLeft: "12px"}}>
                    <span style={{alignSelf: "left"}}>Last updated: {date.toLocaleString()}</span>
                    <Button style={{margin: "4px"}} onClick={() => updateRatesData()} variant="primary">Update</Button>
                </div>
            );
        }
    }

    return (
        <div style={{backgroundColor: "#ffccffaa"}}>
            {/* Title */}
            <h1 style={{fontWeight: "bolder", textShadow: "-2px -2px 3px #999999aa"}}>Rates</h1>
            <br/><br/>
            {/* Update button and the last updated -info */}
            {getUpdatedTime()}
            {/* Table for rates */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Currency Symbol</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    { rates?.data?.map((item: RatesType.Rate, index: number) => getTrElement(item, index)) }
                    {/*<tr id="example_row">
                        <td>1</td>
                        <td>BITCOIN</td>
                        <td>BTC</td>
                        <td>₿</td>
                        <td>Crypto</td>
                        <td>61491.8340078056006810 $</td>
                    </tr>*/}
                </tbody>
            </Table>
        </div>
    );
}
