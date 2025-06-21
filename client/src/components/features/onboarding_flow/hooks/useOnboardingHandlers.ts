"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
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

// Helper function to set cookies from client-side
const setCookieClientSide = (
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    sameSite?: "strict" | "lax" | "none";
    secure?: boolean;
  } = {}
) => {
  const {
    maxAge = 60 * 60 * 24 * 7, // 1 week default
    path = "/",
    sameSite = "strict",
    secure = process.env.NODE_ENV === "production",
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (maxAge) {
    const expires = new Date(Date.now() + maxAge * 1000);
    cookieString += `; expires=${expires.toUTCString()}`;
    cookieString += `; max-age=${maxAge}`;
  }

  if (path) cookieString += `; path=${path}`;
  if (sameSite) cookieString += `; samesite=${sameSite}`;
  if (secure) cookieString += `; secure`;

  document.cookie = cookieString;
};

export const useOnboardingHandlers = ({
  userDetails,
  setCurrentStep,
  account,
  connected,
  setIsCreatingUser,
  setApiResponse,
  setSelectedRole,
  businessDetails,
  setBusinessDetails,
  userPreferences,
  setUserPreferences,
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

  const handleWalletConnected = useCallback(async () => {
    if (connected && account) {
      try {
        setIsCreatingUser(true);
        setApiResponse({});

        // Prepare user data for API
        const userData = {
          fullName: userDetails.name,
          phoneNo: userDetails.phone,
          petraWalletAddress: account.address?.toString(),
          petraPublicKey: Array.isArray(account.publicKey)
            ? account.publicKey.join(", ")
            : account.publicKey?.toString() || "",
          role: "user", // Default role
          password: userDetails.password || "defaultPassword", // Should be properly handled in production
        };

        // Call API to create user
        const response = await fetch("http://localhost:8080/api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data.success) {
          if (data.data?.token) {
            // Store token in localStorage
            localStorage.setItem("authToken", data.data.token);

            // Set cookies using client-side method
            setCookieClientSide("auth-token", data.data.token, {
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: "/",
              sameSite: "strict",
            });

            setCookieClientSide("user-name", userDetails.name, {
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
              sameSite: "strict",
            });
          }

          setApiResponse({
            success: true,
            message: data.message || "User created successfully",
          });

          setTimeout(() => {
            setCurrentStep(3);
          }, 1000);
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
  }, [
    account,
    connected,
    setCurrentStep,
    setApiResponse,
    setIsCreatingUser,
    userDetails,
  ]);

  const handleRoleSelection = useCallback(
    async (roleId: string) => {
      setSelectedRole(roleId);

      // Store selected role in local state
      try {
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

        if (roleId === "user") {
          // If user chooses standard user role, proceed to user preferences form (step 5)
          setCurrentStep(5);
        } else if (roleId === "business") {
          // If user selects "Apply for Business License", proceed to the business details form
          setCurrentStep(4);
        }
      } catch (error) {
        console.error("Error updating role:", error);
        // Still proceed to the next step even if the API call fails
        if (roleId === "user") {
          setCurrentStep(5);
        } else if (roleId === "business") {
          setCurrentStep(4);
        }
      }
    },
    [setCurrentStep, setSelectedRole]
  );

  const handleBusinessDetailsSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!businessDetails || !setBusinessDetails) return;

      try {
        setIsCreatingUser(true);

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

        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        // Submit business details to API
        const response = await fetch(
          "http://localhost:8080/api/user/apply-for-vendor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(businessDetails),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Show success message
          setApiResponse({
            success: true,
            message: "Business license application submitted successfully",
          });

          // Store business details in cookies
          setCookieClientSide(
            "business-details",
            JSON.stringify(businessDetails),
            {
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: "/",
              sameSite: "strict",
            }
          );

          // Navigate to dashboard with pending status
          setTimeout(() => {
            router.push("/dashboard?status=pending");
          }, 2000);
        } else {
          setApiResponse({
            success: false,
            error: data.message || "Failed to submit business application",
          });
        }
      } catch (error) {
        console.error("Error submitting business details:", error);
        setApiResponse({
          success: false,
          error: "An error occurred while submitting your application",
        });
      } finally {
        setIsCreatingUser(false);
      }
    },
    [
      businessDetails,
      router,
      setApiResponse,
      setBusinessDetails,
      setIsCreatingUser,
    ]
  );

  const handleUserPreferencesSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!userPreferences || !setUserPreferences) return;

      try {
        setIsCreatingUser(true);

        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        // Format preferences for API
        const preferencesData = {
          healthGoals: userPreferences.healthGoals,
          dietaryPreferences: userPreferences.dietaryPreferences,
          allergies: userPreferences.allergies,
        };

        // Submit preferences to API
        const response = await fetch(
          "http://localhost:8080/api/user/preferences",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(preferencesData),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Store preferences locally for client-side use
          localStorage.setItem(
            "user-preferences",
            JSON.stringify(userPreferences)
          );

          // Store preferences in cookies as well
          setCookieClientSide(
            "user-preferences",
            JSON.stringify(userPreferences),
            {
              maxAge: 60 * 60 * 24 * 30, // 1 month for preferences
              path: "/",
              sameSite: "strict",
            }
          );

          // Show success message
          setApiResponse({
            success: true,
            message: "Preferences saved successfully!",
          });

          // Navigate to the streaming page
          setTimeout(() => {
            router.push("/streaming");
          }, 1000);
        } else {
          setApiResponse({
            success: false,
            error: data.message || "Failed to save preferences",
          });
        }
      } catch (error) {
        console.error("Error saving preferences:", error);
        setApiResponse({
          success: false,
          error: "An error occurred while saving your preferences",
        });

        // Fallback: Save to localStorage and proceed anyway
        localStorage.setItem(
          "user-preferences",
          JSON.stringify(userPreferences)
        );

        setTimeout(() => {
          router.push("/streaming");
        }, 1000);
      } finally {
        setIsCreatingUser(false);
      }
    },
    [
      router,
      userPreferences,
      setApiResponse,
      setUserPreferences,
      setIsCreatingUser,
    ]
  );

  return {
    handleUserDetailsSubmit,
    handleWalletConnected,
    handleRoleSelection,
    handleBusinessDetailsSubmit,
    handleUserPreferencesSubmit,
  };
};
