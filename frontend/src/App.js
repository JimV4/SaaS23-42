import React, { useState } from "react";
import MyChartsLogo from "./components/UI/MyChartsLogo";
import ChartItemsList from "./components/Charts/ChartItemsList";
import Container from "./components/UI/Container";
import ConfrimLoginContext from "./components/Context/confirm-login-context";
import ConfirmLogin from "./components/Login/ConfirmLogin";

function App() {
  const [confirmLogin, setConfirmLogin] = useState(false);

  function handleConfirmLogin() {
    setConfirmLogin(!confirmLogin);
  }

  return (
    <ConfrimLoginContext.Provider
      value={{
        confirmLogin: confirmLogin,
        setConfirmLogin: handleConfirmLogin,
      }}
    >
      <MyChartsLogo />
      {!confirmLogin && <ChartItemsList />}
      {!confirmLogin && <Container />}
      {confirmLogin && <ConfirmLogin />}
    </ConfrimLoginContext.Provider>
  );
}

export default App;
