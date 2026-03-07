"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleConfirmPassword = () => {
    return confirmPassword === password && password.length >= 8;
  };

  const verifyEmail = () => {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (email.length > 0) {
      setEmailValid(pattern.test(email));
    }
    return pattern.test(email);
  };

  const handleVerifyOtp = async () => {
    setVerifying(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      console.log(data, error);
      if (data) {
        setVerified(true);
      }
    } catch (error) {
      console.error(error);
      setToken("");
    } finally {
      setVerifying(false);
    }
  };

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center align-center ">
      {!submitted ? (
        <div className="flex flex-col flex-1 bg-card max-h-fit p-10 rounded-md">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "border-2 rounded-md p-1 my-4",
              emailValid ? "border-2 border-green-500" : "",
            )}
          />

          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={cn(
              "border rounded-md p-1 my-4",
              handleConfirmPassword() && password.length >= 8
                ? "border-2 border-green-500"
                : "",
            )}
          />
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={cn(
              "border rounded-md p-1 my-4",
              handleConfirmPassword() && password.length > 8
                ? "border-2 border-green-500"
                : "",
            )}
          />
          <button
            className={cn(
              "bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-700 flex items-center justify-center",
              !handleConfirmPassword() || password.length < 8
                ? "opacity-50 cursor-not-allowed"
                : "",
            )}
            onClick={() => {
              verifyEmail();
              handleSignUp();
            }}
            disabled={!handleConfirmPassword() || password.length < 8}
          >
            {submitted ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-1 bg-background max-h-fit p-4 rounded-md">
          <input
            type="text"
            placeholder="Enter your token"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
            className="border rounded-md p-1 my-4"
          />
          <button
            className={cn(
              "bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-700 flex items-center justify-center",
              !handleConfirmPassword() || password.length < 8
                ? "opacity-50 cursor-not-allowed"
                : "",
            )}
            onClick={() => {
              handleVerifyOtp();
            }}
            disabled={!handleConfirmPassword() || password.length < 8}
          >
            {verifying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Verify"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
