import React, { useState } from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const App = () => {
  const [page, setPage] = useState(1); // Keeps track of the current page (1 or 2)
  const [logo, setLogo] = useState(null); // Stores the generated logo
  const [description, setDescription] = useState(""); // Stores the generated description
  const [buzzwords, setBuzzwords] = useState(""); // Stores the generated buzzwords
  const [readmeText, setReadmeText] = useState(""); // New state for the Readme markdown content

  const navigateToPage2 = () => setPage(2); // Function to navigate to Page 2

  return (
    <div className="app">
      {page === 1 ? (
        <Page1
          setLogo={setLogo} // Pass the setter function to Page1
          setDescription={setDescription} // Pass the setter function to Page1
          setBuzzwords={setBuzzwords} // Pass the setter function to Page1
          setReadmeText={setReadmeText} // Pass the setter function for Readme to Page1
          navigateToPage2={navigateToPage2} // Pass the navigation function to Page1
        />
      ) : (
        <Page2
          logo={logo} // Pass the logo to Page2
          description={description} // Pass the description to Page2
          buzzwords={buzzwords} // Pass the buzzwords to Page2
          readmeText={readmeText} // Pass the Readme text to Page2
        />
      )}
    </div>
  );
};

export default App;
