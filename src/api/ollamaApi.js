const API_URL = "http://31.209.163.42:11434/api/generate";


export const fetchOllamaResponse = async ({ model, prompt, stream = true, onUpdate }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      model, 
      prompt,
       parameters: {
    mirostat: 2,  // Setzt Mirostat auf 2 für stabilere, kohärentere Textgenerierung
  },
      stream }),
  });

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";  // To accumulate the raw response (non-JSON and JSON parts)
  let jsonBuffer = ""; // Temporary buffer for incomplete JSON data
  let responses = []; // Array to store individual responses from the JSON

  console.log("RUN: " + prompt);

  // Read the stream in chunks
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode the chunk and append to result
    const decodedChunk = decoder.decode(value, { stream: true });
    result += decodedChunk;

    // Try to process any JSON that has been accumulated
    try {
      let parsedResult = null;
      try {
        parsedResult = JSON.parse(jsonBuffer + decodedChunk);
      } catch (e) {
        // If JSON parsing fails, just accumulate the non-JSON text
        jsonBuffer += decodedChunk;
        continue;
      }

      // If JSON is successfully parsed, extract the response field
      if (parsedResult && parsedResult.response) {
        // Add the response to the list
        responses.push(parsedResult.response);

        // Call onUpdate callback with just the new response text
        if (onUpdate) {
          onUpdate(parsedResult.response); // Send only the response text from JSON
        }
      }

      // Reset the JSON buffer as we've successfully parsed the chunk
      jsonBuffer = "";

    } catch (error) {
      // Handle any invalid JSON or incomplete chunks
      console.error("Error parsing stream data:", error);
    }
  }
  console.log("return: " + responses);

  // Return the final accumulated result (both raw and response data)
  return {

    result,           // All the raw content accumulated (both JSON and non-JSON)
    responses,        // All the parsed responses collected
  };
};
