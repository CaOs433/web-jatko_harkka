import React from "react";

import { Table, Button } from "react-bootstrap";

import { Assets } from '../api/CoinCap/Assets/Assets';
import { FinalAssets } from "../api/CoinCap/Assets/type";

interface Props {
    assets: FinalAssets.RootObject | undefined;
    updateAssetsData: Function;
}

export default function AssetsScreen(props: Props) {
    /*let data = new Assets();
    let [assets, setAssets] = React.useState<FinalAssets.RootObject>();

    React.useEffect(() => {
        setAssets(props.assets);
    }, [props.assets]);*/

    /*let [data, setData] = React.useState<Assets>(new Assets());
    let [assets, setAssets] = React.useState<FinalAssets.RootObject>();

    React.useEffect(() => {
        console.log('useEffect (data.assets)');
        setAssets(data.assets);
    }, [data.assets]);*/

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

    let arr: string[] = [];
    const getTrElement = (item: FinalAssets.Asset, index: number) => {

        if (index === 0) {
            idCount = 0;
            arr = [];
        } else if (!(item.id === null || item.id === undefined)) {
            idCount++;
            const newItemId = `${idCount}-${index}`;
            if (arr.includes(newItemId)) {
                console.log(`DUBLICATE KEY! - ${newItemId}`);
            }
            arr.push(newItemId);
        } else {
            console.log(`idCount: ${idCount}, return <></>`);
            return <></>;
        }



        return (
            <>
                <tr key={`${idCount}-${index}-asset_list_item-${item.id}`} className="clickable" onClick={() => toggleRow(item.id)} >
                    <td key={`${idCount}-${index}-asset_list_item-${item.id}_sub1`}>{idCount}</td>
                    <td key={`${idCount}-${index}-asset_list_item-${item.id}_sub2`}>{item.name} ({item.symbol})</td>
                    <td key={`${idCount}-${index}-asset_list_item-${item.id}_sub3`}>{roundStrNumber(item.priceUsd)}</td>
                    {getTdElement(item.changePercent24Hr, "%")}
                </tr>
                <tr key={`${idCount}-${index}-asset_list_item-${item.id}-collapse`} className={getCollapse(item.id)}>
                    <td key={`${idCount}-${index}-asset_list_item-${item.id}-collapse-sub1`} colSpan={4}>
                        <div key={`${idCount}-${index}-asset_list_item-${item.id}-collapse-sub1-div`}>Click the row again to hide me</div>
                    </td>
                </tr>
            </>
        );
    }

    return (
        <div style={{backgroundColor: "#ffccffaa"/*, minHeight: "320px"*/}}>
            <h1>Assets</h1>
            <Button onClick={() => props.updateAssetsData()} variant="primary">Update</Button>
            <br/><br/>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Value</th>
                        <th>24h</th>
                    </tr>
                </thead>
                <tbody>
                    { props.assets?.data.map((item: FinalAssets.Asset, index: number) => getTrElement(item, index)) }
                    <tr key="asset_list_bitcoin_placeholder">
                        <td>1</td>
                        <td>Bitcoin</td>
                        <td>60000 $</td>
                        <td>+1.4 %</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
