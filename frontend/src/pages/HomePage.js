import ChartItemsList from "../components/Charts/ChartItemsList";
import Container from "../components/UI/Container";
import { useState } from "react";
import ConfirmLogin from "../components/Login/ConfirmLogin";

function HomePage() {
  return (
    <>
      <ChartItemsList />
      <Container />
    </>
  );
}

export default HomePage;
