import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import Sidebar from "./Sidebar";
import { toast } from "react-hot-toast";
import ModelSelector from "./ModelSelector";
import axios from "axios";
import { db } from "../firebase/config";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/context/AuthContext";
import https from "https";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [model, setModel] = useState("gemini-1.5-flash");
  const [temperature, setTemperature] = useState(0.3);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedMLModel, setSelectedMLModel] = useState(null);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { user } = useAuthContext();

  const API_KEY = "YOUR_GEMINI_API_KEY";
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    initChat();
  }, [model, temperature]);

  const initChat = async () => {
    const geminiModel = genAI.getGenerativeModel({ model: model });
    chatRef.current = geminiModel.startChat({
      generationConfig: { temperature: temperature },
    });
  };

  const speakMessage = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const cleanText = text.replace(/\*\*/g, "");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const selectMLModel = (command) => {
    const modelMap = {
      "\\help": "help",
      "\\object-recognition": "object-recognition",
      "\\face-detection": "face-detection",
      "\\face-emotion-detection": "face-emotion-detection",
      "\\handwriting-detection": "handwriting-detection",
      "\\food-nutrition": "food-nutrition",
      "\\object-detection-img-op": "object-detection-img-op",
      "\\deepfake-detection": "deepfake-detection",
    };
    const [modelCommand, ...promptParts] = command.split(" ");
    const selectedModel = modelMap[modelCommand];
    const userPrompt = promptParts.join(" ").trim();

    return { model: selectedModel, prompt: userPrompt };
  };

  const processImageWithModel = async (mlModel, userPrompt) => {
    if (!uploadedImage) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Please upload an image first." },
      ]);
      return;
    }

    setIsStreaming(true);
    try {
      const imageData = await fileToGenerativePart(uploadedImage);
      const geminiModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      let prompt;
      switch (mlModel) {
        case "help":
          userHelp();
          break;
        case "object-recognition":
          prompt = userPrompt || "Identify and list the objects in this image.";
          handleGeminiWork(prompt);
          break;
        case "face-detection":
          prompt = userPrompt || "Detect and describe the faces in this image.";
          handleGeminiWork(prompt);
          break;
        case "face-emotion-detection":
          prompt =
            userPrompt ||
            "Detect faces and describe their emotions in this image.";
          handleGeminiWork(prompt);
          break;
        case "handwriting-detection":
          prompt =
            userPrompt ||
            "Detect and transcribe any handwritten text in this image.";
          handleGeminiWork(prompt);
          break;
        case "food-nutrition":
          prompt = userPrompt;
          console.log(prompt);
          foodNutrition();
          break;
        case "object-detection-img-op":
          objectDetectionImgOutput();
          break;
        case "deepfake-detection":
          deepfakeDetection();
          break;
        // case "suggest-product":
        //   // prompt = userPrompt || "";
        //   suggestProducts();
        //   break;
        default:
          throw new Error("Invalid ML model selected");
      }

      function userHelp() {
        const helpText =
          "\\object-recognition: Object recognition model. prompt needed. \n \\face-detection: Face detection model. prompt needed. \n \\face-emotion-detection: Face emotion detection mode. Prompt needed. \n \\handwriting-detection: Handwriting detection model. Prompt needed.\n \\food-nutrition: Food nutrition detection model. Prompt needed.\n \\object-detection-img-op: Object detection with image output. Prompt not needed. \n ";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: helpText },
        ]);
      }

      async function handleGeminiWork(prompt) {
        const result = await geminiModel.generateContent([
          prompt,
          { inlineData: { data: imageData, mimeType: uploadedImage.type } },
        ]);
        const response = await result.response;
        const text = response.text();

        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      }

      async function foodNutrition() {
        const formData = new FormData();
        formData.append("image", uploadedImage);

        try {
          const apiResponse = await axios.post(
            "/foodvisor-api/1.0/en/analysis/",
            formData,
            {
              headers: {
                Authorization:
                  "Api-Key m4cKLZSr.Jhac11mupXVwocJHKpYx5UVJ3jC1mLxI",
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const foodData = apiResponse.data.items[0].food[0].food_info;
          const foodDataJSON = JSON.stringify(foodData);

          // console.log(foodDataJSON);

          const result = await geminiModel.generateContent([
            `from this food data as json ${foodDataJSON} and answer this question and don't provide any clue about the json data: ${prompt}`,
          ]);
          const response = await result.response;
          const text = response.text();

          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: text },
          ]);
        } catch (error) {
          // setError("An error occurred while analyzing the image");
          console.error("Error:", error);
        }
      }

      async function objectDetectionImgOutput() {
        const formData = new FormData();
        formData.append("image", uploadedImage);
        try {
          const apiResponse = await axios.post(
            "object-detection-img-op/detect",
            formData
          );
          const image_url = apiResponse.data.image_url;
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              image: image_url,
            },
          ]);
        } catch (error) {
          console.log(error);
        }
      }

      async function deepfakeDetection() {
        const formData = new FormData();
        formData.append("media", uploadedImage);
        formData.append("models", "deepfake");
        formData.append("api_user", "1280634117");
        formData.append("api_secret", "6nfgA4gRtHgMRgknQsUneqZVZGF4ENef");
        try {
          const response = await axios.post(
            "deepfake-detection/1.0/check.json",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const deepfakeScore = response.data.type.deepfake;
          // return response.data;

          const result = await geminiModel.generateContent([
            `I am providing you a deepfake score. This score is a float between 0 and 1. The higher the value, the higher the confidence that the image is a deepfake, the score is: ${deepfakeScore}. Acording to that score generate a response for user that this image is deepfake or not, and don't provide internal details.`,
          ]);
          const geminiResponse = await result.response;
          const text = geminiResponse.text();

          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: text },
          ]);
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      }

      // async function suggestProducts() {
      //   try {
      //     const prompt =
      //       "only name the products with color found in this image";
      //     console.log("Generating content with prompt:", prompt);
      //     const result = await geminiModel.generateContent([
      //       prompt,
      //       { inlineData: { data: imageData, mimeType: uploadedImage.type } },
      //     ]);
      //     const response = await result.response;
      //     const text = response.text();
      //     console.log("Generated text:", text);

      //     console.log("Fetching product suggestions from API");
      //     const params = {
      //       engine: "google_shopping",
      //       q: text,
      //       location: "India",
      //       hl: "en",
      //       gl: "us",
      //       api_key:
      //         "94cee5c53c3d963cddffa474d78ccf12714f5478b507d26130dda982a78b9186",
      //     };
      //     console.log("Attempting to fetch from SerpAPI with params:", params);
      //     const apiResponse = await axios.get("suggest-product/search", {
      //       params,
      //     });
      //     console.log("API response received:", apiResponse.status);
      //     const jsonData = apiResponse.data;
      //     console.log("API response data:", jsonData);

      //     if (
      //       jsonData.shopping_results &&
      //       jsonData.shopping_results.length > 0
      //     ) {
      //       const productSuggestions = jsonData.shopping_results
      //         .slice(0, 5)
      //         .map((item) => `${item.title} - $${item.price}`);

      //       setMessages((prev) => [
      //         ...prev,
      //         {
      //           role: "assistant",
      //           content: `Based on the image, here are some product suggestions:\n\n${productSuggestions.join(
      //             "\n"
      //           )}`,
      //         },
      //       ]);
      //     } else {
      //       throw new Error("No shopping results found in the API response");
      //     }
      //   } catch (error) {
      //     console.error("Error in suggestProducts:", error);
      //     let errorMessage =
      //       "Sorry, I encountered an error while fetching product suggestions. Please try again later.";
      //     if (error.response) {
      //       console.error("Error response:", error.response.data);
      //       errorMessage +=
      //         " Error details: " + JSON.stringify(error.response.data);
      //     }
      //     setMessages((prev) => [
      //       ...prev,
      //       {
      //         role: "assistant",
      //         content: errorMessage,
      //       },
      //     ]);
      //   }
      // }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error processing the image: ${error.message}. Please try again.`,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSendMessage = async (message, file) => {
    let newMessages = [...messages];

    if (file) {
      setUploadedImage(file);
      newMessages.push({ role: "user", content: "Image uploaded", file });
      setMessages(newMessages);
    }

    if (message) {
      newMessages.push({ role: "user", content: message });
      setMessages(newMessages);
      if (message.startsWith("\\")) {
        const { model: mlModel, prompt: userPrompt } = selectMLModel(message);
        if (mlModel) {
          setSelectedMLModel(mlModel);
          await processImageWithModel(mlModel, userPrompt);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Invalid model command. Please try again.",
            },
          ]);
        }
      } else if (uploadedImage) {
        if (!message.startsWith("\\")) {
          toast.success(
            "Use a model from our model selector for more spacific results!"
          );
          await handleNonModelMessage(message);
        }
        // setMessages((prev) => [
        //   ...prev,
        //   {
        //     role: "assistant",
        //     content:
        //       "Please select a model using '\\model-name' before entering a prompt.",
        //   },
        // ]);
      } else {
        // await handleGeminiWork(prompt);
        await sendMessageToModel([{ text: message }]);
      }
    }

    // Save or update the conversation in Firebase
    // if (user) {
    //   if (currentConversationId) {
    //     await updateConversation(currentConversationId, newMessages);
    //   } else {
    //     const newConversationId = await createConversation(newMessages);
    //     setCurrentConversationId(newConversationId);
    //   }
    // }

    async function handleNonModelMessage(prompt) {
      const imageData = await fileToGenerativePart(uploadedImage);
      const geminiModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await geminiModel.generateContent([
        prompt,
        { inlineData: { data: imageData, mimeType: uploadedImage.type } },
      ]);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    }
  };

  const sendMessageToModel = async (parts) => {
    setIsStreaming(true);
    try {
      const result = await chatRef.current.sendMessageStream(parts);
      let fullResponse = "";
      for await (const chunk of result.stream) {
        fullResponse += chunk.text();
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message}. Please try again.`,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const fileToGenerativePart = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
  };

  const resetConversation = () => {
    setMessages([]);
    setUploadedImage(null);
    setSelectedMLModel(null);
    setCurrentConversationId(null);
    initChat();
  };

  const handleInputChange = (inputValue) => {
    if (inputValue.startsWith("\\")) {
      const availableModels = [
        "\\help",
        "\\object-recognition",
        "\\face-detection",
        "\\face-emotion-detection",
        "\\handwriting-detection",
        "\\food-nutrition",
        "\\object-detection-img-op",
        "\\deepfake-detection",
      ];
      const filteredModels = availableModels.filter((model) =>
        model.startsWith(inputValue)
      );
      setModelSuggestions(filteredModels);
    } else {
      setModelSuggestions([]);
    }
  };

  // const createConversation = async (messages) => {
  //   const docRef = await addDoc(collection(db, "conversations"), {
  //     userId: user.uid,
  //     messages: messages,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     title: messages[0]?.content.slice(0, 30) || "New Conversation",
  //   });
  //   return docRef.id;
  // };

  // const updateConversation = async (conversationId, messages) => {
  //   const conversationRef = doc(db, "conversations", conversationId);
  //   await updateDoc(conversationRef, {
  //     messages: messages,
  //     updatedAt: new Date(),
  //   });
  // };

  // const handleSelectConversation = async (conversation) => {
  //   if (conversation) {
  //     const conversationRef = doc(db, "conversations", conversation.id);
  //     const conversationDoc = await getDoc(conversationRef);
  //     if (conversationDoc.exists()) {
  //       setMessages(conversationDoc.data().messages);
  //       setCurrentConversationId(conversation.id);
  //     }
  //   } else {
  //     resetConversation();
  //   }
  // };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        resetConversation={resetConversation}
        // onSelectConversation={handleSelectConversation}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentConversationId={currentConversationId}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm flex items-center">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold text-gray-900">
              🤖 The Digital Canvas 💬
            </h1>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <MessageList
            messages={messages}
            messagesEndRef={messagesEndRef}
            speakMessage={speakMessage}
            stopSpeech={stopSpeech}
            isSpeaking={isSpeaking}
          />
        </main>
        <ModelSelector selectedModel={selectedMLModel} />
        <InputArea
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
          onInputChange={handleInputChange}
          modelSuggestions={modelSuggestions}
        />
      </div>
    </div>
  );
};

export default App;
