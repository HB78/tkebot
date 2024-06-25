"use client";
import { createChat } from "@/fetches/fetches";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const FileUpload = () => {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return createChat(data);
    },
    onSuccess: (data) => {
      if (data.response.status === 201 || data.response.status === 200) {
        console.log("---> data:tout court", data);
        console.log("---> data.response:", data.response);
        toast.success("Analyse terminée");
        router.replace(`/chat/${data.result.id}`);
      }
    },
    onError: (error) => {
      console.log("error:", error);
      toast.error("Something went wrong");
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 30 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.key || !data?.file_name) {
          console.log("data:--> dans le if", data);
          toast.error("Something went wrong");
          return;
        }
        const newData = {
          pdfName: data.file_name,
          fileKey: data.key,
        };
        mutate(newData); // Utiliser la nouvelle valeur directement
        console.log("data:from file upload component", data);
        console.log("data.file_name:from file upload component", data.key);
        console.log("data.key:from file upload component", data.file_name);
        setUploading(false);
      } catch (error) {
        console.log("error:fileupload.jsx", error);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded xl">
      <div
        {...getRootProps()}
        className="border-dashed border-2 rounded-xl cursor-pointerbg-gray-50 py-8 flex justify-center items-center"
      >
        <input type="text" {...getInputProps()} />
        {uploading || isPending ? (
          <>
            {/* loading state */}
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="mt-2 ml-3 text-sm text-slate-400">
              Analyse en cours...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
