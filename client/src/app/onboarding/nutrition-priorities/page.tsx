"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StepIndicator
          currentStep={7}
          totalSteps={7}
          onBack={handleBack}
          variant="light"
          className="mb-6"
        />

        <Card className="bg-[#F0EDE4] shadow-xl border-2 border-[#004743]/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#004743]">
                Set your nutrition priorities
              </CardTitle>
            </CardHeader>
          </motion.div>

          <CardContent>
            <motion.p
              className="text-center text-gray-600 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Select what matters most to you in your food choices
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {prioritiesOptions.map((priority, index) => (
                  <motion.div
                    key={priority.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    onClick={() => togglePriority(priority.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all border-2 flex items-center
                      ${
                        selectedPriorities.includes(priority.id)
                          ? "border-[#004743] bg-[#004743]/10 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
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
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-[#004743] hover:bg-[#003a37] text-white font-medium py-6 text-lg transition-all duration-300 transform hover:scale-[1.02] mt-6 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
