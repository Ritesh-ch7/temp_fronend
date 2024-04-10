import React, { useRef, useLayoutEffect } from "react";
import Loader from "./Loader/Loader";


const MessageList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, loading]);

  return (
    <div className="mt-4 overflow-y-auto max-h-[25rem] space-y-4 w-full ">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg ${
            message.type === "user"
              ? "w-3/4 mx-auto mb-2 bg-blue-200 text-right"
              : "w-3/4 mx-auto mb-2 bg-gray-200 text-left"
          }`}
        >
          {console.log(message)}
          <p
            className={`font-bold w-full ${
              message.type === "user" ? "text-blue-800" : "text-gray-800"
            }`}
          >
            {message.type === "user" ? "You: " : "Bot: "}
          </p>
          <p className="text-gray-800 w-full">{message.content}</p>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
