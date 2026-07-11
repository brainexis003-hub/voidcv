import React, { useEffect, useRef, useState } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  AlertCircle, 
  Loader2, 
  FileText,
  Download,
  CheckCircle,
  Eye
} from "lucide-react";
import { renderAsync } from "docx-preview";

// @ts-ignore
import * as pdfjsLib from "pdfjs-dist";

// Configure local worker via Vite's native asset/chunk loader
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
} catch (e) {
  console.warn("Failed to set local worker, falling back to CDN worker URL", e);
  // @ts-ignore
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "4.0.379"}/pdf.worker.min.js`;
}

const ensurePdfJsLoaded = (): Promise<any> => {
  return Promise.resolve(pdfjsLib);
};

const setupWorker = async (pdfjs: any) => {
  // Already configured via top-level setting
};

interface ResumeViewerProps {
  file: File;
  fileType: "PDF" | "DOCX" | "TXT";
  name: string;
}

export function ResumeViewer({ file, fileType, name }: ResumeViewerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1.0); // Starts at default 100% / fit width
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [txtContent, setTxtContent] = useState<string>("");
  const [containerWidth, setContainerWidth] = useState<number>(600);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasesRef = useRef<HTMLDivElement>(null);

  // Set up ResizeObserver to track container width fluidly per guidelines
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;
      const { width } = entries[0].contentRect;
      if (width > 0) {
        setContainerWidth(width);
      }
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Main file processing effect
  useEffect(() => {
    let isMounted = true;
    let timeoutId: any = null;
    setLoading(true);
    setError(null);
    setNumPages(0);
    setPdfDoc(null);

    // Clear previous view
    if (canvasesRef.current) {
      canvasesRef.current.innerHTML = "";
    }

    if (fileType === "PDF") {
      const loadPdf = async () => {
        try {
          // Setup a 10-second safety timeout to avoid infinite loading screens
          timeoutId = setTimeout(() => {
            if (isMounted) {
              console.warn("PDF loading timed out after 10s");
              setError("Unable to preview this PDF. Please try another PDF.");
              setLoading(false);
            }
          }, 10000);

          const pdfjs = await ensurePdfJsLoaded();
          if (!isMounted) {
            clearTimeout(timeoutId);
            return;
          }

          const arrayBuffer = await file.arrayBuffer();
          if (!isMounted) {
            clearTimeout(timeoutId);
            return;
          }

          // Force setup robust cross-origin blob worker cache
          await setupWorker(pdfjs);

          const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
          const pdf = await loadingTask.promise;
          
          if (!isMounted) {
            clearTimeout(timeoutId);
            return;
          }
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setError(null);
          setLoading(false);
          clearTimeout(timeoutId);
        } catch (err: any) {
          if (timeoutId) clearTimeout(timeoutId);
          console.error("PDF.js Loading Error:", err);
          if (isMounted) {
            setError("Unable to preview this PDF. Please try another PDF.");
            setLoading(false);
          }
        }
      };

      loadPdf();
    } else if (fileType === "DOCX") {
      const renderDocx = async () => {
        try {
          if (!canvasesRef.current) return;
          
          const arrayBuffer = await file.arrayBuffer();
          if (!isMounted) return;

          // Create wrapper container for clean styling
          const docxWrapper = document.createElement("div");
          docxWrapper.className = "docx-render-payload bg-white p-6 sm:p-12 shadow-md rounded-lg max-w-[800px] mx-auto text-left leading-relaxed text-slate-800 border border-slate-200";
          docxWrapper.style.color = "#333333";
          docxWrapper.style.fontFamily = "Calibri, Arial, sans-serif font-sans";
          canvasesRef.current.appendChild(docxWrapper);

          // Render DOCX directly using docx-preview
          await renderAsync(arrayBuffer, docxWrapper, undefined, {
            className: "docx",
            inWrapper: false,
            ignoreWidth: false,
            ignoreHeight: false,
            ignoreFonts: false,
            breakPages: true,
            debug: false,
          });

          if (isMounted) {
            setLoading(false);
          }
        } catch (err: any) {
          console.error("DOCX Loading Error:", err);
          if (isMounted) {
            setError("Unable to preview this DOCX document. Check if the file is corrupted.");
            setLoading(false);
          }
        }
      };

      renderDocx();
    } else if (fileType === "TXT") {
      const readTxt = () => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (!isMounted) return;
          setTxtContent(evt.target?.result as string || "");
          setLoading(false);
        };
        reader.onerror = () => {
          if (!isMounted) return;
          setError("Unable to preview this TXT document.");
          setLoading(false);
        };
        reader.readAsText(file);
      };
      readTxt();
    }

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [file, fileType]);

  // Render PDF pages on canvas container when pdfDoc, zoom, or containerWidth changes
  useEffect(() => {
    if (fileType !== "PDF" || !pdfDoc || !canvasesRef.current) return;

    let isCurrentRender = true;
    const canvasContainer = canvasesRef.current;
    
    // Clear pre-existing canvases
    canvasContainer.innerHTML = "";

    const renderAllPages = async () => {
      try {
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          if (!isCurrentRender) break;

          const page = await pdfDoc.getPage(pageNum);
          if (!isCurrentRender) break;

          // Calculate viewport with scale (zoom)
          // Default: Fit Width in container
          const targetWidth = containerWidth;
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          const fitScale = (targetWidth - 32) / unscaledViewport.width;
          const currentScale = fitScale * zoom;

          const viewport = page.getViewport({ scale: currentScale });

          // Create container for pagination gap
          const pageWrapper = document.createElement("div");
          pageWrapper.className = "my-4 mx-auto shadow-lg bg-white rounded border border-slate-200 overflow-hidden relative group";
          pageWrapper.style.width = `${viewport.width}px`;
          pageWrapper.style.height = `${viewport.height}px`;

          const canvas = document.createElement("canvas");
          canvas.className = "block max-w-full";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          pageWrapper.appendChild(canvas);

          // Page Number tag overlay in bottom-right margin
          const pageTag = document.createElement("div");
          pageTag.className = "absolute bottom-2 right-2 bg-slate-900/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none";
          pageTag.innerText = `Page ${pageNum} / ${numPages}`;
          pageWrapper.appendChild(pageTag);

          canvasContainer.appendChild(pageWrapper);

          const context = canvas.getContext("2d");
          if (context) {
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            await page.render(renderContext).promise;
          }
        }
      } catch (err) {
        console.error("Error rendering PDF pages:", err);
      }
    };

    renderAllPages();

    return () => {
      isCurrentRender = false;
    };
  }, [pdfDoc, numPages, zoom, fileType, containerWidth]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => setZoom(1.0);

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Professional Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white flex items-center gap-1.5 leading-none">
              Uploaded Resume Preview
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
              {fileType} &bull; {(file.size / 1024).toFixed(0)} KB &bull; Verified Build
            </p>
          </div>
        </div>

        {/* Zoom and Scale Controls */}
        <div className="flex items-center gap-1.5 self-center">
          <button
            onClick={handleZoomOut}
            disabled={loading || !!error}
            className="p-1 px-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          
          <span className="text-[10px] font-mono font-medium text-slate-350 min-w-[50px] text-center border border-white/5 bg-slate-950 px-2 py-1 rounded">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={loading || !!error}
            className="p-1 px-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetZoom}
            disabled={loading || !!error}
            className="p-1 px-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition text-[9px] font-mono uppercase disabled:opacity-40 disabled:cursor-not-allowed"
            title="Reset to 100%"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Document Display Stage */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-auto p-4 bg-slate-900/40 relative min-h-[350px] max-h-[600px] flex justify-center items-start"
      >
        {loading && (
          <div className="absolute inset-0 bg-slate-950/80 z-20 flex flex-col items-center justify-center space-y-3 p-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-200">Processing Uploaded Resume...</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[280px]">
                Preserving font weights, structural margins, tables, and colors natively in-app.
              </p>
            </div>
          </div>
        )}

        {error ? (
          <div className="my-auto mx-auto max-w-[340px] text-center p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-xs font-bold text-red-200">{error}</p>
            <p className="text-[10px] text-slate-400">
              Ensure the uploaded file is not corrupted and is in standard PDF or Microsoft Word DOCX formats.
            </p>
          </div>
        ) : fileType === "TXT" ? (
          <div 
            className="w-full max-w-[800px] mx-auto bg-white p-6 sm:p-12 shadow-md rounded-lg text-left border border-slate-200"
            style={{ 
              fontSize: `${zoom * 12}px`,
              color: "#333333",
              fontFamily: 'JetBrains Mono, Courier New, monospace, var(--font-mono)'
            }}
          >
            <pre className="whitespace-pre-wrap leading-relaxed select-text">{txtContent}</pre>
          </div>
        ) : (
          <div 
            ref={canvasesRef}
            className="w-full flex flex-col items-center select-all transition-transform duration-200 origin-top"
            style={{ 
              transform: fileType === "DOCX" ? `scale(${zoom})` : undefined,
              transformOrigin: fileType === "DOCX" ? "top center" : undefined
            }}
          />
        )}
      </div>

      {/* Footer Info bar */}
      {!error && !loading && (
        <div className="px-4 py-2 bg-slate-950 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-500" /> Loaded Successfully
          </span>
          <span>
            {fileType === "PDF" ? `${numPages} page(s) rendered` : fileType === "DOCX" ? "DOCX Preserved" : "TXT Formatted"}
          </span>
        </div>
      )}
    </div>
  );
}
