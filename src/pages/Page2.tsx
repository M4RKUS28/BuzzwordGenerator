import React, { useState, useEffect } from "react";
import { marked } from "marked"; // For markdown parsing
import LogoDisplay from "../components/LogoDisplay";
import { fetchOllamaResponse } from "../api/ollamaApi"; // Import the API call function

import "./Page2.css"; // Import the CSS file for this component

const Page2 = ({ 
  logo, setLogo, 
  buzzwords, setBuzzwords, 
  readmeText, setReadmeText, 
  navigateToPage1, 
  name, 
  description 
}) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Convert markdown to HTML when the readmeText updates
  useEffect(() => {
    if (readmeText) {
      try {
        const html = marked(readmeText); // Convert markdown to HTML
        setHtmlContent(html); // Update the HTML content with the latest markdown
      } catch (error) {
        console.error("Error parsing markdown:", error);
        setHtmlContent("<p>Error processing markdown content</p>");
      }
    }
  }, [readmeText]);

  // Fetch data when name and description are available
  useEffect(() => {
    const fetchData = async () => {
      if (name && description) {
        // Clear buzzwords and readmeText before starting the new fetch stream
        setBuzzwords("");
        setReadmeText("");

        // Fetch buzzwords, logo, and readme text with real-time updates
        const generateBuzzwords = fetchOllamaResponse({
          model: "llama3.2",
          prompt: `Create a Comma seperated List of outstanding, professional buzzwords for the following project by description: ${description}. E.g., "State of the art", "End-to-End encryption", "AI", "Artificial Intelligence", "Vertical scaling", and many more! As many as possible. Every Buzzword have to be seperated by ','. Start directly with the Buzzword List! No additional Conversational Text -> stop directly after last buzzword. Display only buzzwords!`, 
            onUpdate: (updatedBuzzwords) => {
            setBuzzwords((prevBuzzwords) => prevBuzzwords + updatedBuzzwords); // Combine previous and new buzzwords
          },
        });

       /* const generateLogo = fetchOllamaResponse({
          model: "llama3.2-vision_",
          prompt: `Generate a App Logo for an outstanding app ${name} based on this project: ${description} which is called`,
            onUpdate: (updatedLogo) => {
            setLogo(updatedLogo); // Update logo state
          },
        });
        */

        const generateReadmeText = fetchOllamaResponse({
          model: "llama3.2",
          prompt: `Create a modern, clean and very very professional looking markdown-based readme file for the following project: ${name}. Description: ${description}. Include sections like Introduction, Features, Installation Instructions, etc.  Start directly with the Readme Text! No additional Conversational Text! Write a detailed and complete text!`,
          onUpdate: (updatedText) => {
            setReadmeText((prevReadmeText) => prevReadmeText + updatedText); // Combine previous and new readme text
          },
        });

        try {
          await Promise.allSettled([generateBuzzwords, generateLogo, generateReadmeText]);
        } catch (error) {
          console.error("Error generating content:", error);
        }
      }
    };

    fetchData(); // Call the async function within useEffect
  }, [name, description, setBuzzwords, setLogo, setReadmeText]);  

  // Copy markdown content to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(readmeText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied" state after 2 seconds
    });
  };

  // Download the markdown file as README.md
  const handleDownloadReadme = () => {
    const blob = new Blob([readmeText], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="page2">
      <div className="logo-container">
        {logo ? (
          <LogoDisplay imageSrc={logo} />
        ) : (
          <img
            src="https://via.placeholder.com/150?text=Loading+Logo"
            alt="Placeholder Logo"
            className="placeholder-logo"
          />
        )}
      </div>

      <div className="buzzwords">
        <h1 className="tite">{name}</h1>

        <h1>Buzzwords</h1>
        <div className="buzzwords-container">
          {buzzwords.split(",").map((word, index) => (
            <div
              key={index}
              className="buzzword-item"
              style={{ backgroundColor: getRandomColor() }}
            >
              {word.trim()}
            </div>
          ))}
        </div>
      </div>

      <div className="readme">
        <h1>Readme</h1>

        <div className="readme-content">
          <div
            className="readme-markdown"
            dangerouslySetInnerHTML={{ __html: htmlContent }} // Render parsed markdown as HTML
          />
        </div>

        <div className="actions">
            <button className="back-button"  onClick={navigateToPage1}>Back to Page 1</button>
          <button className="copy-button" onClick={handleCopyToClipboard}>
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button className="download-button" onClick={handleDownloadReadme}>
            Download Readme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page2;
