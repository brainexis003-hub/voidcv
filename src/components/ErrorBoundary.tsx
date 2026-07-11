import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// @ts-ignore
export class ErrorBoundary extends Component<Props, State> {
  // @ts-ignore
  public state: State;
  // @ts-ignore
  public props: Props;
  // @ts-ignore
  public setState: (state: Partial<State> | ((state: State) => Partial<State>)) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Unhandled error caught in React tree:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    try {
      const keysToClear = Object.keys(localStorage);
      keysToClear.forEach(key => {
        if (key.startsWith("voidcv_") || key.includes("resume") || key.includes("state")) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.error("Failed to clear localStorage during error recovery", e);
    }
    
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#070709] bg-radial-[at_top_center] from-[#1e1b4b]/20 to-[#070709] flex flex-col justify-center items-center p-6 text-slate-200">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

          <div className="w-full max-w-md bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center z-10">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />

            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>

            <h1 className="text-xl font-sans font-medium text-white mb-2 tracking-tight">
              Interface Encountered an Issue
            </h1>
            
            <p className="text-sm text-slate-400 mb-6 font-sans leading-relaxed">
              An unexpected error occurred while rendering the application. We have safely intercepted this to prevent a crash.
            </p>

            {this.state.error && (
              <div className="w-full bg-black/40 border border-white/5 p-3 rounded-xl mb-6 text-left overflow-auto max-h-32 font-mono text-[11px] text-red-300">
                <span className="font-bold text-red-400">Error:</span> {this.state.error.message}
                {this.state.error.stack && (
                  <pre className="mt-1 text-slate-500 overflow-x-auto whitespace-pre">
                    {this.state.error.stack.split("\n").slice(0, 3).join("\n")}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                id="error-reload-btn"
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                id="error-reset-btn"
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 text-slate-300 hover:text-white text-sm font-medium transition duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
              >
                <span>Reset State & Start Clean</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-[11px] text-slate-600 font-mono">
            VoidCV Recovery Protocol &bull; All systems failing gracefully
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
