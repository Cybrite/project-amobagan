"use client";
import './styles.css';

import {
  useEffect,
  useState,
} from 'react';

import { useSearchParams } from 'next/navigation';

import {
  NutritionStreaming,
} from '@/components/features/nutrition_streaming/NutritionStreaming';
import TTS from '@/components/tts';

export default function StreamingPage() {
    const searchParams = useSearchParams();
    const [barcode, setBarcode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ttsContent, setTtsContent] = useState<string>("");
    const [streamingComplete, setStreamingComplete] = useState<boolean>(false);

    useEffect(() => {
        // Extract barcode from URL query parameter
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

    const handleAnalysisComplete = (analysis: string) => {
        console.log("Streaming analysis complete, triggering TTS");
        setStreamingComplete(true);

        // Extract text content from the HTML analysis
        const textContent =
            document.getElementById("transcript_summary")?.textContent;

        if (textContent && textContent.trim()) {
            setTtsContent(textContent);
        }
    };

    return (
        <div className="min-h-screen">
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
                                Analyzing your product's nutrition information
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
