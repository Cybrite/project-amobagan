"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

const workoutOptions = [
  {
    id: "everyday",
    frequency: "7x",
    label: "Every day",
    description: "Maximum intensity training",
  },
  {
    id: "4-6_week",
    frequency: "4-6x",
    label: "4-6 times a week",
    description: "High intensity training",
  },
  {
    id: "2-3_week",
    frequency: "2-3x",
    label: "2-3 times a week",
    description: "Moderate training schedule",
  },
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
    <div className="w-full bg-[#F0EDE4] rounded-2xl shadow-xl p-8">
      <StepIndicator
        currentStep={1}
        totalSteps={7}
        onBack={handleBack}
        variant="light"
      />

      <Card className="bg-[#F0EDE4] w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            How many times do you workout per week?
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            <div className="space-y-4">
              {workoutOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedFrequency(option.id)}
                  className={`
                      p-6 cursor-pointer transition-all border-2 w-full bg-white
                      ${
                        selectedFrequency === option.id
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
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
                      <div>
                        <div className="text-2xl font-bold text-[#004743]">
                          {option.frequency}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Dumbbell
                        className={`w-6 h-6 ${
                          selectedFrequency === option.id
                            ? "text-[#004743]"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
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
  );
}
