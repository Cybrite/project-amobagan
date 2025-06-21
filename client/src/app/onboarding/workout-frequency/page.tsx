"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Dumbbell, Weight, BicepsFlexed } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

const workoutOptions = [
  {
    id: "0-2",
    frequency: "0-2",
    label: "0-2",
    description: "Worksout now and then",
    icon: Weight,
  },
  {
    id: "3-5",
    frequency: "3-5",
    label: "3-5",
    description: "A few times in a week",
    icon: Dumbbell,
  },
  {
    id: "6+",
    frequency: "6+",
    label: "6+",
    description: "Athelete",
    icon: BicepsFlexed,
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
      <div className="bg-[#F0EDE4] w-full">
        <div className="text-center pb-6">
          <h1 className="text-2xl font-bold">
            How many times do you workout per week?
          </h1>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            <div className="space-y-4">
              {workoutOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedFrequency(option.id)}
                  className={`
                      p-6 cursor-pointer rounded-sm transition-all border border-black w-full bg-white
                      ${
                        selectedFrequency === option.id
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <div className="text-2xl font-bold text-[#004743]">
                          {option.frequency}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      </div>{" "}
                    </div>
                    <div className="flex items-center">
                      <option.icon
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
              <ChevronRight className="w-5 h-5 ml-2" />{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
