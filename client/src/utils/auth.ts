import { jwtDecode, type JwtPayload } from 'jwt-decode';

// Extend the decoded payload
interface ExtendedJwt extends JwtPayload {
  data: {
    _id: string;
    email: string;
    username: string;
    role: 'user' | 'admin';
  };
}

class AuthService {
  private tokenKey = 'id_token';

  getProfile(): ExtendedJwt['data'] | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<ExtendedJwt>(token);
      return decoded.data;
    } catch {
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(idToken: string): void {
    localStorage.setItem(this.tokenKey, idToken);
    window.location.assign('/');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    window.location.assign('/');
  }
}

export default new AuthService();
