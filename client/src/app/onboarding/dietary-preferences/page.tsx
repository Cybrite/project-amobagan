"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

const dietaryPreferencesOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "low_carb", label: "Low Carb" },
  { id: "low_sugar", label: "Low Sugar" },
  { id: "low_sodium", label: "Low Sodium" },
  { id: "high_protein", label: "High Protein" },
  { id: "gluten_free", label: "Gluten Free" },
  { id: "dairy_free", label: "Dairy Free" },
  { id: "no_specific_diet", label: "No Specific Diet" },
];

export default function DietaryPreferencesPage() {
  const router = useRouter();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (preferenceId: string) => {
    // Handle "No Specific Diet" option specially
    if (preferenceId === "no_specific_diet") {
      if (selectedPreferences.includes(preferenceId)) {
        setSelectedPreferences([]);
      } else {
        setSelectedPreferences(["no_specific_diet"]);
      }
      return;
    }

    // If "No Specific Diet" is already selected, clear it when selecting others
    if (selectedPreferences.includes("no_specific_diet")) {
      setSelectedPreferences([preferenceId]);
      return;
    }

    if (selectedPreferences.includes(preferenceId)) {
      setSelectedPreferences(
        selectedPreferences.filter((id) => id !== preferenceId)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preferenceId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store dietary preferences in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        dietaryPreferences: selectedPreferences,
      })
    );

    router.push("/onboarding/food-allergies");
  };

  const handleBack = () => {
    router.push("/onboarding/goal-timeframe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <StepIndicator
          currentStep={5}
          totalSteps={7}
          onBack={handleBack}
          variant="light"
        />

        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Do you follow any specific diet?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Select all diets you follow
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {dietaryPreferencesOptions.map((preference) => (
                  <div
                    key={preference.id}
                    onClick={() => togglePreference(preference.id)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all border-2 flex items-center
                      ${
                        selectedPreferences.includes(preference.id)
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                      ${
                        preference.id === "no_specific_diet" ? "col-span-2" : ""
                      }
                    `}
                  >
                    <div
                      className={`
                      w-5 h-5 rounded-sm border-2 mr-2 flex items-center justify-center flex-shrink-0
                      ${
                        selectedPreferences.includes(preference.id)
                          ? "border-[#004743] bg-[#004743]"
                          : "border-gray-400"
                      }
                    `}
                    >
                      {selectedPreferences.includes(preference.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-md">{preference.label}</span>
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
