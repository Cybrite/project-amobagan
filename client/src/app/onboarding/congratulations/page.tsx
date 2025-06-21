"use client";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CongratulationsPage() {
  const router = useRouter();

  const handleStartScanning = () => {
    // Store user as logged in
    try {
      const userDetails = JSON.parse(
        sessionStorage.getItem("userDetails") || "{}"
      );
      const userPreferences = JSON.parse(
        sessionStorage.getItem("userPreferences") || "{}"
      );

      // Store in localStorage for persistence
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userDetails,
          ...userPreferences,
          isLoggedIn: true,
        })
      );
    } catch (error) {
      console.error("Error storing user data:", error);
    }

    // Navigate to scan page
    router.push("/scan");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#F0EDE4] border-[#004743] border-2 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#004743] to-[#009688]"></div>

          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#004743] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>

            <p className="text-gray-600 mb-8">
              Your profile is all set up. You&apos;re ready to start making
              healthier food choices with personalized nutrition insights.
            </p>

            <div className="mb-8 p-4 bg-[#004743]/10 rounded-lg">
              <h3 className="font-semibold text-[#004743] mb-2">Next Step</h3>
              <p className="text-sm text-gray-600">
                Start scanning product barcodes to get instant nutritional
                analysis tailored to your profile.
              </p>
            </div>

            <Button
              onClick={handleStartScanning}
              className="w-full bg-[#004743] text-white font-medium py-4 text-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Start Scanning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
