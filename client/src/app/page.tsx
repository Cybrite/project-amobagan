"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
      className="bg-[#F0EDE4"
    >
      <img
        src="https://res.cloudinary.com/dqqyuvg1v/image/upload/v1750537445/ChatGPT_Image_Jun_22_2025_12_34_08_AM_t2mgyn.png"
        alt="NutriScan Landing"
        style={{
          width: "100%",
          height: "60vh",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
