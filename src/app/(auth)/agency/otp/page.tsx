"use client";

import React, { Suspense, useState } from "react";
import OtpForm from "../../_components/otp-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleVerifyOtp = async (otp: string, email: string) => {
    if (otp.length !== 6 || !email) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      console.log("Verifying OTP for", email, otp);
      toast.success("OTP Verified Successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid OTP. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async (email: string) => {
    setIsResending(true);
    try {
      console.log("Resending OTP to", email);
      toast.success("OTP resent successfully");
      setCountdown(30);
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="lg:w-1/3 border p-8 rounded-lg shadow-lg mx-4 lg:mx-auto">
          <OtpForm
            email="example@gmail.com"
            userType="user"
            title="Verify Your Account"
            onSubmit={handleVerifyOtp}
            onResend={handleResendOtp}
            isVerifying={isVerifying}
            isResending={isResending}
            countdown={countdown}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default LoginPage;
