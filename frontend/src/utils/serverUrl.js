const serverUrl =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/"
    : "http://singh-blog-lb-733786724.ap-south-1.elb.amazonaws.com/";

export default serverUrl;
