
export default function HomeScreen() {

    return (
        <div style={{backgroundColor: "#ffccffaa", minHeight: "320px"}}>
            {/* Title */}
            <h1 style={{fontWeight: "bolder", textShadow: "-2px -2px 3px #999999aa"}}>Home</h1>
            {/* Greeting */}
            <h2>Welcome to my website!</h2>
            {/* Site map */}
            <div style={{color: "#fafaff", backgroundColor: "#333333aa", padding: "12px", borderRadius: "12px", width: "fit-content", margin: "auto"}}>
                <h3>Site map</h3>
                <ul style={{textAlign: "left"}}>
                    <li><span style={{fontWeight: "bolder"}}>Assets</span>: List of cryptocurrencies and their details like value, market cap, etc.</li>
                    <li><span style={{fontWeight: "bolder"}}>Exchanges</span>: List of crypto currency exchanges and some statics of them</li>
                    <li><span style={{fontWeight: "bolder"}}>Rates</span>: List of crypto- and fiat currency rates against USD</li>
                </ul>
            </div>
        </div>
    );
}
