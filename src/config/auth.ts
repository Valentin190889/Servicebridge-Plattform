import { Configuration, PublicClientApplication, EventType } from '@azure/msal-browser';

// MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false,
    loggerOptions: {
      logLevel: 3, // Error
      piiLoggingEnabled: false
    }
  }
};

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

// Default login request
export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read']
};

// Initialize MSAL
export const initializeMsal = async () => {
  try {
    // Register Callbacks for Success and Error
    msalInstance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log('Login successful');
      }
      if (event.eventType === EventType.LOGIN_FAILURE) {
        console.error('Login failed:', event.error);
      }
    });

    // Handle redirect promise
    await msalInstance.handleRedirectPromise();

    // Initialize
    await msalInstance.initialize();
  } catch (error) {
    console.error('Failed to initialize MSAL:', error);
  }
};