import ChartItemsList from "../components/Charts/ChartItemsList";
import Container from "../components/UI/Container";
import { useState } from "react";
import ConfirmLogin from "../components/Login/ConfirmLogin";
import axios from "axios";

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

async function letssee() {
  const myurl = process.env.REACT_APP_URL;
  console.log(myurl);
  try {
    console.log("here");

    const response = await axios.get(`${myurl}`);
    console.log("here");
    console.log(response);
    const jsonresponse = await response.json();
    console.log(jsonresponse);
  } catch (error) {
    console.log("error");
  }
}

function HomePage() {
  return (
    <>
      <button onClick={letssee}>click here!</button>
      <ChartItemsList />
      <Container />
    </>
  );
}

export default HomePage;
