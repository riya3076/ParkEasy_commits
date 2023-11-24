import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Message = ({ message, from }) => {
  const currentUser = "admin123";
  const isCurrentUser = from === currentUser;

  return (
    <Card
      style={{
        borderRadius: isCurrentUser ? "20px 20px 0 20px" : "20px 20px 20px 0",
        padding: "0.5rem",
        background: isCurrentUser ? "#fff" : "#348e49",
        color: isCurrentUser ? "#1c2c4c" : "#fff",
        width: "fit-content",
        maxWidth: "80%",
        marginLeft: isCurrentUser ? "auto" : "0",
        marginRight: isCurrentUser ? "0" : "auto",
        marginTop: "0.5rem",
        boxShadow: isCurrentUser
          ? "-1px 1px 5px 1px #348e49"
          : "-1px 1px 5px 1px #348e49",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isCurrentUser ? "flex-end" : "flex-start",
        }}
      >
        <Card.Title
          style={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            fontSize: "0.8rem",
            color: isCurrentUser ? "#1c2c4c" : "#fff",
          }}
        >
          {message.from}
        </Card.Title>
        <Card.Text
          style={{
            wordBreak: "break-all",
            fontSize: "0.8rem",
          }}
        >
          {message.message}
        </Card.Text>
      </div>
    </Card>
  );
};

export default Message;
