import React, { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";

interface DocxPreviewProps {
  file: File;
}

export const DocxPreview: React.FC<DocxPreviewProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    // Clear previous renders
    containerRef.current.innerHTML = "";

    const renderDocument = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        if (!isMounted) return;

        // Render docx directly to the container
        await renderAsync(arrayBuffer, containerRef.current!, undefined, {
          className: "docx", // default class added by docx-preview
          inWrapper: false, // render directly in container
          ignoreWidth: false, // keep width margins
          ignoreHeight: false, // keep height margins
          ignoreFonts: false, // use embedded/system fonts
          breakPages: true, // paginate document
          debug: false,
        });
      } catch (err: any) {
        console.error("Error rendering DOCX file:", err);
        if (isMounted) {
          setError(err.message || "Failed to render Microsoft Word document accurately.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    renderDocument();

    return () => {
      isMounted = false;
    };
  }, [file]);

  return (
    <div className="flex flex-col h-full w-full">
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-slate-400 font-mono text-xs">
          <span className="w-4.5 h-4.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
          <span>Preserving original DOCX typography & layouts...</span>
        </div>
      )}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-350 text-xs rounded-xl font-mono">
          ⚠️ {error}
        </div>
      )}
      <div 
        ref={containerRef} 
        id="docx-rendered-container" 
        className="w-full overflow-y-auto max-h-[600px] p-4 bg-white rounded-xl shadow-inner border border-slate-200 text-left text-slate-800"
        style={{ color: "#333333" }}
      />
    </div>
  );
};
