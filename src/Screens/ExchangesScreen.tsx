import React from "react";

import { Table, Button } from "react-bootstrap";

import { Exchanges as ExchangesType } from "../api/CoinCap/Exchanges/type";

interface Props {
    exchanges: ExchangesType.RootObject | undefined;
    updateExchangesData: Function;
}

export default function ExchangesScreen(props: Props) {

    let [notCollapsedRows, setNotCollapsedRows] = React.useState<Array<string>>([]);

    let idCount = 0;

    const roundStrNumber = (str: string) => {
        if (str?.length > 0 && str[0] === "0") {
            return parseFloat(str);
        } return Math.round(parseFloat(str) * 100) / 100;
    }

    const toggleRow = (row: string) => {
        let rows: string[] = notCollapsedRows;
        if (rows.includes(row)) {
            setNotCollapsedRows(rows.filter(item => item !== row));
        } else {
            setNotCollapsedRows([...notCollapsedRows, row]);
        }
    }

    const getCollapse = (id: string) => (notCollapsedRows.includes(id)) ? "" : "collapse";

    const getTdElement = (str: string, endStr?: string) => {
        const val = Math.round(parseFloat(str) * 100) / 100;
        const color = (val === 0) ? "" : ((val < 0) ? "red" : "green");

        return (
            <td style={{margin: 0, padding: 0}}>
                <div style={{backgroundColor: "#212529", margin: 0, padding: 0, textAlign: "center", alignItems: "center"}}>
                    <span style={{color: color}}>{val}</span>{(endStr) ? " " + endStr : ""}
                </div>
            </td>
        );
    }

    const getTrElement = (item: ExchangesType.Datum, index: number) => {
        /*
        exchangeId: string;
        name: string;
        rank: string;
        percentTotalVolume: string;
        volumeUsd: string;
        tradingPairs: string;
        socket?: boolean;
        exchangeUrl: string;
        updated: any;
        */

        if (index === 0) {
            idCount = 0;
        } else if (!(item.exchangeId === null || item.exchangeId === undefined)) {
            idCount++;
        } else {
            console.log(`idCount: ${idCount}, return <></>`);
            return <></>;
        }

        return (
            <>
                <tr key={index} className="clickable" onClick={() => toggleRow(item.exchangeId)} >
                    <td>{idCount}</td>
                    <td>{item.name}</td>
                    <td>{roundStrNumber(item.volumeUsd)} $</td>
                    {getTdElement(item.percentTotalVolume, "%")}
                </tr>
                <tr key={`${index}-collapse`} className={getCollapse(item.exchangeId)}>
                    <td colSpan={4}>
                        <div>Click the row again to hide me</div>
                    </td>
                </tr>
            </>
        );
    }

    return (
        <div style={{backgroundColor: "#ffccffaa"}}>
            <h1>Exchanges</h1>
            <Button onClick={() => props.updateExchangesData()} variant="primary">Update</Button>
            <br/><br/>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Volume</th>
                        <th>Total Volume</th>
                    </tr>
                </thead>
                <tbody>
                    { props.exchanges?.data.map((item: ExchangesType.Datum, index: number) => getTrElement(item, index)) }
                    <tr key="bitcoin_placeholder">
                        <td>1</td>
                        <td>Binance</td>
                        <td>27770603778.97 $</td>
                        <td>39.9 %</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
