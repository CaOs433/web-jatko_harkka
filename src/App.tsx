import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";

import React from "react";

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import { Navbar, Container, Row, Col, Nav/*, NavLink*/ } from "react-bootstrap";

import { Assets } from './api/CoinCap/Assets/Assets';
import { FinalAssets } from "./api/CoinCap/Assets/type";

import { Exchanges } from "./api/CoinCap/Exchanges/Exchanges";
import { Exchanges as ExchangesType } from "./api/CoinCap/Exchanges/type";

import HomeScreen from "./Screens/HomeScreen";
import AssetsScreen from './Screens/AssetsScreen';
import HistoryScreen from "./Screens/HistoryScreen";
import MarketsScreen from "./Screens/MarketsScreen";
import ExchangesScreen from "./Screens/ExchangesScreen";

//import headerBgColor from "./bg_128-72-255-70.png";

function App() {
  /*let data = new Assets();
  let [assets, setAssets] = React.useState<FinalAssets.RootObject>();

  React.useEffect(() => {
      setAssets(data.assets);
  }, [data.assets])*/

  let [data, setData] = React.useState<Assets>(new Assets());
  let [assets, setAssets] = React.useState<FinalAssets.RootObject>();

  const updateAssets = () => setData(new Assets(data.assets));

  let [exchangesData, setExchangesData] = React.useState<Exchanges>(new Exchanges());
  let [exchanges, setExchanges] = React.useState<ExchangesType.RootObject>();

  const updateExchanges = () => setExchangesData(new Exchanges(exchangesData.exchanges));

  React.useEffect(() => {
    console.log('useEffect (data.assets)');
    setAssets(data.assets);
  }, [data.assets]);

  React.useEffect(() => {
    console.log('useEffect (exchangesData.exchanges)');
    setExchanges(exchangesData.exchanges);
  }, [exchangesData.exchanges]);

  return (
    <div style={styles.body}>
      <main role="main" className="container-fluid" style={styles.main}>
        <Container fluid className="text-center">
          <Row>
            <Col sm={1} />
            <Col sm={10} >
              <Router>
                <Navbar className="navbar-inverse" bg="dark" variant="dark" expand="lg" style={styles.header}>
                  {/*<div style={
                    {
                      //backgroundColor: "rgba(128, 72, 255, 0.7)",
                      //backgroundImage: `url(${headerBgColor})`,
                      //backgroundRepeat: "repeat",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      margin: 0,
                      paddingTop: "13px",
                      paddingLeft: 0,//"20px",
                      paddingBottom: "13px",
                      paddingRight: 0,//"20px",

                      /*borderTopLeftRadius: "25px",
                      borderTopRightRadius: "0px",
                      borderBottomLeftRadius: "25px",
                      borderBottomRightRadius: "0px",* /
                    }
                  } >
                    <div style={
                      {
                        backgroundColor: "rgba(128, 72, 255, 0.7)",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        /*borderTopLeftRadius: "25px",
                        borderTopRightRadius: "0px",
                        borderBottomLeftRadius: "25px",
                        borderBottomRightRadius: "0px",* /
                        //margin: 0
                      }
                    }/>
                  </div>*/}
                  <Container style={{position: "relative"}}>
                    <Navbar.Brand>
                      <Container style={styles.textLogo} id="text-logo">
                        <Row>
                          <Col style={styles.logoSymbol} id="logo-symbol">C</Col>
                          <Col style={styles.logoText} id="logo-text">rypto</Col>
                        </Row>
                      </Container>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto" style={styles.headerItems}>
                        <NavLink to={"/"} className="nav-link">Home</NavLink>
                        <NavLink to={"/Assets"} className="nav-link">Assets</NavLink>
                        <NavLink to={"/History"} className="nav-link">History</NavLink>
                        <NavLink to={"/Markets"} className="nav-link">Markets</NavLink>
                        <NavLink to={"/Exchanges"} className="nav-link">Exchanges</NavLink>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/Assets" element={<AssetsScreen assets={assets} updateAssetsData={updateAssets/*data.update*/} />} />
                  <Route path="/History" element={<HistoryScreen />} />
                  <Route path="/Markets" element={<MarketsScreen />} />
                  <Route path="/Exchanges" element={<ExchangesScreen exchanges={exchanges} updateExchangesData={updateExchanges/*exchangesData.update*/} />} />
                </Routes>

              </Router>
                  <footer id="sticky-footer" className="site-footer clearfix py-2 bg-dark text-white-50 mr-auto" style={styles.footer} > {/*"py-2 bg-dark text-white-50"*/}
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

  return (
    <div className="App">

      <button onClick={data.update}>Update</button>

      <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Crypto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/"} className="nav-link">HomeView</NavLink>
              <NavLink to={"/Assets"} className="nav-link">Assets</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Assets" element={<AssetsScreen assets={assets} updateAssetsData={data.update} />}/>
      </Routes>

    </Router>

    </div>
  );
}

export default App;

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
/*
<BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}>
            <Route index element={<HomeScreen />} />
            <Route path="Assets" element={<AssetsScreen />}>
              {/*<Route path=":teamId" element={<HomeScreen />} />
              <Route path="new" element={<HomeScreen />} />
              <Route index element={<HomeScreen />} />* /}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      */