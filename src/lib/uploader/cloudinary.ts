import { v2 as cloudinary } from "cloudinary";

const uploader = async (file: File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Convert file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Convert buffer to base64
  const fileStr = buffer.toString("base64");
  const fileUri = `data:${file.type};base64,${fileStr}`;

  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "profile-pictures",
    transformation: [
      { width: 400, height: 400, crop: "fill", gravity: "face" },
    ],
  });

  return result.secure_url;
};

export default uploader;
