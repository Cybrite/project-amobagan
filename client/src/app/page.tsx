"use client";
import { useState } from "react";
import OnboardingFlow from "@/components/features/onboarding_flow/onboarding";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <OnboardingFlow />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F3F0",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0 20px",
          maxWidth: "100%",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#666",
              margin: "0 0 8px 0",
              letterSpacing: "0.3px",
            }}
          >
            Welcome to
          </h2>
          <h1
            style={{
              fontSize: "48px",
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
              fontSize: "16px",
              fontWeight: "400",
              color: "#666",
              lineHeight: "1.5",
              margin: "0",
              maxWidth: "280px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            A Community driven initiative to let you make better food choices
          </p>
        </div>

        {/* Placeholder Boxes Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "16px",
            height: "320px",
            marginBottom: "60px",
          }}
        >
          {/* Large left box */}
          <div
            style={{
              gridRow: "1 / 3",
              backgroundColor: "transparent",
              border: "2px solid #1a1a1a",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f8f8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#e5e5e5",
                borderRadius: "50%",
              }}
            ></div>
          </div>

          {/* Top right box */}
          <div
            style={{
              backgroundColor: "transparent",
              border: "2px solid #1a1a1a",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f8f8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e5e5e5",
                borderRadius: "50%",
              }}
            ></div>
          </div>

          {/* Bottom right box */}
          <div
            style={{
              backgroundColor: "transparent",
              border: "2px solid #1a1a1a",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f8f8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e5e5e5",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        </div>

        {/* Get Started Button */}
        <div
          style={{
            marginTop: "auto",
            marginBottom: "40px",
          }}
        >
          {" "}
          <button
            style={{
              width: "100%",
              backgroundColor: "#1a4e3a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "18px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.3px",
            }}
            onClick={() => setShowOnboarding(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#145032";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(26, 78, 58, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1a4e3a";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .nutriscan-container {
            max-width: 400px;
            margin: 0 auto;
          }
        }
        
        @media (min-width: 1024px) {
          .nutriscan-container {
            padding: 40px;
          }
        }
        
        @media (max-width: 480px) {
          .nutriscan-grid {
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
}
