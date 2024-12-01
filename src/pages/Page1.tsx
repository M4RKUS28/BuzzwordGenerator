import React, { useState } from "react";
import Form from "../components/Form";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Page1.css"; // Import the CSS file for this component

const Page1 = ({ navigateToPage2 }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async ({ name, description }) => {
    setLoading(true);

    // Start immediately with Page 2 (for real-time UI updates)
    navigateToPage2(name, description); // Pass name and description to Page2 for data fetching

    setLoading(false);
  };

  return (
    <div className="page1">
      {loading ? <LoadingSpinner /> : <Form onSubmit={handleGenerate} />}
    </div>
  );
};

export default Page1;
