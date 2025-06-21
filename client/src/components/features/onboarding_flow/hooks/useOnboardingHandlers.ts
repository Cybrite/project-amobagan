"use client";

import { useCallback } from 'react';

import { setCookie } from 'cookies-next'; // Client-side cookie management
import { useRouter } from 'next/navigation';

import {
  BusinessDetails,
  UserDetails,
} from '@/types/userflow';

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
        if (connected) {
            setCookie("user-name", userDetails.name, {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
                sameSite: "strict",
            });

            setApiResponse({
                success: true,
                message: "Wallet connected successfully",
            });

            setTimeout(() => {
                setCurrentStep(3);
            }, 1000);
        }
    }, [connected, setCurrentStep, setApiResponse, userDetails.name]);

    const handleRoleSelection = useCallback(
        (roleId: string) => {
            setSelectedRole(roleId);

            if (roleId === "user") {
                setCurrentStep(5);
            } else if (roleId === "business") {
                setCurrentStep(4);
            }
        },
        [setCurrentStep, setSelectedRole]
    );

    const handleBusinessDetailsSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (!businessDetails || !setBusinessDetails) return;

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

            setApiResponse({
                success: true,
                message: "Business license application submitted successfully",
            });

            setCookie("business-details", JSON.stringify(businessDetails), {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
                sameSite: "strict",
            });

            setTimeout(() => {
                router.push("/dashboard?status=pending");
            }, 2000);
        },
        [businessDetails, router, setApiResponse, setBusinessDetails]
    );

    const handleUserPreferencesSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            localStorage.setItem(
                "user-preferences",
                JSON.stringify(userDetails)
            );

            setApiResponse({
                success: true,
                message: "Preferences saved successfully!",
            });

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
