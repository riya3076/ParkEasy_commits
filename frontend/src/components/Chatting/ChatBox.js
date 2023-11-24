import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./Firebase1";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Button, Card, Collapse } from "react-bootstrap";

const ChatBox = ({ to, from }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("from", "==", from),
      where("to", "==", to),
      //  orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      console.log(fetchedMessages);
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [to, from]);

  useEffect(() => {
    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleToggleChatbox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Card
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        flexDirection: "column",
        alignItems: "center",
        width: "400px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: isOpen ? "#fff" : "#2196f3",
        color: isOpen ? "#000" : "#fff",
      }}
    >
      <Button onClick={handleToggleChatbox} variant="light">
        {isOpen ? "Collapse" : "Expand"}
      </Button>
      <Collapse in={isOpen}>
        <div
          style={{
            width: "100%",
            height: "300px",
            overflowY: "auto",
            marginBottom: "1rem",
            borderRadius: "8px",
            padding: "1rem",
            background: "white",
          }}
        >
          {messages?.map((message) => (
            <Message
              key={message.createdAt}
              message={message}
              from={message.from}
            />
          ))}
          <span ref={scroll}></span>
        </div>
      </Collapse>
      {isOpen && <SendMessage scroll={scroll} to={to} from={from} />}
    </Card>
  );
};

export default ChatBox;
