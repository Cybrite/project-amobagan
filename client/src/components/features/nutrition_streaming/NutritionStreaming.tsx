import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

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
    data?: any;
    section?: string;
}

interface UserPreferences {
    health_goals: string[];
    dietary_preferences: string[];
    nutrition_priorities: string[];
    user_name?: string;
}

interface NutritionStreamingProps {
    onAnalysisComplete?: (analysis: string) => void;
}

export function NutritionStreaming({
    onAnalysisComplete,
}: NutritionStreamingProps) {
    const [barcode, setBarcode] = useState("");
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        health_goals: ["weight_loss"],
        dietary_preferences: ["vegetarian"],
        nutrition_priorities: ["natural_ingredients"],
        user_name: "User",
    });
    const [isConnected, setIsConnected] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<StreamMessage[]>([]);
    const [currentAnalysis, setCurrentAnalysis] = useState("");
    const wsRef = useRef<WebSocket | null>(null);

    const connectWebSocket = () => {
        // Get the authentication token

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
            setMessages((prev) => [...prev, message]);

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
        setMessages([]);

        const request = {
            barcode: barcode.trim(),
            user_preferences: userPreferences,
        };

        wsRef.current.send(JSON.stringify(request));
    };

    const updateUserPreference = (
        type: keyof UserPreferences,
        value: string,
        action: "add" | "remove"
    ) => {
        setUserPreferences((prev) => {
            const current = prev[type] as string[];
            let updated: string[];

            if (action === "add" && !current.includes(value)) {
                updated = [...current, value];
            } else if (action === "remove") {
                updated = current.filter((item) => item !== value);
            } else {
                updated = current;
            }

            return { ...prev, [type]: updated };
        });
    };

    useEffect(() => {
        connectWebSocket();
        return () => disconnectWebSocket();
    }, []);

    const renderMarkdown = (text: string) => {
        // Simple markdown rendering
        return text
            .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
            .replace(
                /## (.*)/g,
                '<h2 class="text-xl font-semibold mb-3">$1</h2>'
            )
            .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*)\*/g, "<em>$1</em>")
            .replace(/\n/g, "<br>");
    };

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

                        {/* User Preferences */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Health Goals
                                </label>
                                <div className="space-y-2">
                                    {[
                                        "weight_loss",
                                        "muscle_gain",
                                        "heart_health",
                                        "diabetes",
                                    ].map((goal) => (
                                        <label
                                            key={goal}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={userPreferences.health_goals.includes(
                                                    goal
                                                )}
                                                onChange={(e) =>
                                                    updateUserPreference(
                                                        "health_goals",
                                                        goal,
                                                        e.target.checked
                                                            ? "add"
                                                            : "remove"
                                                    )
                                                }
                                                className="mr-2"
                                                disabled={isStreaming}
                                            />
                                            {goal.replace("_", " ")}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Dietary Preferences
                                </label>
                                <div className="space-y-2">
                                    {[
                                        "vegetarian",
                                        "vegan",
                                        "keto",
                                        "low_sodium",
                                    ].map((pref) => (
                                        <label
                                            key={pref}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={userPreferences.dietary_preferences.includes(
                                                    pref
                                                )}
                                                onChange={(e) =>
                                                    updateUserPreference(
                                                        "dietary_preferences",
                                                        pref,
                                                        e.target.checked
                                                            ? "add"
                                                            : "remove"
                                                    )
                                                }
                                                className="mr-2"
                                                disabled={isStreaming}
                                            />
                                            {pref.replace("_", " ")}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Nutrition Priorities
                                </label>
                                <div className="space-y-2">
                                    {[
                                        "natural_ingredients",
                                        "high_protein",
                                        "low_sugar",
                                        "high_fiber",
                                    ].map((priority) => (
                                        <label
                                            key={priority}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={userPreferences.nutrition_priorities.includes(
                                                    priority
                                                )}
                                                onChange={(e) =>
                                                    updateUserPreference(
                                                        "nutrition_priorities",
                                                        priority,
                                                        e.target.checked
                                                            ? "add"
                                                            : "remove"
                                                    )
                                                }
                                                className="mr-2"
                                                disabled={isStreaming}
                                            />
                                            {priority.replace("_", " ")}
                                        </label>
                                    ))}
                                </div>
                            </div>
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
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: renderMarkdown(currentAnalysis),
                            }}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Debug Messages */}
            {messages.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Debug Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className="text-sm p-2 bg-gray-100 rounded"
                                >
                                    <strong>{msg.type}:</strong> {msg.content}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
