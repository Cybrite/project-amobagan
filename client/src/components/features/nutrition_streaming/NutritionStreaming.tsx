import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface StreamMessage {
    type: string;
    content: string;
    data?: Record<string, unknown>;
    section?: string;
}

interface NutritionStreamingProps {
    onAnalysisComplete?: (analysis: string) => void;
}

export function NutritionStreaming({
    onAnalysisComplete,
}: NutritionStreamingProps) {
    const [barcode, setBarcode] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [currentAnalysis, setCurrentAnalysis] = useState("");
    const wsRef = useRef<WebSocket | null>(null);

    const connectWebSocket = () => {
        const hardCodedToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTA1NDY5NzIsImZ1bGxOYW1lIjoiSm9obiBEb2UiLCJwZXRyYVB1YmxpY0tleSI6IjB4YWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MCIsInBldHJhV2FsbGV0QWRkcmVzcyI6IjB4MTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZiIsInBob25lTm8iOiIxMjM0NTY3ODIwIiwicm9sZSI6InVzZXIiLCJ1c2VySWQiOiI2ODU1ZGYxNzg4ZWNlZmM1MmI2YzcyZTIifQ.qlo7-O0P89NDBrCn6dax-IxiKHZ7tEQ50M0EqGtZNDE`;

        const token =
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken") ||
            hardCodedToken;

        if (!token) {
            console.error("No authentication token found");
            alert("Please login to use the nutrition streaming feature");
            return;
        }

        // Add token as query parameter
        const wsUrl = `ws://localhost:8080/ws/nutrition/stream?token=${encodeURIComponent(
            token
        )}`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            setIsConnected(true);
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            const message: StreamMessage = JSON.parse(event.data);

            if (message.type === "stream_chunk") {
                setCurrentAnalysis((prev) => prev + message.content);
            } else if (message.type === "stream_complete") {
                setIsStreaming(false);
                setCurrentAnalysis(message.content);
                onAnalysisComplete?.(message.content);
            } else if (message.type === "error") {
                setIsStreaming(false);
                console.error("Streaming error:", message.content);
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log("WebSocket disconnected");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setIsConnected(false);
        };

        wsRef.current = ws;
    };

    const disconnectWebSocket = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
    };

    const startAnalysis = () => {
        if (!wsRef.current || !isConnected) {
            alert("WebSocket not connected");
            return;
        }

        if (!barcode.trim()) {
            alert("Please enter a barcode");
            return;
        }

        setIsStreaming(true);
        setCurrentAnalysis("");

        const request = {
            barcode: barcode.trim(),
        };

        wsRef.current.send(JSON.stringify(request));
    };

    useEffect(() => {
        connectWebSocket();
        return () => disconnectWebSocket();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Nutrition Analysis Streaming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Connection Status */}
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={isConnected ? "default" : "destructive"}
                        >
                            {isConnected ? "Connected" : "Disconnected"}
                        </Badge>
                        {isStreaming && (
                            <Badge variant="secondary">Streaming...</Badge>
                        )}
                    </div>

                    {/* Input Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Barcode
                            </label>
                            <Input
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                                placeholder="Enter product barcode"
                                disabled={isStreaming}
                            />
                        </div>

                        <Button
                            onClick={startAnalysis}
                            disabled={
                                !isConnected || isStreaming || !barcode.trim()
                            }
                            className="w-full"
                        >
                            {isStreaming ? "Analyzing..." : "Start Analysis"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Analysis Output */}
            {currentAnalysis && (
                <Card>
                    <CardHeader>
                        <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-2xl font-bold mb-4">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-xl font-semibold mb-3">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-lg font-semibold mb-2">
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-4">{children}</p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside mb-4">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside mb-4">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="mb-1">{children}</li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold">
                                            {children}
                                        </strong>
                                    ),
                                    em: ({ children }) => (
                                        <em className="italic">{children}</em>
                                    ),
                                    code: ({ children }) => (
                                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                            {children}
                                        </code>
                                    ),
                                    pre: ({ children }) => (
                                        <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                                            {children}
                                        </pre>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
                                            {children}
                                        </blockquote>
                                    ),
                                }}
                            >
                                {currentAnalysis}
                            </ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
