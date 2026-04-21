let serverUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/"
    : "http://localhost:5000/";

export default serverUrl;
