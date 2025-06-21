import React from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  Scale,
  IdCard,
  ChevronRight,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BusinessDetails } from "@/types/userflow";
import { Check, AlertCircle } from "lucide-react";

interface BusinessDetailsStepProps {
  businessDetails: BusinessDetails;
  setBusinessDetails: (details: BusinessDetails) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isSubmitting: boolean;
  apiResponse: {
    success?: boolean;
    message?: string;
    error?: string;
  };
}

const BusinessDetailsStep = ({
  businessDetails,
  setBusinessDetails,
  onSubmit,
  onBack,
  isSubmitting,
  apiResponse,
}: BusinessDetailsStepProps) => {
  const handleChange = (field: keyof BusinessDetails, value: string) => {
    setBusinessDetails({ ...businessDetails, [field]: value });
  };

  const businessTypes = [
    "Retail",
    "Food & Beverage",
    "Manufacturing",
    "Services",
    "Technology",
    "Healthcare",
    "Education",
    "Financial Services",
    "Other",
  ];

  const businessScales = [
    "Micro (1-9 employees)",
    "Small (10-49 employees)",
    "Medium (50-249 employees)",
    "Large (250+ employees)",
  ];

  return (
    <Card className="w-full bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Business License Application
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            Fill in your business details to apply for vendor status
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Button>
        </div>

        {apiResponse.success === true && (
          <Alert className="bg-green-500/10 border-green-500/30 text-green-400 mb-6">
            <Check className="h-4 w-4 mr-2" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{apiResponse.message}</AlertDescription>
          </Alert>
        )}

        {apiResponse.success === false && (
          <Alert className="bg-red-500/10 border-red-500/30 text-red-400 mb-6">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{apiResponse.error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="business-name"
                className="text-gray-300 font-medium"
              >
                Business Name *
              </Label>
              <div className="relative mt-2">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="business-name"
                  type="text"
                  required
                  value={businessDetails.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
                  placeholder="Enter your business name"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="business-location"
                className="text-gray-300 font-medium"
              >
                Business Location *
              </Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="business-location"
                  type="text"
                  required
                  value={businessDetails.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
                  placeholder="Enter your business address"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="business-type"
                className="text-gray-300 font-medium"
              >
                Business Type *
              </Label>
              <div className="relative mt-2">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                <Select
                  value={businessDetails.type}
                  onValueChange={(value: string) => handleChange("type", value)}
                  required
                >
                  <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label
                htmlFor="business-scale"
                className="text-gray-300 font-medium"
              >
                Business Scale *
              </Label>
              <div className="relative mt-2">
                <Scale className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                <Select
                  value={businessDetails.scale}
                  onValueChange={(value: string) =>
                    handleChange("scale", value)
                  }
                  required
                >
                  <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20">
                    <SelectValue placeholder="Select business scale" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {businessScales.map((scale) => (
                      <SelectItem key={scale} value={scale.toLowerCase()}>
                        {scale}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label
                htmlFor="government-id"
                className="text-gray-300 font-medium"
              >
                Government ID Number *
              </Label>
              <div className="relative mt-2">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="government-id"
                  type="text"
                  required
                  value={businessDetails.governmentId}
                  onChange={(e) => handleChange("governmentId", e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
                  placeholder="Enter government-issued business ID"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="business-description"
                className="text-gray-300 font-medium"
              >
                Business Description{" "}
                <span className="text-gray-500">(Optional)</span>
              </Label>
              <Textarea
                id="business-description"
                value={businessDetails.description || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange("description", e.target.value)
                }
                className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20 min-h-[100px]"
                placeholder="Tell us more about your business"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting Application...
              </>
            ) : (
              <>
                Apply for Vendor Status
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-400">
              Your application will be reviewed by our team. You&apos;ll receive
              a notification once approved.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessDetailsStep;
