// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS
import "bootstrap/js/src/collapse.js";

// React
import React from "react";

// React Router elements
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

// React Bootstrap elements
import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";

// Function to fetch assets data
import { getAssets } from './api/CoinCap/Assets/Assets';
// Typescript interface for assets data (getAssets() returns this)
import { Assets } from "./api/CoinCap/Assets/type";

// Function to fetch exchanges data
import { getExchanges } from "./api/CoinCap/Exchanges/Exchanges";
// Typescript interface for exchanges data (getExchanges() returns this)
import { Exchanges as ExchangesType } from "./api/CoinCap/Exchanges/type";

// Screens:
import HomeScreen from "./Screens/HomeScreen";
import AssetsScreen from './Screens/AssetsScreen';
import ExchangesScreen from "./Screens/ExchangesScreen";
import RatesScreen from "./Screens/RatesScreen";

function App() {

  // Assets data
  const [assets, setAssets] = React.useState<Assets.RootObject>();

  // Fetch and save the assets data from the server into state
  const updateAssets = async () => {
    // Await the data
    const newData = await getAssets();
    // If data is not undefined, save it into state
    if (newData !== undefined) {
      setAssets(newData);
    }
  };

  // Exchanges data
  const [exchanges, setExchanges] = React.useState<ExchangesType.RootObject>();

  // Fetch and save the exchanges data from the server into state
  const updateExchanges = async () => {
    // Await the data
    const newData = await getExchanges();
    // If data is not undefined, save it into state
    if (newData !== undefined) {
      setExchanges(newData);
    }
  };

  // Update assets and exchanges data on page load
  React.useEffect(() => {
    updateAssets();
    updateExchanges();
  }, []);

  return (
    <div style={styles.body}>
      <main role="main" className="container-fluid" style={styles.main}>
        <Container fluid className="text-center">
          <Row>
            <Col sm={1} />
            {/* Content */}
            <Col sm={10} style={{minWidth: "fit-content"}} >
              {/* Router */}
              <Router>
                {/* Navigation bar */}
                <Navbar className="navbar-inverse" bg="dark" variant="dark" expand="lg" style={styles.header}>
                  <Container style={{position: "relative"}}>
                    {/* Crypto -symbol in navigation bar */}
                    <Navbar.Brand>
                      <Container style={styles.textLogo} id="text-logo">
                        <Row>
                          <Col style={styles.logoSymbol} id="logo-symbol">C</Col>
                          <Col style={styles.logoText} id="logo-text">rypto</Col>
                        </Row>
                      </Container>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* Navigation links (collapsing into list on small screens) */}
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto" style={styles.headerItems}>
                        <NavLink to={"/"} className="nav-link">Home</NavLink>
                        <NavLink to={"/Assets"} className="nav-link">Assets</NavLink>
                        <NavLink to={"/Exchanges"} className="nav-link">Exchanges</NavLink>
                        <NavLink to={"/Rates"} className="nav-link">Rates</NavLink>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
                {/* Routes to pages */}
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/Assets" element={<AssetsScreen assets={assets} updateAssetsData={updateAssets} />} />
                  <Route path="/Exchanges" element={<ExchangesScreen exchanges={exchanges} updateExchangesData={updateExchanges} />} />
                  <Route path="/Rates" element={<RatesScreen />} />
                </Routes>
              </Router>
                {/* Page footer */}
                <footer id="sticky-footer" className="site-footer clearfix py-2 bg-dark text-white-50 mr-auto" style={styles.footer} >
                  <Container className="text-center">
                    <small>Oskari Saarinen &copy; 2021</small>
                  </Container>
                </footer>
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;

// CSS styles
const styles = {
  body: {
    //backgroundColor: "rgba(120, 40, 255, 0.1)",
    height: "100%",
    paddingTop: 20
  },
  main: {
    marginLeft: "0px",
    marginBottom: "40px",
    marginTop: "0px"
  },
  jumbotron: {
    borderTopLeftRadius: "0px", //40px
    borderTopRightRadius: "0px", //40px
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginBottom: "0px"
  },
  footer: {
    //display: "flex",//"block",
    //position: "relative",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    marginTop: "-16px",
    backgroundColor: "rgba(200,200,200,0.2)"
  },
  header: {
    //display: "flex", //"block"
    //position: "relative",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px"
  },
  headerContainer: {
    backgroundColor: "rgba(128, 72, 255, 0.7)",
    marginLeft: "8px"

  },
  textLogo: {
    //float: "left",
    backgroundColor: "rgba(128, 72, 255, 0.9)",
    height: "44px",//"50px", //"66px"
    backgroundWidth: "100%",
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "25px",
    borderBottomRightRadius: "0px",
    paddingLeft: 0,
    paddingRight: "8px"
  },
  logoSymbol: {
    //float: "left",
    width: "44px", /*OS: 56px*/
    height: "44px", /*OS: 56px*/
    lineHeight: "44px", /*OS: 56px*/
    backgroundColor: "#7066ff",
    borderRadius: "100px",
    //textAlign: "center",
    color: "#fff",
    fontSize: "28px",
    fontWeight: 800,
    marginRight: "-12px",//"8px",
    marginTop: 0,//"3px",
    marginBottom: 0,//"3px",
    marginLeft: "8px",
    paddingTop: 0,
    paddingBottom: 0,

    fontFamily: "Poppins, Helvetica, sans-serif"
  },
  logoText: {
    //float: "left",
    lineHeight: "50px",//"50px", /*OS: 56px*/
    fontSize: "20px",
    color: "#fff",
    fontWeight: 600,
    display: "block",
    marginLeft: "-12px",
    marginBottom: "-6px",
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerItems: {
    lineHeight: "50px",
    fontSize: "18px",
    display: "flex",
    //textAlign: "center",
    paddingTop: 0, //"3px",
    paddingBottom: 0, //"3px",
    marginTop: 0,//"3px",
    marginBottom: 0,//"3px",
  },
  heaterItemLink: {
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    height: "50px",
    lineHeight: "50px",
    paddingTop: 0,
    paddingBottom: 0,
  }
}
