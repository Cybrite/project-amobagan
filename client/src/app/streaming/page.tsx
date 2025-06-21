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

export default function StreamingPage() {
    const searchParams = useSearchParams();
    const [barcode, setBarcode] = useState<string>("");

    useEffect(() => {
        // Extract barcode from URL query parameter
        const barcodeParam = searchParams.get("barcode");
        if (barcodeParam) {
            setBarcode(barcodeParam);
            console.log("Extracted barcode from URL:", barcodeParam);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen">
            <div>
                {/* Commented out for automatic mode - might need later
                {barcode && (
                    <div className="mb-4 text-center">
                        <p className="text-lg text-gray-600">
                            Analyzing barcode:{" "}
                            <span className="font-mono font-bold text-blue-600">
                                {barcode}
                            </span>
                        </p>
                    </div>
                )}
                */}
                <NutritionStreaming initialBarcode={barcode} />
            </div>
        </div>
    );
}
