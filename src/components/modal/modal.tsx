import React from "react";
import './modal.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onOpenAutorModal, setMessage, onSetDataLoading } from "../reduser/reduser";

interface ModalProps {} 

const Modal: React.FC<ModalProps> = () => {
  const textLang = useSelector((state: RootState) => state.aleksey.textLang); 
  const dispatch = useDispatch(); 
  const message = useSelector((state: RootState) => state.aleksey.message);
  const sendDataLoading = useSelector((state: RootState) => state.aleksey.sendDataLoading);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(onOpenAutorModal()); 
    }
  };

  const handleSetDataLoading = () => {
    if (sendDataLoading) {
      return (
        textLang.sendingDataLoading
      )
    } else {
      return;
    }
  }

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      alert(textLang.noTextMessage);
      return;
    }

    try {
      dispatch(onSetDataLoading());

      const response = await fetch("https://telegrammessage-java.onrender.com/sendMessage", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        alert('Error');
        dispatch(onSetDataLoading());
        return;
      } else {
        alert(textLang.alertTextSuccess);
        dispatch(onSetDataLoading());
      }
    } catch (err) {
      console.log(err);
      alert(textLang.alertTextFail);
      dispatch(onSetDataLoading());
    }
  } 

  return (
    <div className="modal" onClick={handleModalClick}>
    <div className="modalValue">
      <form className="form" onSubmit={sendData}>
        <label className="textToUser"><span className="normalTextToUser">
          {textLang.modalText1}</span> 
        <br/><span className="smallTextToUser">
          {textLang.modalText2}</span></label>
          <label className="textToUserToHelp" htmlFor="">{textLang.modalText3}</label>
        <textarea
          className="textForEmail"
          name="username"
          placeholder={textLang.inputText}
          onChange={(e) => dispatch(setMessage(e.target.value))}
        />
        <div className="dataLoadingText">{handleSetDataLoading()}</div>
        <button className="btnSubmit" type="submit">
        {textLang.submitText}
        </button>
      </form>
    </div>
  </div>
  );
};

export default Modal;