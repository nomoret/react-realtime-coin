import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";
import SideBar from "./components/SideBar";
import CanvasPage from "./pages/CanvasPage";

const style: React.CSSProperties = {
  flex: 1,
  overflow: "auto",
  border: "solid 1px #ccc",
  borderRadius: "4px",
};

interface Props {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flex: 1, margin: "10px", height: "80vh" }}>
        <SideBar />
        <main style={style}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/chart" exact component={ChartPage} />
            <Route path="/canvas" exact component={CanvasPage} />
            <Redirect path="*" to="/" />
          </Switch>
        </main>
      </div>
      <footer style={{ textAlign: "center" }}>
        <p>Copyright © 2020 nomoret project</p>
      </footer>
    </BrowserRouter>
  );
};

export default App;
