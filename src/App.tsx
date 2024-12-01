import React, { useState } from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Header from './components/Header'; // Import the Header

const App = () => {
  const [page, setPage] = useState(1); // Track which page is currently displayed
  const [logo, setLogo] = useState(null); // Store generated logo
  const [buzzwords, setBuzzwords] = useState(""); // Store generated buzzwords
  const [readmeText, setReadmeText] = useState(""); // Store readme text for live updates
  const [name, setName] = useState(""); // Store name from the form
  const [description, setDescription] = useState(""); // Store description from the form

  const navigateToPage2 = (name, description) => {
    setName(name);
    setDescription(description);
    setPage(2); // Navigate to Page 2
  };
  

  const navigateToPage1 = () => setPage(1); // To navigate back to Page1

  return (
    <div className="app">
      <Header onClick={navigateToPage1} />
      {page === 1 ? (
        <Page1 navigateToPage2={navigateToPage2} />
      ) : (
        <Page2
          logo={logo}
          setLogo={setLogo} // Pass the setState functions to Page2
          buzzwords={buzzwords}
          setBuzzwords={setBuzzwords}
          readmeText={readmeText}
          setReadmeText={setReadmeText}
          navigateToPage1={navigateToPage1} // Pass the function to navigate back
          name={name}
          description={description}
        />
      )}
    </div>
  );
};

export default App;
