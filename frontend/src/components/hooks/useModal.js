import { useState, useCallback } from "react";

const useModal = () => {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = useCallback(() => {
    setModalIsShown(true);
  }, []);

  const hideModalHandler = useCallback(() => {
    setModalIsShown(false);
  }, []);

  return { modalIsShown, showModalHandler, hideModalHandler };
};

export default useModal;
