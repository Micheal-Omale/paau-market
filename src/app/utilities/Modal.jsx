import React, { useContext } from "react";

import { ModalContext } from "../../App";

function Modal(props) {
  const { isModal, setIsModal } = useContext(ModalContext);
  const { content } = props;

  function modalsetTimeOutFn() {
    setIsModal({ ...isModal, open: false, content: "" });
  }
  setTimeout(modalsetTimeOutFn, 4000);

  return (
    <div>
      <p>{content}</p>
    </div>
  );
}

export default Modal;
