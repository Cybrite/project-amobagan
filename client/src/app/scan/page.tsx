"use client";

import QRScanner from '@/components/features/scanner/QRBarcodeScanner';

export default function ScanPage() {
    const handleScanSuccess = (decodedText: string) => {
        console.log("Scanned QR Code:", decodedText);
        if (decodedText.length === 13) {
            const productId = decodedText;
            window.location.href = `/streaming?barcode=${productId}`;
        }
    };
    return <QRScanner onScanSuccess={handleScanSuccess} />;
}
