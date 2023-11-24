// SendMessage.js
import React, { useState } from "react";
import { db } from "./Firebase1";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Form, Button, FormControl } from "react-bootstrap";

const SendMessage = ({ scroll, to, from }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    await addDoc(collection(db, "messages"), {
      message: message,
      createdAt: serverTimestamp(),
      to: to,
      from: from,
    });

    setMessage("");

    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <Form
      onSubmit={(event) => sendMessage(event)}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        borderRadius: "8px",
        marginBottom: "1rem",
        padding: "0.5rem",
        background: "#f2f2f2",
      }}
    >
      <FormControl
        style={{ flexGrow: 1, marginRight: "0.5rem" }}
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" variant="primary">
        Send
      </Button>
    </Form>
  );
};

export default SendMessage;
