"use client";

import { useState } from "react";
import { Send, Image, Bot, Loader2 } from "lucide-react";

interface Message {
  type: "user" | "ai";
  content: string;
  image?: string | null;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  
  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const newMessage = {
      type: "user" as const,
      content: input,
      image: selectedImage,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setSelectedImage(null);
    setIsLoading(true);

    try {
      // Only make API call if there's an image
      if (newMessage.image) {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: newMessage.image,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();

        // Add AI response with analysis and suggestions
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: `Analysis: ${data.analysis}\n\nSuggestions: ${data.suggestions}`,
          },
        ]);
      } else {
        // Handle text-only messages (optional)
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: "Please provide an image for outfit analysis and suggestions.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-screen p-4 flex flex-col">

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-4 mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Uploaded"
                  className="w-64 h-64 object-cover object-center rounded-lg mb-2"
                />
              )}
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" />
            Thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        {selectedImage && (
          <div className="mb-2">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-32 rounded"
            />
          </div>
        )}
        <div className="flex gap-2">
          <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <Image className="text-gray-500" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about outfit suggestions..."
            className="flex-1 border rounded-full px-4 focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
