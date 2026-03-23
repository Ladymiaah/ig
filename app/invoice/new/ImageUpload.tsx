"use client";

import { UploadCloud, Loader2 } from "lucide-react";
import { useMessage } from "../../providers/MessageProvider";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const showMessage = useMessage();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Get Signature from backend
      const { data } = await axios.get("/api/cloudinary-signature");

      // 2. Build Form
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", data.api_key);
      formData.append("timestamp", String(data.timestamp));
      formData.append("signature", data.signature);

      // 3. Upload to Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${data.cloud_name}/image/upload`,
        formData
      );

      const secureUrl = res.data.secure_url;
      setImageUrl(secureUrl);
      onUpload(secureUrl);
    } catch (err: any) {
      console.error("Upload Error:", err.response?.data || err.message);
      showMessage("Upload failed. Check console for details.", "error");
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    multiple: false,
    accept: { 'image/*': [] } 
  });

  return (
    <div
      {...getRootProps()}
      className={`p-4 border border-[#dad4d4] text-[#6b21a8] w-40 h-auto rounded-xl shadow-md 
      flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all
      ${isDragActive ? "bg-purple-100 border-purple-500 scale-105" : "bg-white hover:bg-purple-50"}`}
    >
      <input {...getInputProps()} />
      
      {uploading ? (
        <div className="flex flex-col items-center animate-pulse">
          <Loader2 className="animate-spin mb-1" size={24} />
          <p className="text-[10px] font-semibold">Uploading...</p>
        </div>
      ) : imageUrl ? (
        <div className="flex flex-col items-center">
          <img 
            src={imageUrl} 
            alt="Uploaded logo" 
            className="w-40 h-20 object-contain rounded-md" 
          />
          <p className="text-xs  mt-1 text-gray-400 font-medium italic">Click to change</p>
          
        </div>
      ) : (
        <>
          <UploadCloud size={24} />
          <p className="text-[11px] font-semibold leading-tight px-2">
            {isDragActive ? "Drop here" : "Drag & Drop or Click to Upload"}
          </p>
        </>
      )}
    </div>
  );
}