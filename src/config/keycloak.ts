import KeycloakConnect from 'keycloak-connect';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import type { Express } from 'express';

export const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM || 'servicebridge',
  'auth-server-url': process.env.KEYCLOAK_URL || 'http://localhost:8080',
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID || 'servicebridge-client',
  secret: process.env.KEYCLOAK_CLIENT_SECRET,
  'confidential-port': 0,
  'bearer-only': false,
  public: false
};

export const createKeycloakMiddleware = (memoryStore: any) => {
  const keycloak = new KeycloakConnect({ store: memoryStore }, keycloakConfig);
  return keycloak;
};

export const initKeycloakAdmin = async () => {
  const keycloakAdmin = new KeycloakAdminClient({
    baseUrl: process.env.KEYCLOAK_URL || 'http://localhost:8080',
    realmName: process.env.KEYCLOAK_REALM || 'servicebridge'
  });

  try {
    await keycloakAdmin.auth({
      grantType: 'client_credentials',
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'servicebridge-client',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET
    });
    console.log('Keycloak admin client initialized successfully');
    return keycloakAdmin;
  } catch (error) {
    console.error('Failed to initialize Keycloak admin client:', error);
    throw error;
  }
};

export default keycloakConfig; 