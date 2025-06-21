import { ArrowLeft, ChevronRight, Check, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WalletConnect from "../../aptos_petra_wallet/WalletConnect";

interface WalletConnectionStepProps {
  connected: boolean;
  apiResponse: {
    success?: boolean;
    message?: string;
    error?: string;
  };
  isCreatingUser: boolean;
  onBack: () => void;
  onContinue: () => void;
}

const WalletConnectionStep = ({
  connected,
  apiResponse,
  isCreatingUser,
  onBack,
  onContinue,
}: WalletConnectionStepProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <Button
        variant="ghost"
        onClick={onBack}
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
              onClick={onContinue}
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

export default WalletConnectionStep;
