"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Image } from "lucide-react";

const InputArea = ({
  onSendMessage,
  isStreaming,
  onInputChange,
  modelSuggestions,
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setShowSuggestions(modelSuggestions.length > 0);
  }, [modelSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setShowSuggestions(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onSendMessage(null, selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setMessage(inputValue);
    onInputChange(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion + " ");
    setShowSuggestions(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-t border-gray-200 p-4"
    >
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message or use \model-name to select an ML model"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isStreaming}
          />
          {showSuggestions && (
            <ul className="absolute bottom-full left-0 w-full bg-white text-red-400 border border-gray-300 rounded-lg shadow-lg">
              {modelSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
          disabled={isStreaming}
        >
          <Image className="w-5 h-5 text-gray-600" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none"
          disabled={isStreaming}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};

export default InputArea;
