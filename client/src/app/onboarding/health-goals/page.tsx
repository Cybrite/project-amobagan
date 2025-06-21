"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const healthGoalsOptions = [
  { id: "weight_loss", label: "Weight Loss" },
  { id: "muscle_gain", label: "Muscle Gain" },
  { id: "heart_health", label: "Heart Health" },
  { id: "diabetes_management", label: "Diabetes Management" },
  { id: "general_wellness", label: "General Wellness" },
  { id: "energy_boost", label: "Energy Boost" },
];

export default function HealthGoalsPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "general_wellness",
  ]);

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoals.length === 0) return;

    // Store health goals in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        healthGoals: selectedGoals,
      })
    );

    router.push("/onboarding/goal-timeframe");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              What are your health goals?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Select all that apply to you
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {healthGoalsOptions.map((goal) => (
                  <div
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all border-2 flex flex-col items-center text-center
                      ${
                        selectedGoals.includes(goal.id)
                          ? "border-[#004743] bg-[#004743]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div
                      className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2
                      ${
                        selectedGoals.includes(goal.id)
                          ? "border-[#004743] bg-[#004743]"
                          : "border-gray-400"
                      }
                    `}
                    >
                      {selectedGoals.includes(goal.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-md">{goal.label}</span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                disabled={selectedGoals.length === 0}
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
