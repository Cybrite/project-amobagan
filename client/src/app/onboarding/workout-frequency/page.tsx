"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const workoutOptions = [
  { id: "everyday", label: "Every day" },
  { id: "4-6_week", label: "4-6 times a week" },
  { id: "2-3_week", label: "2-3 times a week" },
  { id: "once_week", label: "Once a week" },
  { id: "rarely", label: "Rarely" },
];

export default function WorkoutFrequencyPage() {
  const router = useRouter();
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFrequency) return;

    // Store the selection in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        workoutFrequency: selectedFrequency,
      })
    );

    router.push("/onboarding/height-weight");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              How many times do you workout per week?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                {workoutOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedFrequency(option.id)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all border-2
                      ${
                        selectedFrequency === option.id
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                        ${
                          selectedFrequency === option.id
                            ? "border-[#004743]"
                            : "border-gray-400"
                        }
                      `}
                      >
                        {selectedFrequency === option.id && (
                          <div className="w-3 h-3 rounded-full bg-[#004743]" />
                        )}
                      </div>
                      <span className="text-lg">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                disabled={!selectedFrequency}
                className="w-full bg-[#004743] text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] mt-6"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
