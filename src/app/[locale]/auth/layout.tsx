"use client";
// app/(auth)/layout.tsx
import "@/styles/scss/layout/_auth.scss";

import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth">
      <div className="auth__left">
        <Image
          src="/images/auth-image-1.png"
          alt="Auth background"
          fill
          className="auth__left-image"
        />
      </div>

      <div className="auth__right">
        <div className="auth__content">
          <div className="auth__logo" >
            <Image  
              src="/images/logo.svg"
              alt="Capital Prev"
              width={103}
              height={68}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

 