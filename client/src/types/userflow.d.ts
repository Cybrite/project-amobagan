import type React from "react";

export interface UserDetails {
  name: string;
  phone: string;
  password: string;
}

export interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

export interface UserCreationResponse {
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

export interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export interface BusinessDetails {
  name: string;
  location: string;
  type: string;
  scale: string;
  governmentId: string;
  description?: string;
}
export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}
