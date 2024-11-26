import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const InputForm = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // State for text input
  const [isListening, setIsListening] = useState(false); // State for microphone status

  const handleVoiceInput = () => {
    // Check for browser compatibility
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      Swal.fire({
        icon: "error",
        title: "Unsupported Browser",
        text: "Your browser does not support voice recognition. Please use Chrome.",
      });
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language to English

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const voiceQuery = event.results[0][0].transcript; // Get recognized text
      setQuery(voiceQuery); // Update the input field
      setIsListening(false); // Stop listening
      onSearch(voiceQuery); // Trigger search
    };

    recognition.onerror = () => {
      Swal.fire({
        icon: "error",
        title: "Voice Recognition Error",
        text: "An error occurred while recognizing your voice. Please try again.",
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false); // Reset listening status
    };
  };

  const handleTextInput = (e) => {
    e.preventDefault();
    if (!query.trim()) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Empty Query",
    //     text: "Please enter text or speak a query.",
    //   });
    Swal.fire({
        icon: "info",
        title: "Empty Query",
        text: "Please enter text or speak a query.",
      });
   
      return;
    }
    onSearch(query);
    setQuery(""); // Clear the input field
  };

  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <form
        onSubmit={handleTextInput}
        className="flex items-center border border-gray-300 rounded-full shadow-lg px-4 py-2 w-full max-w-lg bg-white md:max-w-xl lg:max-w-2xl"
      >
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
            isListening ? "bg-blue-400 animate-pulse text-white" : "bg-gray-200 text-gray-600 hover:bg-blue-200"
          }`}
          disabled={isListening}
        >
          🎤
        </button>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type or speak your search..."
          className="flex-grow px-4 py-2 text-gray-800 placeholder-gray-500 outline-none rounded-lg bg-transparent text-sm md:text-base"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default InputForm;
