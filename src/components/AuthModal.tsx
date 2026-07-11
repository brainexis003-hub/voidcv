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
  X,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targetFeatureName?: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, targetFeatureName }: AuthModalProps) {
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

  if (!isOpen) return null;

  const cleanFirebaseError = (errMessage: string) => {
    if (errMessage.includes("auth/invalid-email")) {
      return "Please enter a valid email address.";
    }
    if (errMessage.includes("auth/weak-password")) {
      return "Password should be at least 6 characters long.";
    }
    if (
      errMessage.includes("auth/user-not-found") || 
      errMessage.includes("auth/wrong-password") || 
      errMessage.includes("auth/invalid-credential")
    ) {
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

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setError("Please enter a valid email address first.");
      return;
    }

    setLoading(true);
    try {
      console.log("[AuthModal] Launching sendPasswordResetEmail target:", emailTrimmed);
      await sendPasswordResetEmail(auth, emailTrimmed);
      setResetEmailSent(true);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      console.error("[AuthModal] Password reset failed:", err);
      let msg = err.message || String(err);
      if (err.code === "auth/user-not-found") {
        msg = "This email is not registered with us.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Please enter a valid email address.";
      }
      setError(cleanFirebaseError(msg));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetResend = async () => {
    setError(null);
    setResendStatus("sending");
    const emailTrimmed = email.trim();

    try {
      console.log("[AuthModal] Resending sendPasswordResetEmail to:", emailTrimmed);
      await sendPasswordResetEmail(auth, emailTrimmed);
      setResendStatus("sent");
      // clear status after 3.5 seconds
      setTimeout(() => setResendStatus(null), 3500);
    } catch (err: any) {
      console.error("[AuthModal] Password reset resend failed:", err);
      setError(cleanFirebaseError(err.message || String(err)));
      setResendStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (isSignUp && !fullName.trim()) {
      setError("Please fill in your Full Name.");
      return;
    }

    const emailTrimmed = email.trim();
    if (!emailTrimmed || !password.trim()) {
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
        const userCredential = await createUserWithEmailAndPassword(auth, emailTrimmed, password);
        await updateProfile(userCredential.user, {
          displayName: fullName.trim()
        });
      } else {
        await signInWithEmailAndPassword(auth, emailTrimmed, password);
      }
      onSuccess();
    } catch (err: any) {
      console.error("[AuthModal] Email Auth FAILED:", err);
      setError(cleanFirebaseError(err.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal body container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-md bg-[#0D0D11] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden select-text"
        >
          {/* Top colored aesthetic bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Close button */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge & Heading */}
          <div className="text-center mb-6 pt-2">
            <div className="inline-flex w-10 h-10 bg-indigo-600 rounded-xl items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20 mb-3 font-display text-lg">
              VC
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white font-display">
              Sign in to continue
            </h2>
            <p className="text-xs text-slate-400 mt-2 px-3">
              {targetFeatureName 
                ? `Create a free account or log in to unlock ${targetFeatureName} and save your progress.`
                : "Create your free account to access VoidCV features and save your progress."
              }
            </p>
          </div>

          {/* Display Success Box */}
          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl flex items-start gap-2.5 text-xs text-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{successMessage}</span>
            </div>
          )}

          {/* Display Error Box */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/5 border border-red-500/15 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {isForgotPassword ? (
            resetEmailSent ? (
              /* Success / Fallback Instructions display context */
              <div className="space-y-5 py-2">
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
              /* Forgot Password Form input screen */
              <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5">
                    Your Account Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Password Reset Email</span>
                      <ArrowRight className="w-4 h-4" />
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
                  className="w-full py-2.5 bg-transparent hover:bg-white/5 text-slate-400 text-[11px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to login stage</span>
                </button>
              </form>
            )
          ) : (
            /* Login / Signup form */
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 mb-1.5 px-0.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
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
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
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
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      disabled={loading}
                      minLength={6}
                      className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
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
                        className="text-[10px] text-slate-400 hover:text-indigo-400 hover:underline transition font-medium cursor-pointer"
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        required
                        disabled={loading}
                        minLength={6}
                        className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 transition-all font-sans"
                        placeholder="******"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? "Create Free Account" : "Access Workspace"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Switch flow footer links */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
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

          {/* Secure details tag */}
          <div className="mt-4 flex items-center justify-center gap-1 text-[9px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500/40 animate-pulse" />
            <span>Secured securely by Firebase Authentication</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
