import multer from "multer";
const storage = multer.memoryStorage(); // store in memory (best for Cloudinary)

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
