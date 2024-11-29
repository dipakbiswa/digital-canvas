"use client";
import React, { useEffect, useRef } from "react";
import { Volume2, Square } from "lucide-react";

const MessageList = ({
  messages,
  speakMessage,
  stopSpeech,
  isSpeaking,
  messagesEndRef,
}) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (content) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div ref={scrollContainerRef} className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={`${index}-${message.uniqueId || " "}`}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
              message.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {message.file && (
              <div className="mb-2">
                <img
                  src={URL.createObjectURL(message.file)}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
            <p className="break-words">{message.content}</p>
            <component />
            {message.image && <img src={message.image} />}
            {message.role === "assistant" && (
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => speakMessage(message.content)}
                  className="p-1 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none"
                  disabled={isSpeaking}
                >
                  <Volume2 className="w-4 h-4 text-gray-700" />
                </button>
                {isSpeaking && (
                  <button
                    onClick={stopSpeech}
                    className="p-1 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
                  >
                    <Square className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
