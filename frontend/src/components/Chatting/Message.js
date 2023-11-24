import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Message = ({ message, from }) => {
  const isCurrentUser = from;

  return (
    <Card
      style={{
        borderRadius: isCurrentUser ? "20px 20px 0 20px" : "20px 20px 20px 0",
        padding: "0.5rem",
        background: isCurrentUser ? "#fff" : "#7cc5d9",
        color: isCurrentUser ? "#1c2c4c" : "#fff",
        width: "max-content",
        maxWidth: "calc(100% - 50px)",
        boxShadow: isCurrentUser
          ? "-1px 1px 1px 1px #88dded"
          : "-1px 1px 1px 1px #4c768d",
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "0.5rem",
        height: "18%",
        overflowWrap: "break-word",
      }}
    >
      {!isCurrentUser && (
        <div
          style={{
            marginRight: "0.5rem",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        />
      )}
      <div style={{ marginLeft: isCurrentUser ? "auto" : "0" }}>
        <Card.Body>
          <Card.Title
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              fontSize: "0.8rem",
              color: isCurrentUser ? "#1c2c4c" : "#fff",
            }}
          >
            {message.to}
          </Card.Title>
          <Card.Text
            style={{
              wordBreak: "break-all",
              fontSize: "0.8rem",
            }}
          >
            {message.message}
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default Message;
