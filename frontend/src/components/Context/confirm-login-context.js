import React, { useState } from "react";

const ConfrimLoginContext = React.createContext({
  confirmLogin: false,
  setConfirmLogin: () => {},
});

/* export function ConfirmLoginProvider(props) {
  const [confirmLogin, setConfirmLogin] = useState(false);

  function confirmLoginHandler() {
    setConfirmLogin(!confirmLogin);
  }

  const confirmLoginContext = {
    confirmLogin: confirmLogin,
    setConfirmLogin: setConfirmLogin,
  };

  return (
    <ConfrimLoginContext.Provider value={confirmLoginContext}>
      {props.children}
    </ConfrimLoginContext.Provider>
  );
} */

export default ConfrimLoginContext;
