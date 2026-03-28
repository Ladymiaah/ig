"use client";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";



export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Logged in:", result.user.displayName);
      router.push("/"); 
    } catch (error) {
      console.error("Login Error:", error);
      alert("Failed to sign in. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center">
        {/* Logo/Icon placeholder */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200">
          <span className="text-white text-3xl font-bold">!</span>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8">Please sign in to manage your invoices.</p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm"
        >
          {/* If you didn't install react-icons, you can use an <img> tag for the Google G logo */}
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="mt-8 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Secure Authentication by Firebase
        </p>
      </div>
    </div>
  );
}