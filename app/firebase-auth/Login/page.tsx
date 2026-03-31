"use client";

import { useState } from "react";
import { useMessage } from "@/app/providers/MessageProvider";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";

// 1. ADD THIS LINE: Tells Next.js to skip static pre-rendering for this page.
// This prevents the "invalid-api-key" error during npm run build.
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const push = useMessage();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    // Prevent multiple clicks
    if (loading) return;
    
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      push(
        `Welcome back, ${result.user.displayName || "User"}!`,
        "success"
      );

      router.push("/invoice-actions/SavedInvoices");
    } catch (error: any) {
      console.error("Login Error:", error);

      // Professional error handling
      const message = error?.code === "auth/popup-closed-by-user" 
        ? "Sign-in cancelled." 
        : "Failed to sign in. Please check your connection.";

      push(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 text-center">
        
        {/* Branding Icon */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-100">
          <FiFileText className="text-white text-3xl" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Welcome Back
        </h1>

        {/* Improved Microcopy */}
        <p className="text-slate-500 mb-10 font-medium">
          Sign in to access your invoices and billing dashboard.
        </p>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`group w-full flex items-center justify-center gap-3 font-bold py-4 px-4 rounded-2xl transition-all duration-200 border-2
            ${
              loading
                ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95"
            }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              <span>Authenticating...</span>
            </div>
          ) : (
            <>
              <FcGoogle size={24} />
              Continue with Google
            </>
          )}
        </button>

        {/* Trust Signal */}
        <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
          <span>Secure Authentication</span>
        </div>
      </div>
    </div>
  );
}