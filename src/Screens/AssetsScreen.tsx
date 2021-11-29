// React
import React from "react";

// React Bootstrap elements
import { Table, Button, Container, Col, Row, OverlayTrigger, Popover } from "react-bootstrap";

// Typescript interfaces for assets data (assets data in props will be in Assets.RootObject)
import { Assets } from "../api/CoinCap/Assets/type";

// Charts component to show currency value history
import AssetHistory from '../Components/AssetHistory';

// Bootstrap icons
import { CaretRightFill, CaretDownFill, InfoCircle } from 'react-bootstrap-icons';

// Props type of parent parameters
interface Props {
    assets: Assets.RootObject | undefined;
    updateAssetsData: Function;
}

export default function AssetsScreen(props: Props) {

    // List of visible detail rows
    const [notCollapsedRows, setNotCollapsedRows] = React.useState<Array<string>>([]);

    // Cast string into number and round it into 2 decimals
    const roundStrNumber = (str: string) => {
        if (str?.length > 0 && str[0] === "0") {
            return parseFloat(str);
        } return Math.round(parseFloat(str) * 100) / 100;
    }

    // Toggle detail row visiblity
    const toggleRow = (row: string) => {
        // Get the visible rows from state
        const rows: string[] = notCollapsedRows;
        // Is the row visible?
        if (rows.includes(row)) {
            // Remove it from the state and it will be collapsed on render
            setNotCollapsedRows(rows.filter(item => item !== row));
        } else {
            // Add it into the state and it will be expanded on render
            setNotCollapsedRows([...notCollapsedRows, row]);
        }
    }

    // Get detail row content
    const getDetailUI = (asset: Assets.Asset) => {
        // Supply value
        const supply = asset.supply?.replace(/\.0+$/,'');
        // Max. supply value
        const maxSupply = asset.maxSupply?.replace(/\.0+$/,'');
        // Market cap value
        const marketCap = Number(asset.marketCapUsd).toFixed(2).replace(/\.0+$/,'');
        // Last 24h volume in USD -value
        const volumeUsd24Hr = Number(asset.volumeUsd24Hr).toFixed(2).replace(/\.0+$/,'');
        // Price value
        const price = asset.priceUsd?.replace(/\.0+$/,'');
        // Last 24h value change percentage value
        const changePercent24Hr = Math.round(parseFloat((asset.changePercent24Hr !== undefined) ? asset.changePercent24Hr : "0") * 100) / 100;
        // Color for "changePercent24Hr" text (red if negative, green if positive and not set if 0)
        const color = (changePercent24Hr === 0) ? "" : ((changePercent24Hr < 0) ? "red" : "green");
        // Blockchain explorer link text
        const explorer = asset.explorer?.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im);

        return (
            <div >
                <h3 style={{textShadow: "-1px -1px 2px #BCDBFC99"}}>{asset.name} ({asset.symbol})</h3>
                <ul style={{textAlign: "left", backgroundColor: "#212529", borderRadius: "12px", paddingTop: "8px", paddingBottom: "8px"}}>
                    <li>Rank: {asset.rank}</li>
                    <li>Supply: {supply}</li>
                    <li>Max. Supply: {maxSupply}</li>
                    <li>Market cap: {marketCap} $</li>
                    <li>Last 24H Volume: {volumeUsd24Hr} $</li>
                    <li>Price: {price} $</li>
                    <li>Last 24H Change: <span style={{ color: color }}>{changePercent24Hr}</span> %</li>
                    <li>Explorer: <a href={asset.explorer} rel="noreferrer" target="_blank">{explorer}</a></li>
                </ul>
            </div>
        );
    }

    // Get collapse class to hide the row if not in the expanded list
    const getCollapse = (id: string) => (notCollapsedRows.includes(id)) ? "" : "collapse";

    // Get column element with colored percentage value
    const getTdElement = (str: string, endStr?: string) => {
        // Percentage value from string into number
        const val = Math.round(parseFloat(str) * 100) / 100;
        // Color for the value
        const color = (val === 0) ? "" : ((val < 0) ? "red" : "green");

        return (
            <td style={{margin: 0, padding: 0}}>
                <div style={{backgroundColor: "#212529", margin: 0, padding: 0, textAlign: "center", alignItems: "center"}}>
                    <span style={{color: color}}>{val}</span>{(endStr) ? " " + endStr : ""}
                </div>
            </td>
        );
    }

    // Get main row element
    const getTrElement = (item: Assets.Asset, index: number, idCount: number) => {
        // Key for tr element
        const trKey = (item.id === null) ? `${index}_null` : `${index}_${item.id}`;
        // Coin symbol
        const symbol = <span style={{color: "#BCDBFC", fontStyle: "italic"}}>{item.symbol}</span>;
        // USD price value in number
        const priceUsdVal = roundStrNumber(item.priceUsd ? item.priceUsd : "");
        // USD price string with color
        const priceUsd = <span style={{color: (!isNaN(priceUsdVal)) ? "#4C7" : "#F22"}}>{priceUsdVal}</span>

        return (
            <tr key={trKey} className="clickable" onClick={() => toggleRow(item.id ? item.id : "")} >
                <td>{idCount}</td>
                <td style={{textShadow: "-1px -1px 1px #BCDBFC33"}}>{item.name} ({symbol})</td>
                <td style={{textAlign: "left", paddingLeft: "20px"}}>{priceUsd} $</td>
                {getTdElement(item.changePercent24Hr ? item.changePercent24Hr : "", "%")}
                <td>{(notCollapsedRows.includes(item.id)) ? <CaretDownFill /> : <CaretRightFill />}</td>
            </tr>
        );
    }

    // Get detail row element
    const getTrElementDetail = (item: Assets.Asset, index: number) => {
        // Key for tr element
        const trKey = (item.id === null) ? `${index}_null_collapse` : `${index}_${item.id}_collapse`;
        // Will the row be visible
        const hidden = getCollapse(item.id);
        // Get chart view with history data, if the row is visible
        const chartView = (hidden !== "collapse") ? <AssetHistory asset={item} /> : <></>;

        return (
            <tr key={trKey} className={hidden}>
                <td colSpan={5}>
                    <Container>
                        <Row>
                            <Col>{chartView}</Col>
                            <Col>{getDetailUI(item)}</Col>
                        </Row>

                        Click the row again to hide me
                    </Container>
                </td>
            </tr>
        );
    }

    // Get main and detail rows
    const getRows = () => {
        // Rows array
        let rows: JSX.Element[] = [];
        // Value for # column in the table
        let idCount = 0;
        // Is assets undefined?
        if (props.assets === undefined) {
            return rows;
        }
        // Map through assets
        props.assets?.data.forEach((item: Assets.Asset, index: number) => {
            // If asset id is not null, add into rows array
            if (item.id !== null) {
                // New main row
                rows.push(getTrElement(item, index, idCount));
                // New detail row (hidden until main row clicked)
                rows.push(getTrElementDetail(item, index));
                // Value for the next row
                idCount++;
            }
        });
        // Return rows
        return rows;
    }

    // Get update button and last updated date and time string
    const getUpdatedTime = () => {
        // Is the timestamp defined?
        if (props.assets?.timestamp !== undefined) {
            // Get Date from the timestamp
            const date = new Date(props.assets.timestamp)

            return (
                <div style={{backgroundColor: "#ffffff99", textAlign: "left", paddingLeft: "12px"}}>
                    <span style={{alignSelf: "left"}}>Last updated: {date.toLocaleString()}</span>
                    <Button style={{margin: "4px"}} onClick={() => props.updateAssetsData()} variant="primary">Update</Button>
                </div>
            );
        }
    }

    return (
        <div style={{backgroundColor: "#ffccffaa"}}>
            {/* Title */}
            <h1 style={{fontWeight: "bolder", textShadow: "-2px -2px 3px #999999aa"}}>Assets</h1>
            <br/><br/>
            {/* Update button and the last updated -info */}
            {getUpdatedTime()}
            {/* Table for assets */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Value</th>
                        <th colSpan={1}>24h</th>
                        <th>
                            <OverlayTrigger
                                trigger="click"
                                placement="top"
                                overlay={
                                    <Popover id={`popover-positioned-right`}>
                                        <Popover.Header as="h3">Table</Popover.Header>
                                        <Popover.Body>Click table row for details</Popover.Body>
                                    </Popover>
                                }
                            >
                                <InfoCircle/>
                            </OverlayTrigger>{' '}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { getRows() }
                    {/*<tr id="example_row">
                        <td>1</td>
                        <td>Bitcoin</td>
                        <td>60000 $</td>
                        <td>+1.4 %</td>
                        <td></td>
                    </tr>*/}
                </tbody>
            </Table>
        </div>
    );
}
