"use client";
import React, { useState, useEffect } from "react";
import { Trash2, X, PlusCircle, MessageCircle } from "lucide-react";
import { useAuthContext, signOut } from "@/context/AuthContext";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const Sidebar = ({
  resetConversation,
  isOpen,
  toggleSidebar,
  onSelectConversation,
  currentConversationId,
}) => {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "conversations"),
        where("userId", "==", user.uid),
        orderBy("updatedAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedConversations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(fetchedConversations);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleSelectConversation = (conversation) => {
    onSelectConversation(conversation);
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative md:translate-x-0 z-30 inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out flex flex-col h-full`}
    >
      <div className="flex justify-between items-center mb-4 md:hidden">
        {/* <h2 className="text-xl font-bold">Chat History</h2> */}
        <button onClick={toggleSidebar} className="text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        {/* <button
          onClick={() => {
            resetConversation();
            onSelectConversation(null);
          }}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Chat</span>
        </button> */}

        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              className={`w-full flex items-center space-x-2 ${
                currentConversationId === conversation.id
                  ? "bg-gray-600"
                  : "bg-gray-700 hover:bg-gray-600"
              } text-white font-medium py-2 px-4 rounded`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="truncate">
                {conversation.title || "Untitled Chat"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <button
          onClick={resetConversation}
          className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reset Conversation</span>
        </button>
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <span>Logout</span>
        </button>
        {user && (
          <p className="text-sm text-center">
            Logged in as <span className="font-bold">{user.email}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
