import classes from "./Container.module.css";
import Instructions from "./Instructions";
import GoogleButton from "./GoogleButton";
import { GoogleLogin } from "@react-oauth/google";

import jwt_decode from "jwt-decode";

function Container() {
  async function loginHandler(UserInfo) {
    const response = await fetch(
      "127.0.0.1:8000/api/myCharts/auth/google/callback",
      {
        method: "POST",
        body: JSON.stringify(UserInfo), // takes a javascript object and converts it to json
        header: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = await response.json();
    console.log(token);
  }

  return (
    <div className={classes.container}>
      <Instructions />
      {/* <GoogleButton /> */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          let decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
          const UserInfo = {
            cliendId: credentialResponse.clientId,
            email: decoded.email,
            name: decoded.name,
          };
          console.log(UserInfo);
          loginHandler(UserInfo);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <a href="" className={classes.about}>
        about
      </a>
    </div>
  );
}

export default Container;
