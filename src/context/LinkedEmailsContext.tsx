import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LinkedEmail {
  email: string;
  linkedAt: string;
  lastSyncedAt?: string;
  status: 'active' | 'syncing' | 'error';
  tokens?: any;
}

interface LinkedEmailsContextType {
  linkedEmails: LinkedEmail[];
  addEmail: (email: string) => Promise<void>;
  linkRealEmail: () => Promise<void>;
  retryEmail: (email: string) => Promise<void>;
  removeEmail: (email: string) => void;
  isAnyEmailLinked: boolean;
}

const LinkedEmailsContext = createContext<LinkedEmailsContextType | undefined>(undefined);

export const LinkedEmailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [linkedEmails, setLinkedEmails] = useState<LinkedEmail[]>([]);

  const linkRealEmail = async () => {
    try {
      // 1. Fetch the OAuth URL from your server
      const response = await fetch('/api/auth/url');
      if (!response.ok) {
        throw new Error('Failed to get auth URL');
      }
      const { url } = await response.json();

      // 2. Open the OAuth PROVIDER's URL directly in popup
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        alert('Please allow popups for this site to connect your account.');
        return;
      }

      // 3. Listen for success message from popup
      const handleMessage = async (event: MessageEvent) => {
        const origin = event.origin;
        if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
          return;
        }

        if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
          const { tokens } = event.data;
          
          // For demo, we'll just use a placeholder email or try to decode from id_token if available
          // In a real app, you'd fetch the user profile using the access token
          const newEmail: LinkedEmail = {
            email: 'connected-account@gmail.com', // Placeholder for demo
            linkedAt: new Date().toISOString(),
            status: 'active',
            lastSyncedAt: new Date().toISOString(),
            tokens
          };
          
          setLinkedEmails(prev => [...prev, newEmail]);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  const addEmail = async (email: string) => {
    // Simulate linking process
    const newEmail: LinkedEmail = {
      email,
      linkedAt: new Date().toISOString(),
      status: 'syncing',
    };
    
    setLinkedEmails((prev) => [...prev, newEmail]);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 10% chance of error for simulation
    const isError = Math.random() < 0.1;

    setLinkedEmails((prev) =>
      prev.map((e) => (e.email === email ? { ...e, status: isError ? 'error' : 'active', lastSyncedAt: isError ? e.lastSyncedAt : new Date().toISOString() } : e))
    );
  };

  const retryEmail = async (email: string) => {
    setLinkedEmails((prev) =>
      prev.map((e) => (e.email === email ? { ...e, status: 'syncing' } : e))
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 10% chance of error for simulation
    const isError = Math.random() < 0.1;

    setLinkedEmails((prev) =>
      prev.map((e) => (e.email === email ? { ...e, status: isError ? 'error' : 'active', lastSyncedAt: isError ? e.lastSyncedAt : new Date().toISOString() } : e))
    );
  };

  const removeEmail = (email: string) => {
    setLinkedEmails((prev) => prev.filter((e) => e.email !== email));
  };

  const isAnyEmailLinked = linkedEmails.some((e) => e.status === 'active');

  return (
    <LinkedEmailsContext.Provider value={{ linkedEmails, addEmail, linkRealEmail, retryEmail, removeEmail, isAnyEmailLinked }}>
      {children}
    </LinkedEmailsContext.Provider>
  );
};

export const useLinkedEmails = () => {
  const context = useContext(LinkedEmailsContext);
  if (context === undefined) {
    throw new Error('useLinkedEmails must be used within a LinkedEmailsProvider');
  }
  return context;
};
