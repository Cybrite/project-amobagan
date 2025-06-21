"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next"; // Client-side cookie management
import { UserDetails, BusinessDetails } from "@/types/userflow";

interface OnboardingHandlersProps {
  userDetails: UserDetails;
  setCurrentStep: (step: number) => void;
  account: {
    address?: string | undefined;
    publicKey?: string | string[] | undefined;
  };
  connected: boolean;
  setIsCreatingUser: (isCreating: boolean) => void;
  setApiResponse: (response: {
    success?: boolean;
    message?: string;
    error?: string;
  }) => void;
  setSelectedRole: (role: string) => void;
  businessDetails?: BusinessDetails;
  setBusinessDetails?: (details: BusinessDetails) => void;
  userPreferences?: {
    healthGoals: string[];
    dietaryPreferences: string[];
    allergies: string[];
  };
  setUserPreferences?: (preferences: {
    healthGoals: string[];
    dietaryPreferences: string[];
    allergies: string[];
  }) => void;
}

export const useOnboardingHandlers = ({
  userDetails,
  setCurrentStep,
  connected,
  setApiResponse,
  setSelectedRole,
  businessDetails,
  setBusinessDetails,
}: OnboardingHandlersProps) => {
  const router = useRouter();

  const handleUserDetailsSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (userDetails.name && userDetails.phone) {
        setCurrentStep(2);
      }
    },
    [userDetails, setCurrentStep]
  );

  const handleWalletConnected = useCallback(() => {
    // Skip API call and just show success message when wallet is connected
    if (connected) {
      // Store basic user data in cookies for future use
      setCookie("user-name", userDetails.name, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "strict",
      });

      // Show success message
      setApiResponse({
        success: true,
        message: "Wallet connected successfully",
      });

      // Proceed to next step
      setTimeout(() => {
        setCurrentStep(3);
      }, 1000);
    }
  }, [connected, setCurrentStep, setApiResponse, userDetails.name]);

  const handleRoleSelection = useCallback(
    (roleId: string) => {
      setSelectedRole(roleId);

      if (roleId === "user") {
        // If user chooses standard user role, proceed to user preferences form (step 5)
        setCurrentStep(5);
      } else if (roleId === "business") {
        // If user selects "Apply for Business License", proceed to the business details form
        setCurrentStep(4);
      }
    },
    [setCurrentStep, setSelectedRole]
  );

  const handleBusinessDetailsSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!businessDetails || !setBusinessDetails) return;

      // Validate required fields
      if (
        !businessDetails.name ||
        !businessDetails.location ||
        !businessDetails.type ||
        !businessDetails.scale ||
        !businessDetails.governmentId
      ) {
        setApiResponse({
          success: false,
          error: "Please fill out all required fields",
        });
        return;
      }

      // Show success message without API call
      setApiResponse({
        success: true,
        message: "Business license application submitted successfully",
      });

      // Store business details in cookies
      setCookie("business-details", JSON.stringify(businessDetails), {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "strict",
      });

      // Navigate to dashboard with pending status
      setTimeout(() => {
        router.push("/dashboard?status=pending");
      }, 2000);
    },
    [businessDetails, router, setApiResponse, setBusinessDetails]
  );

  // Add new handler for user preferences submission
  const handleUserPreferencesSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Save user preferences to localStorage for future use
      localStorage.setItem("user-preferences", JSON.stringify(userDetails));

      // Show success message
      setApiResponse({
        success: true,
        message: "Preferences saved successfully!",
      });

      // Navigate to the streaming page
      setTimeout(() => {
        router.push("/streaming");
      }, 1000);
    },
    [router, userDetails, setApiResponse]
  );

  return {
    handleUserDetailsSubmit,
    handleWalletConnected,
    handleRoleSelection,
    handleBusinessDetailsSubmit,
    handleUserPreferencesSubmit,
  };
};
