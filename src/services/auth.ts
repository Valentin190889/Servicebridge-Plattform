import type { User } from '../types/auth';

export type LoginProvider = 'email' | 'linkedin' | 'x';

interface LoginCredentials {
  email: string;
  password: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async loginWithEmail(credentials: LoginCredentials): Promise<User> {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: '1',
          email: credentials.email,
          name: 'John Doe',
          avatarUrl: 'https://example.com/avatar.jpg'
        };
        this.currentUser = user;
        this.saveToLocalStorage(user);
        resolve(user);
      }, 1000);
    });
  }

  async loginWithProvider(provider: LoginProvider): Promise<User> {
    // TODO: Implement actual OAuth flow
    return new Promise((resolve) => {
      const popup = window.open(
        `https://your-api.com/auth/${provider}`,
        'Login',
        'width=500,height=600'
      );

      window.addEventListener('message', (event) => {
        if (event.data.type === 'auth_complete') {
          const user = event.data.user;
          this.currentUser = user;
          this.saveToLocalStorage(user);
          resolve(user);
        }
      });
    });
  }

  async logout(): Promise<void> {
    // TODO: Implement actual logout
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        resolve();
      }, 500);
    });
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  private saveToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  }
}

export const authService = AuthService.getInstance(); 