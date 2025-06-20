"use client";

import type React from "react";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  User,
  Phone,
  Store,
  UserCheck,
  ChevronRight,
  ArrowLeft,
  Zap,
  Check,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import WalletConnect from "../aptos_petra_wallet/WalletConnect";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UserDetails {
  name: string;
  phone: string;
  password: string;
}

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

interface UserCreationResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    fullName: string;
    healthStatus: string;
    petraPublicKey: string;
    petraWalletAddress: string;
    phoneNo: string;
    role: string;
    token: string;
  };
  timestamp: string;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "",
    password: "",
  });
  const [selectedRole, setSelectedRole] = useState<string>("");
  const { connected, account } = useWallet();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  }>({});

  const roleOptions: RoleOption[] = [
    {
      id: "user",
      title: "Continue as User",
      description: "Browse and purchase products from verified vendors",
      icon: <User className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Browse Products",
        "Make Purchases",
        "Track Orders",
        "Rate & Review",
      ],
    },
    {
      id: "vendor",
      title: "Continue as Vendor",
      description: "Sell your products and manage your store",
      icon: <Store className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "List Products",
        "Manage Inventory",
        "Process Orders",
        "Analytics Dashboard",
      ],
    },
  ];

  const handleUserDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetails.name && userDetails.phone) {
      setCurrentStep(2);
    }
  };

  const handleWalletConnected = async () => {
    console.log("Handling wallet connection...");
    if (connected && account) {
      console.log("Wallet connected:", account);
      try {
        console.log("Creating user with wallet details...");
        setIsCreatingUser(true);
        setApiResponse({});

        // Prepare the user data for API
        const userData = {
          fullName: userDetails.name,
          phoneNo: userDetails.phone,
          petraWalletAddress: account.address?.toString(),
          petraPublicKey: Array.isArray(account.publicKey)
            ? account.publicKey.join(", ")
            : account.publicKey?.toString() || "",
          role: "user", // Default to user, will set specific role in next step
          password: userDetails.password,
        };

        console.log("Creating user with data:", userData);

        // Make API request
        const response = await fetch("http://localhost:8080/api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data: UserCreationResponse = await response.json();

        if (data.success) {
          // Store token in localStorage
          if (data.data?.token) {
            localStorage.setItem("authToken", data.data.token);
          }

          setApiResponse({
            success: true,
            message: data.message || "User created successfully",
          });

          // Move to role selection after successful user creation
          setTimeout(() => {
            setCurrentStep(3);
          }, 2000);
        } else {
          setApiResponse({
            success: false,
            error: data.message || "Failed to create user",
          });
        }
      } catch (error) {
        console.error("Error creating user:", error);
        setApiResponse({
          success: false,
          error: "An error occurred while creating your account",
        });
      } finally {
        setIsCreatingUser(false);
      }
    }
  };

  const handleRoleSelection = async (roleId: string) => {
    setSelectedRole(roleId);

    try {
      // Update user role if we have a token
      const token = localStorage.getItem("authToken");
      if (token) {
        await fetch("http://localhost:8080/api/user/update-role", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: roleId }),
        });
      }

      // Here you would typically navigate to the respective dashboard
      console.log(`Selected role: ${roleId}`, {
        userDetails,
        selectedRole: roleId,
      });
      alert(`Onboarding complete! Redirecting to ${roleId} dashboard...`);
    } catch (error) {
      console.error("Error updating role:", error);
      alert("There was an issue updating your role. Please try again.");
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep >= step
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                : "bg-white/10 text-gray-400 border border-white/20"
            }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                currentStep > step
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                  : "bg-white/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderUserDetailsForm = () => (
    <Card className="bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Aptos Marketplace
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            Let&apos;s get started by collecting some basic information
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleUserDetailsSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300 font-medium">
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
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-300 font-medium">
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
                    setUserDetails({ ...userDetails, phone: e.target.value })
                  }
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 font-medium">
                Password *
              </Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Continue to Wallet Setup
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderWalletConnection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(1)}
          className="text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
      </div>

      <WalletConnect />

      {connected && (
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {apiResponse.success === true && (
                <Alert className="bg-green-500/10 border-green-500/30 text-green-400">
                  <Check className="h-4 w-4 mr-2" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>{apiResponse.message}</AlertDescription>
                </Alert>
              )}

              {apiResponse.success === false && (
                <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{apiResponse.error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  Wallet Connected Successfully!
                </span>
              </div>

              <Button
                onClick={handleWalletConnected}
                disabled={isCreatingUser}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
              >
                {isCreatingUser ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Continue to Role Selection
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderRoleSelection = () => (
    <Card className="w-full bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
          <UserCheck className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Choose Your Role
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            Select how you&apos;d like to use the Aptos Marketplace
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(2)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wallet
          </Button>
        </div>

        {roleOptions.map((role) => (
          <Card
            key={role.id}
            className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group ${
              selectedRole === role.id ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => handleRoleSelection(role.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 mb-3">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/10 text-gray-300 border-white/20 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Separator className="bg-white/10 my-6" />

        <div className="text-center">
          <p className="text-xs text-gray-500">
            You can change your role later in account settings
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative w-full max-w-2xl">
        {renderStepIndicator()}

        {currentStep === 1 && renderUserDetailsForm()}
        {currentStep === 2 && renderWalletConnection()}
        {currentStep === 3 && renderRoleSelection()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
