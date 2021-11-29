// React
import React from "react";

// React echarts -chart library
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

// Typescript interfaces
import { Assets, History } from "../api/CoinCap/Assets/type";

// Function to fetch history data from the server
import { getHistory } from "../api/CoinCap/Assets/Assets";

// Register theme object for the echarts
echarts.registerTheme('my_theme', {
    backgroundColor: '#f4ccffee', //#f4ccff
});

// Interface for props
interface Props {
    asset: Assets.Asset;
    width?: number | string;
    height?: number | string;
}

// Default values for props
const defaultProps = {
    width: "600px",
    height: "320px"
}

export default function AssetHistory(propsParameters: Props) {
    // Props from passed and default values
    const props = Object.assign(defaultProps, propsParameters);

    // State for history data
    const [historyData, setHistoryData] = React.useState<History.RootObject>();

    // Get chart options (styles and data)
    const getOptions = (data: History.RootObject) => {
        // Array for chart values
        let dataArr: (number | Date)[][] = [];
        // Loop through the data
        data.data.forEach((val, i) => {
            // Date from item
            const date = new Date(val.time);
            // Date and value into the array
            dataArr.push([date, Number(val.priceUsd)]);
        });

        return {
            title: {
                text: 'History',
                left: 10
            },
            toolbox: {
                feature: {
                    saveAsImage: { pixelRatio: 2 }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: { bottom: 90 },
            dataZoom: [{ type: 'inside' }, { type: 'slider' }],
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            yAxis: { type: 'value' },
            series: [{
                name: props.asset.name,
                data: dataArr,
                type: 'line',
                smooth: false,
                symbol: 'none',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }
                    ])
                },
            }]
        };
    }

    // Function to fetch data from the server and because it uses props value, we use React.useCallback¨
    // with props value in the dependencies to make sure it doesn't try to make changes into the component
    // after its been closed
    const getAndSetHistory = React.useCallback(() => {
        // Fetch the history data
        async function fetchHistory() {
            const data = await getHistory(props.asset.id);
            setHistoryData(data);
        }

        fetchHistory();
    }, [props.asset.id]);

    // Update the data on page load
    // We need to include the function in the dependencies, because it uses a props value
    React.useEffect(() => {
        getAndSetHistory();
    }, [getAndSetHistory]);

    return (
        <div className="col-sm-5" id="chart" style={{ width: props.width, height: props.height}}>
            <ReactEcharts
                option={(historyData) ? getOptions(historyData) : {}}
                className='echarts-for-echarts'
                theme='my_theme' />
        </div>
    );
}
