import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import InputForm from "./components/InputForm";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    console.log("Handling search for query:", query); // Debugging
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/assistant/search", { query });
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/assistant/search`, { query });

      console.log("Response from backend:", response.data); // Debugging
      if (response.data.success && response.data.data.length > 0) {
        setResults(response.data.data); // Update results
      } else {
        setResults([]); // Clear results
        Swal.fire({
          icon: "info",
          title: "No Results Found",
          text: "Please try a different query.",
        });
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while fetching results. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-6">
      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-300 p-6 lg:p-10 relative">
        {/* Decorative Border */}
        <div className="absolute inset-0 border-4 border-blue-500 rounded-xl -z-10"></div>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">AI Assistant</h1>
          <p className="text-sm md:text-lg text-gray-600">
            Find professionals easily with our AI-powered search tool.
          </p>
        </header>

        {/* Input Form */}
        <div className="w-full">
          <InputForm onSearch={handleSearch} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading results...</p>
          </div>
        )}

        {/* Result Display */}
        {!loading && results.length > 0 && (
          <div className="mt-8">
            <ResultDisplay results={results} />
          </div>
        )}

        {/* No Results Message */}
        {!loading && results.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">No Results Found</h2>
            <p className="mt-2 text-sm md:text-base text-gray-600">Try searching for something else!</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs md:text-sm text-gray-500">
          © 2024 AI Assistant. All rights reserved by Md Mosiur Rahman Romel
        </footer>
      </div>
    </div>
  );
};

export default App;
