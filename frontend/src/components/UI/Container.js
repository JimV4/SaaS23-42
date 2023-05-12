import classes from "./Container.module.css";
import Instructions from "./Instructions";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import UploadError from "./UploadError";
import useModal from "../hooks/useModal";

import jwt_decode from "jwt-decode";

function Container() {
  const navigate = useNavigate();
  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  async function loginHandler(UserInfo) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/auth/google/callback",
        {
          method: "POST",
          body: JSON.stringify({
            // clientId: UserInfo.clientId,
            email: UserInfo.email,
            name: UserInfo.name,
          }), // takes a javascript object and converts it to json
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const googleResponse = await response.json();

      if (googleResponse.message === "Please verify your login!") {
        localStorage.setItem("userID", googleResponse.userID);
        navigate("/login");
      } else if (
        googleResponse.message === "You were successfully logged in!"
      ) {
        localStorage.setItem("token", googleResponse.token);
        console.log(localStorage.getItem("token"));
        navigate("/my-account");
      }
    } catch (error) {
      showModalHandler();
    }
  }

  return (
    <>
      {modalIsShown && (
        <UploadError
          message="Something went wrong!"
          onClose={hideModalHandler}
        />
      )}
      {
        <div className={classes.container}>
          <Instructions />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              let decoded = jwt_decode(credentialResponse.credential);
              const UserInfo = {
                clientId: credentialResponse.clientId,
                email: decoded.email,
                name: decoded.name,
              };
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
      }
    </>
  );
}

export default Container;
