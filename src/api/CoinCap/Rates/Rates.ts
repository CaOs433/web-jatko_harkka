// Typescript interfaces for data types
import { Rates } from "./type";

// Axios library for fetching data from a server
import axios from "axios";

export async function getRates(coin?: string) {
  // URL
  const url = `https://crypto-web-projekti.herokuapp.com/get/rates/${
    coin !== undefined ? coin : ""
  }`;
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
      const parsed: Rates.RootObject = JSON.parse(JSON.stringify(data));
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
