const serverUrl =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/"
    : "http://13.203.193.51:5000/";

export default serverUrl;
