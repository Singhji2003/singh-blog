const serverUrl =
  typeof window !== "undefined" &&
  window.location.hostname === "localhost"
    ? "http://localhost:5000/"
    : "http://13.235.80.109:5000/";

export default serverUrl;