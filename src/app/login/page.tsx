"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  const handleLoginError = (error: string) => {
    console.error("Login failed:", error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">B</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your HRM account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <LoginForm
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-medium text-orange-600 hover:text-orange-500">
              Sign UP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
