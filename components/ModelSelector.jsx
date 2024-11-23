"use client";
import React from "react";

const ModelSelector = ({ selectedModel }) => {
  return (
    <div className="bg-gray-100 p-2 text-sm text-gray-600">
      <center>
        {selectedModel ? (
          <p>Selected model: {selectedModel}</p>
        ) : (
          <p>No model selected. Use \model-name, to select a model.</p>
        )}
      </center>
    </div>
  );
};

export default ModelSelector;
