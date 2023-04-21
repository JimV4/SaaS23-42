import React from "react";
import MyChartsLogo from "./components/UI/MyChartsLogo";
import ChartItemsList from "./components/Charts/ChartItemsList";
import Container from "./components/UI/Container";

function App() {
  return (
    <React.Fragment>
      <MyChartsLogo />
      <ChartItemsList />
      <Container />
    </React.Fragment>
  );
}

export default App;
