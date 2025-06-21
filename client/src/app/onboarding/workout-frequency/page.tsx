"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

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

  const handleBack = () => {
    router.push("/onboarding/user-details");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <StepIndicator
          currentStep={1}
          totalSteps={7}
          onBack={handleBack}
          variant="light"
        />

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
