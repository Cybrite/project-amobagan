"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md">
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
