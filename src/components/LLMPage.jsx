import React from "react";
import ChatWindow from "./ChatWindow";


function LLMPage({ setUrl, messages, sendMessage, url }) {
  if (!url.includes(`http://127.0.0.1:8000/api/v1/query/1/`)) {
    setUrl("http://127.0.0.1:8000/api/v1/query/1/");
  }
  return (
    <div className="w-full">
      <ChatWindow messages={messages} sendMessage={sendMessage} />
    </div>
  );
}

export default LLMPage;
