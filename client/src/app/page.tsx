"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F3F0",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "700",
            color: "#1a1a1a",
            margin: "0 0 24px 0",
            letterSpacing: "-1px",
            lineHeight: "1.1",
          }}
        >
          NutriScan
        </h1>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#666",
            lineHeight: "1.5",
            margin: "0",
            maxWidth: "320px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Make better food choices with a single scan
        </p>
        <div
          className="mt-8 animate-pulse"
          style={{
            marginTop: "48px",
          }}
        >
          <div
            className="w-12 h-12 mx-auto rounded-full"
            style={{
              backgroundColor: "#1a4e3a",
              width: "48px",
              height: "48px",
              margin: "0 auto",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
