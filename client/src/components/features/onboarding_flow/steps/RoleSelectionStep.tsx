import { ArrowLeft, ChevronRight } from "lucide-react";
import { RoleOption } from "@/types/userflow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserCheck } from "lucide-react";

interface RoleSelectionStepProps {
  roleOptions: RoleOption[];
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
  onBack: () => void;
}

const RoleSelectionStep = ({
  roleOptions,
  selectedRole,
  onRoleSelect,
  onBack,
}: RoleSelectionStepProps) => (
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
          onClick={onBack}
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
          onClick={() => onRoleSelect(role.id)}
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

export default RoleSelectionStep;
