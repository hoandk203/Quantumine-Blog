declare global {
    interface Window {
        google?: {
            accounts: {
                oauth2: {
                    initCodeClient: (config: any) => any;
                };
                id: {
                    initialize: (config: any) => void;
                    prompt: (callback?: (notification: any) => void) => void;
                };
            };
        };
    }
}

export {};
