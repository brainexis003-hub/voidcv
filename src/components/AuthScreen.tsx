import React, { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { 
  Lock, 
  Mail, 
  Loader2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  User,
  Twitter,
  Linkedin,
  Github,
  Globe
} from "lucide-react";

interface AuthScreenProps {
  onBackToHome?: () => void;
}

export function AuthScreen({ onBackToHome }: AuthScreenProps = {}) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null); // "sending" | "sent" | null

  const cleanFirebaseError = (errMessage: string) => {
    // Translates firebase-auth-related error codes to user-friendly text
    if (errMessage.includes("auth/invalid-email")) {
      return "Please enter a valid email address.";
    }
    if (errMessage.includes("auth/weak-password")) {
      return "Password should be at least 6 characters long.";
    }
    if (errMessage.includes("auth/user-not-found") || errMessage.includes("auth/wrong-password") || errMessage.includes("auth/invalid-credential")) {
      return "Incorrect email or password. Please try again.";
    }
    if (errMessage.includes("auth/email-already-in-use")) {
      return "An account with this email already exists.";
    }
    if (errMessage.includes("auth/missing-password")) {
      return "Please enter a password.";
    }
    if (errMessage.includes("auth/user-not-found")) {
      return "No account was found with this email address.";
    }
    return errMessage;
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setResendStatus(null);

    console.log("[VoidCV Auth] PASSWORD RESET SUBMITTED - Initiating diagnosis sequence...");
    
    // Diagnostic 1: Verify the email string to ensure it's captured and trimmed correctly.
    const emailTrimmed = email.trim();
    console.log("[VoidCV Auth] Diagnostic (Input): Captured untrimmed raw email state:", email);
    console.log("[VoidCV Auth] Diagnostic (Input): Trimmed email length:", emailTrimmed.length, "Value:", emailTrimmed);

    if (!emailTrimmed) {
      console.warn("[VoidCV Auth] Diagnostic (Input) FAILED: Trimming email returned empty string.");
      setError("Please enter a valid email address first.");
      return;
    }

    // Diagnostic 2: Check Firebase Authentication object status.
    console.log("[VoidCV Auth] Diagnostic (Auth Object Instance):", auth);
    if (!auth) {
      console.error("[VoidCV Auth] Diagnostic (Auth Object Instance) CRITICAL ERROR: Firebase Auth instance is undefined or global import failed.");
      setError("Firebase Authentication is not initialized properly.");
      return;
    }
    console.log("[VoidCV Auth] Diagnostic (Auth config): Domain/Project details checked of current app:", auth.app?.options);

    setLoading(true);
    try {
      console.log("[VoidCV Auth] Calling sendPasswordResetEmail with details... Target User:", emailTrimmed);
      
      // Execute reset email call.
      await sendPasswordResetEmail(auth, emailTrimmed);
      
      console.log("[VoidCV Auth] sendPasswordResetEmail call finished successfully for:", emailTrimmed);
      setResetEmailSent(true);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      // Diagnostic 5: Add detailed try/catch logging for the complete Firebase error object.
      console.error("[VoidCV Auth] sendPasswordResetEmail call FAILED. Printing complete error info block:");
      console.error(" - Complete Error Obj:", err);
      console.error(" - Code:", err?.code);
      console.error(" - Message:", err?.message);
      console.error(" - Stack:", err?.stack);

      // Fallback translation matching exact patterns
      let msg = err.message || String(err);
      if (err.code === "auth/user-not-found" || err.message?.includes("auth/user-not-found")) {
        msg = "This email is not registered with us.";
      } else if (err.code === "auth/invalid-email" || err.message?.includes("auth/invalid-email")) {
        msg = "Please enter a valid email address.";
      } else if (err.code === "auth/network-request-failed" || err.message?.includes("network-request-failed")) {
        msg = "Network request failed. Please check your internet connection.";
      }
      
      setError(cleanFirebaseError(msg));
    } finally {
      setLoading(false);
      console.log("[VoidCV Auth] PASSWORD RESET sequence completed.");
    }
  };

  const handlePasswordResetResend = async () => {
    setError(null);
    setResendStatus("sending");
    const emailTrimmed = email.trim();

    try {
      console.log("[AuthScreen] Resending sendPasswordResetEmail to:", emailTrimmed);
      await sendPasswordResetEmail(auth, emailTrimmed);
      setResendStatus("sent");
      setTimeout(() => setResendStatus(null), 3500);
    } catch (err: any) {
      console.error("[AuthScreen] Password reset resend failed:", err);
      setError(cleanFirebaseError(err.message || String(err)));
      setResendStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Dynamic checks
    if (isSignUp && !fullName.trim()) {
      setError("Please fill in your Full Name.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(userCredential.user, {
          displayName: fullName.trim()
        });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err: any) {
      console.error("Auth Error details:", err);
      setError(cleanFirebaseError(err.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070709] bg-radial-[at_top_center] from-[#1e1b4b]/20 to-[#070709] flex flex-col justify-between items-center py-12 px-4 relative">
      
      {/* Back to Home CTA if provided */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/10 transition duration-200 cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      )}

      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      {/* Main Centering Container for Card */}
      <div className="flex-1 flex items-center justify-center w-full max-w-md my-auto relative z-10 py-6">
        {/* Main Container Card */}
        <div className="w-full bg-[#0D0D11]/90 border border-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Subtle upper accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        {/* Top Logo Panel */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30 mb-4 font-display text-xl tracking-tight">
            VC
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            VoidCV
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            {isForgotPassword
              ? "Recover access to your professional account."
              : isSignUp 
                ? "Create your professional account to unlock all AI tools." 
                : "Welcome back! Access your portfolios, CVs, and analyzer."}
          </p>
        </div>

        {/* Display Success Box */}
        {successMessage && (
          <div className="mb-5 p-3.5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl flex items-start gap-2.5 text-xs text-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-normal">{successMessage}</span>
          </div>
        )}

        {/* Display Error Box */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-500/5 border border-red-500/15 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-normal">{error}</span>
          </div>
        )}

        {isForgotPassword ? (
          resetEmailSent ? (
            /* Success / Fallback Instructions display context */
            <div className="space-y-5 py-2 text-left">
              <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-inner">
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Mail className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Password Reset Email Sent
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-2 px-1 leading-relaxed">
                    We've sent a password reset link to your email address:
                  </p>
                  <p className="text-[11px] font-mono font-medium text-indigo-300 mt-1 truncate max-w-xs bg-slate-950/40 border border-white/5 py-1 px-3 rounded-lg mx-auto">
                    {email}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-white/5 p-4 rounded-2xl">
                <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                  <strong>Please check your Inbox first.</strong>
                </p>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">
                  If you do not see our message within a few minutes, please check your <strong>Spam</strong>, <strong>Junk</strong>, or <strong>Promotions</strong> folders in case it was routed away.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  disabled={resendStatus === "sending" || loading}
                  onClick={handlePasswordResetResend}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-505 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 transition-all disabled:opacity-50"
                >
                  {resendStatus === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : resendStatus === "sent" ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Resent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Resend Email</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setResetEmailSent(false);
                    setResendStatus(null);
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="w-full py-2 bg-transparent hover:bg-white/5 text-slate-350 border border-white/5 hover:border-white/10 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Wrong Email Address? Try Again</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetEmailSent(false);
                  setResendStatus(null);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="w-full py-2 text-slate-400 hover:text-white text-[11px] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white/5 transition-all mt-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to login stage</span>
              </button>
            </div>
          ) : (
            /* Password Reset Request Form */
            <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5 text-left">
                  Registered Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans text-left"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/15 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Password Reset Email</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setIsForgotPassword(false);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="w-full py-2.5 px-4 bg-transparent hover:bg-white/5 text-slate-350 border border-white/5 hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to login stage</span>
              </button>
            </form>
          )
        ) : (
          /* Main Input Form (Login/Signup) */
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  disabled={loading}
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {!isSignUp && (
                <div className="flex justify-end mt-1.5 px-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[11px] text-slate-400 hover:text-indigo-400 hover:underline transition font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    disabled={loading}
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
                    placeholder="******"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/15 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? "Create Free Account" : "Access AI Workspace"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

          </form>
        )}

        {/* Mode Toggle Footer */}
        <div className="mt-8 pt-5 border-t border-white/5 text-center">
          <p className="text-xs text-slate-400">
            {isForgotPassword 
              ? "Know your password already?" 
              : isSignUp 
                ? "Already have an account?" 
                : "New to VoidCV?"}{" "}
            <button
              onClick={() => {
                if (isForgotPassword) {
                  setIsForgotPassword(false);
                } else {
                  setIsSignUp(!isSignUp);
                }
                setError(null);
                setSuccessMessage(null);
              }}
              disabled={loading}
              className="text-indigo-400 font-medium hover:text-indigo-300 ml-1 underline cursor-pointer disabled:opacity-40"
            >
              {isForgotPassword 
                ? "Log In here" 
                : isSignUp 
                  ? "Log In here" 
                  : "Sign Up free"}
            </button>
          </p>
        </div>

        {/* Extra Privacy Info tag */}
        <div className="mt-6 flex items-center justify-center gap-1 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500/50" />
          <span>Secured by Google Firebase Auth</span>
        </div>
      </div>
    </div>

  {/* Semantic Premium Footer for Login Page */}
  <footer id="login-footer" className="w-full max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 relative z-10 font-sans text-xs text-slate-400">
    {/* Subtle top glowing divider */}
    <div 
      id="login-footer-divider"
      className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-sm"></div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-6">
      {/* Left Section: Brand Section */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
        <p className="text-slate-300 font-medium">
          Powered by{" "}
          <a 
            href="https://brainexis.web.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block font-bold text-white hover:text-indigo-400 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded px-1 group/link"
          >
            Brainexis
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 group-hover/link:w-full transition-all duration-300 shadow-[0_0_8px_#6366f1]" aria-hidden="true"></span>
          </a>
        </p>
        <p className="text-[11px] text-slate-500 font-mono tracking-wide">
          Intelligent Software &bull; AI Solutions &bull; SaaS Development
        </p>
      </div>

      {/* Right Section: Social Media Icons */}
      <div id="login-footer-socials" className="flex items-center gap-4">
        <a 
          href="https://x.com/brainexis003" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
          className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none transition-all duration-300"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a 
          href="https://www.linkedin.com/in/brainexis-ai-114674419" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none transition-all duration-300"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a 
          href="https://github.com/brainexis003-hub" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none transition-all duration-300"
        >
          <Github className="w-4 h-4" />
        </a>
        <a 
          href="https://brainexis.web.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Official Website"
          className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none transition-all duration-300"
        >
          <Globe className="w-4 h-4" />
        </a>
      </div>
    </div>

    {/* Bottom Section: Copyright */}
    <div className="w-full text-center mt-6 text-[11px] text-slate-500 font-mono">
      <p>
        &copy; 2026 VoidCV &bull; Powered by{" "}
        <a 
          href="https://brainexis.web.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-indigo-400 underline decoration-indigo-500/20 hover:decoration-indigo-500 transition-colors duration-200"
        >
          Brainexis
        </a>{" "}
        &bull; All Rights Reserved.
      </p>
    </div>
  </footer>
</div>
  );
}
