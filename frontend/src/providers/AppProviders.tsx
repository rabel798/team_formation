import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

interface AppProvidersProps {
    children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                    },
                }}
            />
        </BrowserRouter>
    );
};

export default AppProviders; 