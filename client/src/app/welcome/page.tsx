"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding/carousel");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-8 right-8 animate-fade-in-delayed">
        <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white shadow-sm overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Profile"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full max-w-sm space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-3xl text-gray-700 font-normal">Welcome to</h2>
            <h1 className="text-5xl font-bold text-black">NutriScan</h1>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed px-2">
            A Community driven initiative to let you make better food choices
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 gap-4 h-64 animate-fade-in-up-delayed">
          {/* Large card on the left */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm"></div>

          {/* Two stacked cards on the right */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[120px]"></div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[120px]"></div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="space-y-8 animate-fade-in-up-more-delayed">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-[#004743] hover:bg-[#003a37] text-white font-medium py-6 text-xl rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-sm"
          >
            Get Started
          </Button>

          <button
            onClick={handleLogin}
            className="w-full text-gray-600 hover:text-gray-800 text-lg font-medium transition-colors duration-200"
          >
            Already Have an account? Login
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-up-delayed {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .animate-fade-in-up-more-delayed {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.6s forwards;
        }
      `}</style>
    </div>
  );
}
