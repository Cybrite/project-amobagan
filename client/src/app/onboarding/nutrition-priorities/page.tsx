"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

const prioritiesOptions = [
  { id: "low_sugar", label: "Low Sugar" },
  { id: "low_sodium", label: "Low Sodium" },
  { id: "low_fat", label: "Low Fat" },
  { id: "high_protein", label: "High Protein" },
  { id: "high_fiber", label: "High Fiber" },
  { id: "low_calories", label: "Low Calories" },
  { id: "no_artificial_ingredients", label: "No Artificial Ingredients" },
  { id: "organic", label: "Organic" },
  { id: "sustainable", label: "Sustainable" },
  { id: "balanced", label: "Balanced Nutrition" },
];

export default function NutritionPrioritiesPage() {
  const router = useRouter();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const togglePriority = (priorityId: string) => {
    if (selectedPriorities.includes(priorityId)) {
      setSelectedPriorities(
        selectedPriorities.filter((id) => id !== priorityId)
      );
    } else {
      setSelectedPriorities([...selectedPriorities, priorityId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store nutrition priorities in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        nutritionPriorities: selectedPriorities,
      })
    );

    router.push("/onboarding/congratulations");
  };

  const handleBack = () => {
    router.push("/onboarding/food-allergies");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <StepIndicator
          currentStep={7}
          totalSteps={7}
          onBack={handleBack}
          variant="light"
        />

        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Set your nutrition priorities
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Select what matters most to you in your food choices
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {prioritiesOptions.map((priority) => (
                  <div
                    key={priority.id}
                    onClick={() => togglePriority(priority.id)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all border-2 flex items-center
                      ${
                        selectedPriorities.includes(priority.id)
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div
                      className={`
                      w-5 h-5 rounded-sm border-2 mr-2 flex items-center justify-center flex-shrink-0
                      ${
                        selectedPriorities.includes(priority.id)
                          ? "border-[#004743] bg-[#004743]"
                          : "border-gray-400"
                      }
                    `}
                    >
                      {selectedPriorities.includes(priority.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{priority.label}</span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
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
