"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepIndicator from "@/components/features/onboarding_flow/components/StepIndicator";
import { motion } from "framer-motion";

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
  // Generate height options (120 to 220 cm)
  const heightOptions = [];
  for (let height = 120; height <= 220; height++) {
    heightOptions.push(height.toString());
  }

  // Generate weight options (80 to 300 kg)
  const weightOptions = [];
  for (let weight = 80; weight <= 300; weight++) {
    weightOptions.push(weight.toString());
  }
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
          currentStep={2}
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
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-[#004743]">
                Tell us about yourself
              </CardTitle>
            </CardHeader>
          </motion.div>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Age Input */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
              </motion.div>

              {/* Height and Weight Row */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Label className="text-lg font-semibold text-[#004743] flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#004743] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Physical Stats
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Height Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >                    <Label
                      htmlFor="height"
                      className="text-sm font-medium text-[#004743]/80"
                    >
                      Height (cm)
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
                      <SelectContent className="max-h-48 rounded-xl border-2 border-[#004743]/20 bg-white/95 backdrop-blur-sm">                        {heightOptions.map((height) => (
                          <SelectItem
                            key={height}
                            value={height}
                            className="rounded-lg hover:bg-[#004743]/10 focus:bg-[#004743]/10 font-medium"
                          >
                            {height} cm
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Weight Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
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
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
