// Typescript interfaces for data types
import { Assets as AssetsType, History, Markets } from "./type";

// Axios library for fetching data from a server
import axios from "axios";

async function getData<Output>(url: string): Promise<Output | undefined> {
  // Fetch data from the server
  const response = await axios.get(url);
  // Was the request succesfull?
  if (response.status === 200) {
    // Success
    console.log("(200): success");
    // Get the data from response
    const data = await response.data;

    // Try to parse the data into Typescript interface
    try {
      console.log(`data: ${data}`);
      const parsed: Output = JSON.parse(JSON.stringify(data));
      console.log("parsed ok");
      return parsed;

    } catch (e) {
      // Error in the try block
      console.log(`Error while parsing JSON: ${e}`);
    }

  } else {
    // Request wasn't successfull
    console.log(`status (${response.status}): ${response.statusText}`);
    // Return undefined
    return undefined;
  }
}

// Fumction to fetch assets data
export const getAssets = () => getData<AssetsType.RootObject>("https://crypto-web-projekti.herokuapp.com/get/assets");
// Function to fetch history data
export const getHistory = (id?: string) => getData<History.RootObject>("https://crypto-web-projekti.herokuapp.com/get/history/"+id);
// Function to fetch market data
export const getMarkets = (id?: string) => getData<Markets.RootObject>("https://crypto-web-projekti.herokuapp.com/get/markets/"+id);



