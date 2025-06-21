"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

const allergiesOptions = [
  { id: "peanuts", label: "Peanuts" },
  { id: "tree_nuts", label: "Tree Nuts" },
  { id: "dairy", label: "Dairy" },
  { id: "eggs", label: "Eggs" },
  { id: "wheat", label: "Wheat" },
  { id: "soy", label: "Soy" },
  { id: "fish", label: "Fish" },
  { id: "shellfish", label: "Shellfish" },
  { id: "sesame", label: "Sesame" },
  { id: "none", label: "No Allergies" },
];

export default function FoodAllergiesPage() {
  const router = useRouter();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([
    "none",
  ]);

  const toggleAllergy = (allergyId: string) => {
    // Handle "No Allergies" option specially
    if (allergyId === "none") {
      if (selectedAllergies.includes("none")) {
        setSelectedAllergies([]);
      } else {
        setSelectedAllergies(["none"]);
      }
      return;
    }

    // If "No Allergies" is already selected, clear it when selecting others
    if (selectedAllergies.includes("none")) {
      setSelectedAllergies([allergyId]);
      return;
    }

    if (selectedAllergies.includes(allergyId)) {
      setSelectedAllergies(selectedAllergies.filter((id) => id !== allergyId));
    } else {
      setSelectedAllergies([...selectedAllergies, allergyId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAllergies.length === 0) return;

    // Store allergies in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        allergies: selectedAllergies,
      })
    );

    router.push("/onboarding/nutrition-priorities");
  };

  const handleBack = () => {
    router.push("/onboarding/dietary-preferences");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <StepIndicator
          currentStep={6}
          totalSteps={7}
          onBack={handleBack}
          variant="light"
        />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Any food allergies we should know about?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              We&apos;ll help you avoid these ingredients
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {allergiesOptions.map((allergy) => (
                  <div
                    key={allergy.id}
                    onClick={() => toggleAllergy(allergy.id)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all border-2 flex items-center
                      ${allergy.id === "none" ? "col-span-2" : ""}
                      ${
                        selectedAllergies.includes(allergy.id)
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div
                      className={`
                      w-5 h-5 rounded-sm border-2 mr-3 flex items-center justify-center flex-shrink-0
                      ${
                        selectedAllergies.includes(allergy.id)
                          ? "border-[#004743] bg-[#004743]"
                          : "border-gray-400"
                      }
                    `}
                    >
                      {selectedAllergies.includes(allergy.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-md">{allergy.label}</span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                disabled={selectedAllergies.length === 0}
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
