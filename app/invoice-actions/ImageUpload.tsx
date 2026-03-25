"use client";

import { UploadCloud, Loader2 } from "lucide-react";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useMessage } from "../providers/MessageProvider";

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
      /* Using #334155 (Slate 700) for text and #94a3b8 (Slate 400) for borders */
      className={`p-4 border-2 border-dashed text-[#334155] w-44 h-auto rounded-xl shadow-sm 
      flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all
      ${isDragActive ? "bg-[#f1f5f9] border-[#334155] scale-105" : "bg-white border-[#cbd5e1] hover:border-[#64748b] hover:bg-[#f8fafc]"}`}
    >
      <input {...getInputProps()} />
      
      {uploading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin mb-1 text-[#64748b]" size={24} />
          <p className="text-[10px] font-bold uppercase text-[#64748b]">Uploading...</p>
        </div>
      ) : imageUrl ? (
        <div className="flex flex-col items-center">
          <img 
            src={imageUrl} 
            alt="Uploaded logo" 
            className="w-full h-16 object-contain rounded-md" 
          />
          <p className="text-[10px] mt-2 text-[#94a3b8] font-bold uppercase tracking-tight">Click to change</p>
        </div>
      ) : (
        <>
          <UploadCloud size={26} className="text-[#64748b]" />
          <p className="text-[11px] font-bold leading-tight px-1 uppercase tracking-tight">
            {isDragActive ? "Drop Logo" : "Upload Business Logo"}
          </p>
          <p className="text-[9px] text-[#94a3b8] font-medium italic">Max 5MB</p>
        </>
      )}
    </div>
  );
}