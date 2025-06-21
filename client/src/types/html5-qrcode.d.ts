declare module "html5-qrcode" {
    export class Html5QrcodeScanner {
        constructor(
            elementId: string,
            config: {
                fps: number;
                qrbox: { width: number; height: number };
                aspectRatio: number;
                supportedScanTypes?: number[];
            },
            verbose: boolean
        );
        render(
            onScanSuccess: (decodedText: string, decodedResult: any) => void,
            onScanError: (errorMessage: string) => void
        ): void;
        clear(): void;
    }

    export class Html5Qrcode {
        static SCAN_TYPE_CAMERA: number;
        static SCAN_TYPE_FILE: number;
        static getCameras(): Promise<Array<{ id: string; label: string }>>;
        stop(): Promise<void>;
    }
}
