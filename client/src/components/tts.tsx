import {
  useEffect,
  useRef,
  useState,
} from 'react';

// Audio cache to store generated audio
const audioCache = new Map<string, HTMLAudioElement>();

export default function TTS({ text }: { text: string }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
        null
    );
    const [hasAudio, setHasAudio] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Check if audio exists for current text
    useEffect(() => {
        if (text && audioCache.has(text)) {
            setHasAudio(true);
            setAudioElement(audioCache.get(text) || null);
            setShowFloatingButton(true);
        } else if (text && text.trim()) {
            setHasAudio(false);
            setAudioElement(null);
            setShowFloatingButton(true);
        } else {
            setShowFloatingButton(false);
        }
    }, [text]);

    const handleTTS = async () => {
        if (!text || isGenerating || isPlaying) return;

        // Check cache first
        if (audioCache.has(text)) {
            const cachedAudio = audioCache.get(text)!;
            setAudioElement(cachedAudio);
            setHasAudio(true);
            return;
        }

        setIsGenerating(true);
        try {
            const response = await fetch("/api/tts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: text }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate audio");
            }

            const data = await response.json();
            const audio = new Audio(`data:audio/mpeg;base64,${data.audio}`);

            // Cache the audio
            audioCache.set(text, audio);

            audio.onended = () => {
                setIsPlaying(false);
            };

            audio.onplay = () => {
                setIsPlaying(true);
            };

            audio.onpause = () => {
                setIsPlaying(false);
            };

            setAudioElement(audio);
            setHasAudio(true);
        } catch (error) {
            console.error("TTS generation failed:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePlayPause = () => {
        if (!audioElement) return;

        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    };

    const handleReplay = () => {
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        if (isPlaying) {
            audioElement?.pause();
        }
    };

    const handleFloatingButtonClick = () => {
        if (!hasAudio && !isGenerating) {
            handleTTS();
        }
        setIsVisible(true);
    };

    if (!showFloatingButton) return null;

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={handleFloatingButtonClick}
                    className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title="Listen to nutrition analysis"
                >
                    {isGenerating ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : hasAudio ? (
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* TTS Popup */}
            {isVisible && (
                <div className="fixed bottom-20 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-800">
                                    AI Assistant
                                </span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="mb-3">
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {text.length > 100
                                    ? `${text.substring(0, 100)}...`
                                    : text}
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            {isGenerating ? (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    Generating audio...
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={handlePlayPause}
                                        disabled={!hasAudio}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            hasAudio
                                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        {isPlaying ? (
                                            <>
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Play
                                            </>
                                        )}
                                    </button>

                                    {hasAudio && (
                                        <button
                                            onClick={handleReplay}
                                            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Replay
                                        </button>
                                    )}

                                    {!hasAudio && (
                                        <button
                                            onClick={handleTTS}
                                            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Generate
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden audio element for ref */}
            <audio ref={audioRef} style={{ display: "none" }} />
        </>
    );
}
