"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Wallet, Zap, Shield, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WalletConnect = () => {
  const { connect, disconnect, account, connected, isLoading, wallets } =
    useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const petraWallet = wallets.find((wallet) => wallet.name === "Petra");
      if (petraWallet) {
        connect(petraWallet.name);
        console.log("Connected to Petra wallet");
      } else {
        console.error("Petra wallet not found");
        alert("Petra wallet not found. Please install Petra wallet extension.");
      }
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert(
        "Failed to connect to wallet. Please make sure Petra wallet is installed and unlocked."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      disconnect();
      console.log("Disconnected from wallet");
    } catch (error) {
      console.error("Failed to disconnect from wallet:", error);
    }
  };

  const copyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account.address.toString());
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <Card className="w-full bg-[#F0EDE4]">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-[#004743] rounded-2xl flex items-center justify-center">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-[#003] bg-clip-text text-transparent">
            Aptos Wallet
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            Connect your Petra wallet to access the Aptos ecosystem
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {connected ? (
          <div className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center justify-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Connected</span>
              <Shield className="w-4 h-4 text-green-400" />
            </div>

            {/* Account Details */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-[#004743]" />
                  <span className="text-black">Account Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-800">
                    Address
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 text-xs bg-[#FFFDF7] p-2 rounded border border-white/10 text-[black] break-all">
                      {account?.address?.toString()}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyAddress}
                      className="text-black hover:text-white"
                    >
                      {copiedAddress ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {account?.publicKey && (
                  <>
                    <Separator className="bg-white/10" />
                    <div>
                      <label className="text-sm font-medium text-gray-800">
                        Public Key
                      </label>
                      <code className="block text-xs bg-[#FFFDF7] p-2 rounded border border-white/10 text-black break-all mt-1">
                        {Array.isArray(account.publicKey)
                          ? account.publicKey.join(", ")
                          : account.publicKey?.toString() ||
                            String(account.publicKey)}
                      </code>
                    </div>
                  </>
                )}

                {account?.ansName && (
                  <>
                    <Separator className="bg-white/10" />
                    <div>
                      <label className="text-sm font-medium text-gray-400">
                        ANS Name
                      </label>
                      <p className="text-white mt-1">{account.ansName}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Button
              onClick={handleDisconnect}
              variant="destructive"
              className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300"
            >
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Not Connected Status */}
            <div className="flex items-center justify-center space-x-2 p-3 bg-[#FFFDF7]  border border-gray-500/20 rounded-lg">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <span className="text-gray-800 font-medium">Not Connected</span>
            </div>

            <div className="text-center space-y-4">
              <p className="text-black text-sm">
                Connect your Petra wallet to access decentralized applications
                on Aptos
              </p>

              <Button
                onClick={handleConnect}
                disabled={isConnecting || isLoading}
                className="w-full bg-[#004743] text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
              >
                {isConnecting || isLoading ? (
                  <>
                    <div className="animate-spin text-black rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2 text-black" />
                    Connect Petra Wallet
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-black">Don&apos;t have Petra?</span>
                <a
                  href="https://petra.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#004743] hover:text-green-800 inline-flex items-center space-x-1 transition-colors"
                >
                  <span>Download</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
