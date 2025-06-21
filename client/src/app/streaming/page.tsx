"use client";
import './styles.css';

import {
  NutritionStreaming,
} from '@/components/features/nutrition_streaming/NutritionStreaming';

export default function StreamingPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Nutrition Analysis Streaming
                </h1>
                <NutritionStreaming />
            </div>
        </div>
    );
}
