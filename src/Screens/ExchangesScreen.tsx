// React
import React from "react";

// React Bootstrap elements
import { Table, Button, Container, OverlayTrigger, Popover } from "react-bootstrap";

// Typescript interfaces for exchanges data (exchanges data in props will be in ExchangesType.RootObject)
import { Exchanges as ExchangesType } from "../api/CoinCap/Exchanges/type";

// Bootstrap icons
import { CaretRightFill, CaretDownFill, InfoCircle } from 'react-bootstrap-icons';

// Props type of parent parameters
interface Props {
    exchanges: ExchangesType.RootObject | undefined;
    updateExchangesData: Function;
}

export default function ExchangesScreen(props: Props) {

    // List of visible detail rows
    const [notCollapsedRows, setNotCollapsedRows] = React.useState<Array<string>>([]);

    // Cast string into number and round it into 2 decimals
    const roundStrNumber = (str: string) => {
        if (str?.length > 0 && str[0] === "0") {
            return String(parseFloat(str));
        } return String(Math.round(parseFloat(str) * 100) / 100);
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

    // Get collapse class to hide the row if not in the expanded list
    const getCollapse = (id: string) => (notCollapsedRows.includes(id)) ? "" : "collapse";

    // Get column element with colored percentage value
    const getTdElement = (str: string, endStr?: string) => {
        // Percentage value from string into number
        const val = Math.round(parseFloat(str) * 100) / 100;
        // Color for the value
        const color = (val === 0) ? "" : ((val < 0 || Number.isNaN(val)) ? "red" : "green");

        return (
            <td style={{margin: 0, padding: 0}}>
                <div style={{backgroundColor: "#212529", margin: 0, padding: 0, textAlign: "center", alignItems: "center"}}>
                    <span style={{color: color}}>{String(val)}</span>{(endStr) ? " " + endStr : ""}
                </div>
            </td>
        );
    }

    // Get main row element
    const getTrElement = (item: ExchangesType.Datum, index: number, idCount: number) => {
        // Key for tr element
        const trKey = (item.exchangeId === null) ? `${index}_null` : `${index}_${item.exchangeId}`;
        // Volume in USD value
        const volumeUsd = roundStrNumber(item.volumeUsd);
        // Color for "volumeUsd" (red if NaN, else green)
        const color = (!isNaN(Number(volumeUsd))) ? "#4C7" : "#F22";
        // Arrow icon (arrow right when detail row hidden and arrow down when expanded)
        const caret = (notCollapsedRows.includes(item.exchangeId)) ? <CaretDownFill /> : <CaretRightFill />;

        return (
            <tr key={trKey} className="clickable" onClick={() => toggleRow(item.exchangeId)} >
                <td>{idCount}</td>
                <td>{item.name}</td>
                <td><span style={{color: color}}>{volumeUsd}</span> $</td>
                {getTdElement(item.percentTotalVolume, "%")}
                <td>{caret}</td>
            </tr>
        );
    }

    // Get detail row element
    const getTrElementDetail = (item: ExchangesType.Datum, index: number) => {
        // Key for tr element
        const trKey = (item.exchangeId === null) ? `${index}_null_collapse` : `${index}_${item.exchangeId}_collapse`;
        // Will the row be visible
        const hidden = getCollapse(item.exchangeId);
        // Data updated value
        const updated = new Date(item.updated);
        // Total volume percentage
        const totalVolume = Number(item.percentTotalVolume).toFixed(3).replace(/\.0+$/,'');
        // Volume in USD value
        const volume = Number(item.volumeUsd).toFixed(2).replace(/\.0+$/,'');

        return (
            <tr key={trKey} className={hidden}>
                <td colSpan={5}>
                    <Container>
                        <h3>{item.name}</h3>
                        <ul style={{textAlign: "left"}}>
                            <li>Rank: {item.rank}</li>
                            <li>Total Volume: {totalVolume} %</li>
                            <li>Volume: {volume} $</li>
                            <li>Trading Pairs: {item.tradingPairs} pcs</li>
                            <li>Website: <a href={item.exchangeUrl} rel="noreferrer" target="_blank">{item.exchangeUrl}</a></li>
                            <li>Updated: {updated.toLocaleString()}</li>
                        </ul>
                        Click the row again to hide me
                    </Container>
                </td>
            </tr>
        );
    }

    // Returns table rows made from Exchanges data
    const getRows = () => {
        // Rows array
        let rows: JSX.Element[] = [];
        // Value for # column in the table
        let idCount = 0;
        // Is exchanges undefined?
        if (props.exchanges === undefined) {
            return rows;
        }
        // Map through exchanges
        props.exchanges?.data.forEach((item: ExchangesType.Datum, index: number) => {
            // If exchange id is not null, add into rows array
            if (item.exchangeId !== null) {
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
        if (props.exchanges?.timestamp !== undefined) {
            // Get Date from the timestamp
            const date = new Date(props.exchanges.timestamp)

            return (
                <div style={{backgroundColor: "#ffffff99", textAlign: "left", paddingLeft: "12px"}}>
                    <span style={{alignSelf: "left"}}>Last updated: {date.toLocaleString()}</span>
                    <Button style={{margin: "4px"}} onClick={() => props.updateExchangesData()} variant="primary">Update</Button>
                </div>
            );
        }
    }

    return (
        <div style={{backgroundColor: "#ffccffaa"}}>
            {/* Title */}
            <h1 style={{fontWeight: "bolder", textShadow: "-2px -2px 3px #999999aa"}}>Exchanges</h1>
            <br/><br/>
            {/* Update button and the last updated -info */}
            {getUpdatedTime()}
            {/* Table for exchanges */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Volume</th>
                        <th colSpan={1}>Total Volume</th>
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
                        <td>Binance</td>
                        <td>27770603778.97 $</td>
                        <td>39.9 %</td>
                        <td><CaretRightFill /></td>
                    </tr>*/}
                </tbody>
            </Table>
        </div>
    );
}
