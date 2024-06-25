"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useState } from "react";

const PDFViewer = ({ pdfUrl }) => {
  const [url, setUrl] = useState(pdfUrl);

  useEffect(() => {
    setUrl(pdfUrl);
  }, [pdfUrl]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-base-200">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "100vh",
            width: "100%",
          }}
        >
          <Viewer
            fileUrl={url}
            // plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>
    </section>
  );
};

export default PDFViewer;
