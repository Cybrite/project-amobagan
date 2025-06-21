"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding/carousel");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md text-center space-y-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to NutriScan</h1>
          <p className="text-lg text-gray-600">
            Your personal nutrition assistant that helps you make better food
            choices
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-[#004743] text-white font-medium py-6 text-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Get Started
          </Button>

          <Button
            onClick={handleLogin}
            variant="outline"
            className="w-full py-6 text-xl border-2 border-[#004743] text-[#004743] bg-transparent hover:bg-[#004743]/5"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
