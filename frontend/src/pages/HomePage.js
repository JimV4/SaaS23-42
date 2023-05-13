import ChartItemsList from "../components/Charts/ChartItemsList";
import Container from "../components/UI/Container";
import { useState } from "react";
import ConfirmLogin from "../components/Login/ConfirmLogin";

/* function HomePage() {
  const [confirmLogin, setConfirmLogin] = useState(false);

  function handleConfirmLogin() {
    setConfirmLogin(true);
  }
  return (
    <>
      {!confirmLogin && <ChartItemsList />}
      {!confirmLogin && <Container onChange={handleConfirmLogin} />}
      {confirmLogin && <ConfirmLogin />}
    </>
  );
} */

function HomePage() {
  return (
    <>
      <ChartItemsList />
      <Container />
    </>
  );
}

export default HomePage;
