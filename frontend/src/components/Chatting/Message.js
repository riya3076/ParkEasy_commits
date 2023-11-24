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
        background: isCurrentUser ? "#fff" : "#7cc5d9",
        color: isCurrentUser ? "#1c2c4c" : "#fff",
        width: "fit-content",
        maxWidth: "80%", // Adjust the maximum width as needed
        marginLeft: isCurrentUser ? "auto" : "0", // Align to right for current user
        marginRight: isCurrentUser ? "0" : "auto", // Align to left for other user
        marginTop: "0.5rem", // Add some top margin between messages
        boxShadow: isCurrentUser
          ? "-1px 1px 5px 1px #88dded"
          : "-1px 1px 5px 1px #4c768d",
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
