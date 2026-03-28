"use client";

import { useState } from "react";
import { useMessage } from "@/app/providers/MessageProvider";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const push = useMessage();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      push(
        `Welcome back, ${result.user.displayName || "User"}!`,
        "success"
      );

      router.push("/");
    } catch (error: any) {
      console.error("Login Error:", error);

      // More helpful + flexible error message
      const message =
        error?.message?.replace("Firebase:", "").trim() ||
        "Failed to sign in. Please try again.";

      push(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center animate-fade-in">
        
        {/* Branding Icon */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200">
          <FiFileText className="text-white text-2xl" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
          Welcome Back
        </h2>

        {/* Improved Microcopy */}
        <p className="text-slate-500 mb-8">
          Sign in to access your invoices and billing dashboard.
        </p>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          aria-label="Sign in with Google"
          className={`w-full flex items-center justify-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm border
            ${
              loading
                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
            }`}
        >
          {loading ? (
            <span className="animate-pulse">Signing in...</span>
          ) : (
            <>
              <FcGoogle size={24} />
              Continue with Google
            </>
          )}
        </button>

        {/* Trust Signal */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          <span>🔒</span>
          <span>Secure Authentication by Firebase</span>
        </div>
      </div>
    </div>
  );
}