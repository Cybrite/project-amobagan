import React from "react";
import { ArrowLeft, ChevronRight, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserPreferencesStepProps {
  preferences: {
    healthGoals: string[];
    dietaryPreferences: string[];
    allergies: string[];
  };
  setPreferences: (preferences: {
    healthGoals: string[];
    dietaryPreferences: string[];
    allergies: string[];
  }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const UserPreferencesStep = ({
  preferences,
  setPreferences,
  onSubmit,
  onBack,
  isSubmitting = false,
}: UserPreferencesStepProps) => {
  const healthGoalsOptions = [
    { id: "weight_loss", label: "Weight Loss" },
    { id: "muscle_gain", label: "Muscle Gain" },
    { id: "heart_health", label: "Heart Health" },
    { id: "diabetes_management", label: "Diabetes Management" },
    { id: "general_wellness", label: "General Wellness" },
    { id: "energy_boost", label: "Energy Boost" },
  ];

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
  ];

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

  const toggleSelection = (
    category: "healthGoals" | "dietaryPreferences" | "allergies",
    itemId: string
  ) => {
    const currentSelection = [...preferences[category]];

    if (category === "allergies" && itemId === "none") {
      // If "No Allergies" is selected, clear all other allergies
      setPreferences({
        ...preferences,
        allergies: currentSelection.includes("none") ? [] : ["none"],
      });
      return;
    }

    if (category === "allergies" && preferences.allergies.includes("none")) {
      // If selecting a specific allergy and "No Allergies" was selected before
      setPreferences({
        ...preferences,
        allergies: [itemId],
      });
      return;
    }

    const newSelection = currentSelection.includes(itemId)
      ? currentSelection.filter((id) => id !== itemId)
      : [...currentSelection, itemId];

    setPreferences({
      ...preferences,
      [category]: newSelection,
    });
  };

  return (
    <Card className="w-full bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
          <Apple className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Nutrition Preferences
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            Help us personalize your nutrition recommendations
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <ScrollArea className="h-[440px] pr-4">
            <div className="space-y-6">
              {/* Health Goals */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  What are your health goals?
                </h3>
                <p className="text-sm text-gray-400">
                  Select all that apply to you
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {healthGoalsOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant="outline"
                      className={`cursor-pointer py-2 px-3 text-sm ${
                        preferences.healthGoals.includes(option.id)
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                      onClick={() => toggleSelection("healthGoals", option.id)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Dietary Preferences */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  Do you follow any specific diet?
                </h3>
                <p className="text-sm text-gray-400">
                  Select all diets you follow
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dietaryPreferencesOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant="outline"
                      className={`cursor-pointer py-2 px-3 text-sm ${
                        preferences.dietaryPreferences.includes(option.id)
                          ? "bg-green-500/20 border-green-500/50 text-green-300"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                      onClick={() =>
                        toggleSelection("dietaryPreferences", option.id)
                      }
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Allergies */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  Any food allergies we should know about?
                </h3>
                <p className="text-sm text-gray-400">
                  We&apos;ll help you avoid these ingredients
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allergiesOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant="outline"
                      className={`cursor-pointer py-2 px-3 text-sm ${
                        preferences.allergies.includes(option.id)
                          ? "bg-red-500/20 border-red-500/50 text-red-300"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                      onClick={() => toggleSelection("allergies", option.id)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving Preferences...
              </>
            ) : (
              <>
                Continue to Nutrition Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserPreferencesStep;
