"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";

export default function HeightWeightPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    age: "",
    height: "",
    weight: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.age || !userInfo.height || !userInfo.weight) return;

    // Store age, height and weight in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        userInfo,
      })
    );

    router.push("/onboarding/health-goals");
  };

  const handleBack = () => {
    router.push("/onboarding/workout-frequency");
  };

  // Generate height options (4'0" to 7'0")
  const heightOptions = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      heightOptions.push(`${feet}'${inches}"`);
    }
  }

  // Generate weight options (80 to 300 kg)
  const weightOptions = [];
  for (let weight = 80; weight <= 300; weight++) {
    weightOptions.push(weight.toString());
  }

  return (
    <div className="bg-[#F0EDE4] flex items-center justify-center p-4">
      <div className="w-full  bg-[#F0EDE4] max-w-md p-8">
        <StepIndicator
          currentStep={2}
          totalSteps={7}
          onBack={handleBack}
          variant="light"
        />
        <div className=" w-full  bg-[#F0EDE4] max-w-md">
          <div className="bg-[#F0EDE4]">
            <div className="text-center pb-6">
              <h1 className="text-2xl font-bold">Tell us about yourself</h1>
            </div>{" "}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Age Input */}
                <div className="space-y-3">
                  <Label
                    htmlFor="age"
                    className="text-lg font-semibold text-[#004743] flex items-center gap-2"
                  >
                    <span className="w-8 h-8 bg-[#004743] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Age
                  </Label>
                  <div className="relative">
                    <Input
                      id="age"
                      type="number"
                      min="16"
                      max="100"
                      required
                      value={userInfo.age}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          age: e.target.value,
                        })
                      }
                      className="bg-white/80 backdrop-blur-sm border-2 border-[#004743]/20 text-black placeholder:text-gray-400 rounded-xl h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:border-[#004743] focus:ring-2 focus:ring-[#004743]/20"
                      placeholder="Enter your age"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#004743]/60 font-medium">
                      years
                    </div>
                  </div>
                </div>
                {/* Height and Weight Row */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-[#004743] flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#004743] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Physical Stats
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Height Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="height"
                        className="text-sm font-medium text-[#004743]/80"
                      >
                        Height (ft and in)
                      </Label>
                      <Select
                        value={userInfo.height}
                        onValueChange={(value) =>
                          setUserInfo({
                            ...userInfo,
                            height: value,
                          })
                        }
                      >
                        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-[#004743]/20 text-black rounded-xl h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:border-[#004743] focus:ring-2 focus:ring-[#004743]/20">
                          <SelectValue placeholder="Height" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48 rounded-xl border-2 border-[#004743]/20 bg-white/95 backdrop-blur-sm">
                          {heightOptions.map((height) => (
                            <SelectItem
                              key={height}
                              value={height}
                              className="rounded-lg hover:bg-[#004743]/10 focus:bg-[#004743]/10 font-medium"
                            >
                              {height}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Weight Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="weight"
                        className="text-sm font-medium text-[#004743]/80"
                      >
                        Weight (kg)
                      </Label>
                      <Select
                        value={userInfo.weight}
                        onValueChange={(value) =>
                          setUserInfo({
                            ...userInfo,
                            weight: value,
                          })
                        }
                      >
                        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-[#004743]/20 text-black rounded-xl h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:border-[#004743] focus:ring-2 focus:ring-[#004743]/20">
                          <SelectValue placeholder="Weight" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48 rounded-xl border-2 border-[#004743]/20 bg-white/95 backdrop-blur-sm">
                          {weightOptions.map((weight) => (
                            <SelectItem
                              key={weight}
                              value={weight}
                              className="rounded-lg hover:bg-[#004743]/10 focus:bg-[#004743]/10 font-medium"
                            >
                              {weight} kg
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>{" "}
                <Button
                  type="submit"
                  disabled={
                    !userInfo.age || !userInfo.height || !userInfo.weight
                  }
                  className="w-full bg-gradient-to-r from-[#004743] to-[#006b63] text-white font-semibold py-4 px-6 rounded-xl h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
