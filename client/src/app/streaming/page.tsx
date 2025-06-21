"use client";
import "./styles.css";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import EatFoodButton from "@/components/EatFoodButton";
import { NutritionStreaming } from "@/components/features/nutrition_streaming/NutritionStreaming";
import TTS from "@/components/tts";

// Client component that uses useSearchParams
function StreamingContent() {
  const searchParams = useSearchParams();
  const [barcode, setBarcode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ttsContent, setTtsContent] = useState<string>("");
  const [streamingComplete, setStreamingComplete] = useState<boolean>(false);
  const [nutritionalElements, setNutritionalElements] = useState<string[]>([]);

  useEffect(() => {
    const barcodeParam = searchParams.get("barcode");
    if (barcodeParam) {
      setBarcode(barcodeParam);
      setIsLoading(true);
      console.log("Extracted barcode from URL:", barcodeParam);
    }
  }, [searchParams]);

  const handleFirstStreamChunk = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!streamingComplete) return;
    const elements = document.getElementById("nutritionalInfos")?.textContent;
    if (elements) {
      try {
        const elementArray = elements
          .split(",")
          .map((element) => element.trim());
        setNutritionalElements(elementArray);
      } catch (error) {
        console.error("Error parsing nutritional elements:", error);
      }
    }
  }, [streamingComplete]);

  const handleAnalysisComplete = () => {
    setStreamingComplete(true);

    const textContent =
      document.getElementById("transcript_summary")?.textContent;

    if (textContent && textContent.trim()) {
      setTtsContent(textContent);
    }
  };

  const handleEatFood = (elements: string[]) => {
    console.log("User ate food with elements:", elements);
  };

  return (
    <div className="min-h-screen">
      {/* Eat Food Button */}
      <EatFoodButton
        barcode={barcode}
        nutritionalElements={nutritionalElements}
        onEatFood={handleEatFood}
      />

      {/* Only show TTS when streaming is complete */}
      {streamingComplete && <TTS text={ttsContent} />}
      <div>
        {isLoading && barcode && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-medium">
                Something is cooking...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Analyzing your product&apos;s nutrition information
              </p>
            </div>
          </div>
        )}
        <NutritionStreaming
          initialBarcode={barcode}
          onFirstStreamChunk={handleFirstStreamChunk}
          onAnalysisComplete={handleAnalysisComplete}
        />
      </div>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StreamingContent />
    </Suspense>
  );
}
