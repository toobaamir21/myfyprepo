import React, { useState } from "react";
import { MdMessage } from "react-icons/md";
import { MdClose } from "react-icons/md";
const Chat = () => {
  const [show, setShow] = useState(false);
   const [message, setMessage] = useState(true);
  const Show = () => {
    setShow(true);
    setMessage(false)
  };
  const Hide = () => {
    setShow(false);
    setMessage(true);

  };
  return (
    <div>
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "5px",
            zIndex: "1000",
            background: "white",
            padding: "1vw",
            borderRadius: "10px",
            boxShadow: "2px 2px 5px gray",
            textAlign: "center",
          }}
        >
          <MdMessage
            size={30}
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={Show}
          />
        </div>
      )}

      {show && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            height: "80vh",
            position: "fixed",
            bottom: "10px",
            right: "5px",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              width: "35vw",
              height: "100%",
              background: "lightgray",
              borderRight: "1px solid black",
            }}
          >
            names
          </div>
          <div
            style={{
              width: "70vw",
              height: "100%",
              background: "lightgray",
            }}
          >
            Start a conversation
          </div>
          <div
            style={{
              width: "5vw",
              height: "100%",
              background: "lightgray",
            }}
          >
            <MdClose size={30} style={{ cursor: "pointer" }} onClick={Hide} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
