const serverUrl =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/"
    : "http://api.featherbazaar.com/";

export default serverUrl;
