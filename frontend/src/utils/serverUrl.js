const serverUrl =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/"
    : "https://api.featherbazaar.com/";

export default serverUrl;
