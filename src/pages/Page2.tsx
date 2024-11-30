import React, { useState, useEffect } from "react";
import { marked } from "marked"; // Importing marked for markdown parsing
import LogoDisplay from "../components/LogoDisplay";

const Page2 = ({ logo, description, buzzwords, readmeText }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Convert the markdown text to HTML when it changes
    if (readmeText) {
      try {
        const html = marked(readmeText); // Convert markdown to HTML
        setHtmlContent(html);
      } catch (error) {
        console.error("Error parsing markdown:", error);
        setHtmlContent("<p>Error processing markdown content</p>"); // Show an error message if markdown parsing fails
      }
    }
  }, [readmeText]);

  return (
    <div className="page2">
      <h1>Generated Results</h1>
      
      {/* Display the logo */}
      <LogoDisplay imageSrc={logo} />

      {/* Display the description */}
      <div className="description">
        <h2>Description</h2>
        <p>{description}</p>
      </div>

      {/* Display buzzwords */}
      <div className="buzzwords">
        <h2>Buzzwords</h2>
        <ul>
          {buzzwords.split(",").map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>

      {/* Display the readme content as HTML */}
      <div className="readme">
        <h2>Project Readme</h2>
        {/* Render the readme content as HTML */}
        <div
          className="readme-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default Page2;
