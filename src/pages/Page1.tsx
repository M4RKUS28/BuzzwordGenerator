// pages/Page1.jsx
import React, { useState } from "react";
import Form from "../components/Form";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchOllamaResponse } from "../api/ollamaApi";

const Page1 = ({ setLogo, setDescription, setBuzzwords, navigateToPage2 }) => {
  const [loading, setLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentBuzzwords, setCurrentBuzzwords] = useState("");
  const [currentLogo, setCurrentLogo] = useState("");

  const handleGenerate = async ({ name, description }) => {
    setLoading(true);
  
    // State to store the full description, buzzwords, and logo prompts
    let fullDescription = '';
    let fullBuzzwords = '';
    let fullLogoPrompt = '';
  
    try {
      // Define the three API requests in parallel
      const generateDescription = fetchOllamaResponse({
        model: "llama3.2",
        prompt: `Create a very modern, clean and professional looking readme file text for the following project: ${name}. Description: ${description}. Start directly with the Readme Text! No additional Conversational Text!`,
        onUpdate: (updatedDescription) => {
          fullDescription += updatedDescription; // Accumulate full description
          setCurrentDescription(fullDescription); // Update in real time
        },
      });
  
      const generateBuzzwords = fetchOllamaResponse({
        model: "llama3.2",
        prompt: `List outstanding professional buzzwords for the following description: ${description}.E.g. "State of the art", "End-to-End encryption", "AI", "Aritificial Intelligence", "Vertical scaling", and many more! Start directly with the Buzzword List! No additional Conversational Text!`,
        onUpdate: (updatedBuzzwords) => {
          fullBuzzwords += updatedBuzzwords; // Accumulate full buzzwords
          setCurrentBuzzwords(fullBuzzwords); // Update in real time
        },
      });
  
      const generateLogo = fetchOllamaResponse({
        model: "llama3.2-vision",
        prompt: `Generate a prompt for creating an outstanding app logo based on this project: ${description} `,
        onUpdate: (updatedLogo) => {
          fullLogoPrompt += updatedLogo; // Accumulate full logo prompt
          setCurrentLogo(fullLogoPrompt); // Update in real time
        },
      });
  
      // Use Promise.all to wait for all three API calls to finish
      try {
        const results = await Promise.allSettled([
          generateDescription,
          generateBuzzwords,
          generateLogo,
        ]);
      
        // Handle individual results here, like checking for errors in any of them
      } catch (error) {
        console.error("Error generating content:", error);
      }
  
      // Once all is done, move to Page 2
      setDescription(fullDescription);
      setBuzzwords(fullBuzzwords);
      setLogo(fullLogoPrompt);
      navigateToPage2();
  
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="page1">
      {loading ? <LoadingSpinner /> : <Form onSubmit={handleGenerate} />}
      <div>
        {/* Show partial results during generation */}
        <h3>Real-time Description:</h3>
        <p>{currentDescription}</p>
        <h3>Real-time Buzzwords:</h3>
        <p>{currentBuzzwords}</p>
        <h3>Real-time Logo Prompt:</h3>
        <p>{currentLogo}</p>
      </div>
    </div>
  );
};

export default Page1;
