"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function HeightWeightPage() {
  const router = useRouter();
  const [heightWeight, setHeightWeight] = useState({
    height: "",
    weight: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heightWeight.height || !heightWeight.weight) return;

    // Store height and weight in session storage
    const userPreferences = JSON.parse(
      sessionStorage.getItem("userPreferences") || "{}"
    );
    sessionStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...userPreferences,
        heightWeight,
      })
    );

    router.push("/onboarding/health-goals");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              What&apos;s your height and weight?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <Label htmlFor="height" className="text-black font-medium">
                    Height (cm)
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="height"
                      type="number"
                      min="100"
                      max="250"
                      required
                      value={heightWeight.height}
                      onChange={(e) =>
                        setHeightWeight({
                          ...heightWeight,
                          height: e.target.value,
                        })
                      }
                      className="bg-[#FFFDF7] text-black placeholder:text-gray-500"
                      placeholder="Enter your height"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="weight" className="text-black font-medium">
                    Weight (kg)
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="weight"
                      type="number"
                      min="30"
                      max="250"
                      required
                      value={heightWeight.weight}
                      onChange={(e) =>
                        setHeightWeight({
                          ...heightWeight,
                          weight: e.target.value,
                        })
                      }
                      className="bg-[#FFFDF7] text-black placeholder:text-gray-500"
                      placeholder="Enter your weight"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!heightWeight.height || !heightWeight.weight}
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
