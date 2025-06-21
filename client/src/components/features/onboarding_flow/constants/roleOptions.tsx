import { User, Building2 } from "lucide-react";
import { RoleOption } from "@/types/userflow";

export const ROLE_OPTIONS: RoleOption[] = [
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
    id: "business",
    title: "Apply for Business License",
    description: "Get verified and sell your products on our platform",
    icon: <Building2 className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    features: [
      "Business Verification",
      "Vendor Dashboard",
      "Product Management",
      "Analytics & Insights",
    ],
  },
];
