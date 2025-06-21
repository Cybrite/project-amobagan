"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserDetails } from "@/types/userflow";
import { User, Phone, ChevronRight, Lock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserDetailsPage() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store user details in session storage to use across the flow
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Navigate to next step
    router.push("/onboarding/workout-frequency");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#F0EDE4]">
          <CardHeader className="text-center space-y-4">
            <div>
              <CardTitle className="text-2xl flex font-bold bg-[#000] bg-clip-text text-transparent">
                Fill Your Details
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-12">
                <div>
                  <Label htmlFor="name" className="text-black font-medium">
                    Full Name *
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      required
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                      className="pl-10 bg-[#FFFDF7] text-black placeholder:text-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-black font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={userDetails.phone}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          phone: e.target.value,
                        })
                      }
                      className="pl-10 bg-[#FFFDF7] text-black placeholder:text-gray-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-black font-medium">
                    Password *
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={userDetails.password}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                      className="pl-10 bg-[#FFFDF7] text-black placeholder:text-gray-500"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#004743] text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] mt-4"
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
