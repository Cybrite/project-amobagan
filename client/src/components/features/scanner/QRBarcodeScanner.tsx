"use client";

import {
  useEffect,
  useRef,
} from 'react';

import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner({ onScanSuccess }) {
    const scannerRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 10,
        });

        scannerRef.current = scanner;

        scanner.render((decodedText) => {
            onScanSuccess(decodedText);
            scanner.clear();
        });

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
