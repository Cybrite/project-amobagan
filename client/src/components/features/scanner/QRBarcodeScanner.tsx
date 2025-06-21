"use client";
import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrScannerConfig {
  fps: number;
  qrbox?: {
    width: number;
    height: number;
  };
  aspectRatio?: number;
  verbose?: boolean;
}

export default function QRScanner({
  onScanSuccess,
}: {
  onScanSuccess: (decodedText: string) => void;
}) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const config: QrScannerConfig = {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
      aspectRatio: 1.0,
    };

    const scanner = new Html5QrcodeScanner("qr-reader", config as any);
    scannerRef.current = scanner;

    scanner.render(
      (decodedText: string) => {
        onScanSuccess(decodedText);
        scanner.clear();
      },
      (errorMessage: string) => {
        console.error("QR code scanning error:", errorMessage);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="qr-reader" className="w-full bg-white text-black"></div>
    </div>
  );
}
