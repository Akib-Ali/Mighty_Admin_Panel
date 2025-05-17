"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type UserType = "user" | "agent" | "agency";

interface OtpFormProps {
  email: string;
  userType: UserType;
  title?: string;
  onSubmit: (otp: string, email: string) => Promise<void>;
  onResend: (email: string) => Promise<void>;
  isVerifying?: boolean;
  isResending?: boolean;
  countdown: number
}

const OtpForm: React.FC<OtpFormProps> = ({
  email,
  userType,
  title = "Verify OTP",
  onSubmit,
  onResend,
  isVerifying = false,
  isResending = false,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = countdown > 0 ? setTimeout(() => setCountdown((c) => c - 1), 1000) : null;
    return () => clearTimeout(timer as NodeJS.Timeout);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpValues.join("");
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    await onSubmit(code, email);
  };

  const handleResendOtp = async () => {
    await onResend(email);
    setCountdown(30);
  };

  const titleMap = {
    user: "Verify Your Account",
    agent: "Agent OTP Verification",
    agency: "Agency Verification",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 sm:p-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title || titleMap[userType]}</h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <OtpInput value={otpValues} onChange={setOtpValues} />

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0 || isResending}
              className="text-sm text-blue-600 hover:underline disabled:opacity-50"
            >
              {countdown > 0
                ? `Resend OTP in ${countdown}s`
                : isResending
                ? "Resending..."
                : "Resend OTP"}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

interface OtpInputProps {
  value: string[];
  onChange: (val: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...value];
    updated[index] = val.slice(-1);
    onChange(updated);
    if (val && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = paste.split("").concat(Array(6 - paste.length).fill(""));
    onChange(newOtp);
    newOtp.forEach((val, i) => {
      if (inputRefs.current[i]) inputRefs.current[i]!.value = val;
    });
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  return (
    <div className="flex justify-between gap-2">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
            return;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OtpForm;
