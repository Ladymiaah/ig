"use client";

import { useMessage } from "@/app/providers/MessageProvider";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";



export default function SignupPage() {
  const router = useRouter();
  const push = useMessage();

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      push("Account created successfully!", "success");
      router.push("/invoice-actions/SavedInvoices");
    } catch (error) {
      console.error("Signup Error:", error);
      push("Could not complete signup. Try again later.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Get Started</h2>
        <p className="text-slate-500 mb-8">Create your account with just one click.</p>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200"
        >
          <div className="bg-white p-1 rounded-full">
            <FcGoogle size={20} />
          </div>
          Sign up with Google
        </button>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
           <Link href="/firebase-auth/Login"  className="text-blue-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}