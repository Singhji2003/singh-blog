const serverUrl = window.location.href.startsWith("http://localhost:3000/")
  ? "http://localhost:5000/"
  : "https://api.featherbazaar.com/";

export default serverUrl;
