"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

export default function FoodAllergiesPage() {
  const router = useRouter();
  const [allergyIngredients, setAllergyIngredients] = useState<string>("");
  const [otherRestrictions, setOtherRestrictions] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allergyIngredients.trim() && !otherRestrictions.trim()) return;

    // Store allergies in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        allergyIngredients: allergyIngredients.trim(),
        otherRestrictions: otherRestrictions.trim(),
      })
    );

    router.push("/onboarding/nutrition-priorities");
  };

  const handleBack = () => {
    router.push("/onboarding/dietary-preferences");
  };

  return (
    <div className="w-full max-w-md bg-[#F0EDE4] p-8">
      <StepIndicator
        currentStep={6}
        totalSteps={7}
        onBack={handleBack}
        variant="light"
      />

      <div className="bg-[#F0EDE4] rounded-lg p-6">
        <div className="text-start mb-6">
          <h1 className="text-2xl font-bold">
            Any food allergies we should know about?
          </h1>
        </div>

        <div>
          <p className="text-start text-gray-600 mb-6">
            We&apos;ll help you avoid these ingredients
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="allergyIngredients"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  What are those ingredients?
                </Label>
                <Textarea
                  id="allergyIngredients"
                  value={allergyIngredients}
                  onChange={(e) => setAllergyIngredients(e.target.value)}
                  placeholder="List any ingredients you're allergic to (e.g., peanuts, dairy, shellfish...)"
                  className="min-h-[100px] bg-[#FFFFFF] resize-none border-gray-300 focus:border-[#004743] focus:ring-[#004743]"
                />
              </div>

              <div>
                <Label
                  htmlFor="otherRestrictions"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Any other food restrictions you have?
                </Label>
                <Textarea
                  id="otherRestrictions"
                  value={otherRestrictions}
                  onChange={(e) => setOtherRestrictions(e.target.value)}
                  placeholder="Any other dietary restrictions or preferences (e.g., vegetarian, low sodium, religious restrictions...)"
                  className="min-h-[100px] resize-none bg-[#FFFFFF] border-gray-300 focus:border-[#004743] focus:ring-[#004743]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!allergyIngredients.trim() && !otherRestrictions.trim()}
              className="w-full bg-[#004743] text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
