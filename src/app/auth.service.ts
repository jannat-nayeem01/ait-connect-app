import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenKey = 'keyJ';
  private userIdKey = 'user-id';

  constructor(private http: HttpClient,private router:Router) { }

  signup(user: { username: string, email: string, password: string, role: string }): Observable<any> {
    //console.log('Service',user);
    return this.http.post(`${this.apiUrl}/signup`, user);
  }
  

  login(user: { email: string, password: string }): Observable<any> {
    //return this.http.post(`${this.apiUrl}/login`, user);

    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token || null;
  }
  saveUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);

    this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  isUserAdmin(): boolean {
    // Assuming you have a 'role' property in your user data
    return this.getUserRole() === 'admin';
  }
  
  isUserStudent(): boolean {
    // Assuming you have a 'role' property in your user data
    return this.getUserRole() === 'student';
  }
  getUserRole(): string | null {
    const token = this.getToken();
    
    if (token) {
      // Decode the JWT token to get user information
      const tokenPayload = this.decodeToken(token);
      console.log('Hey:Payload ',tokenPayload);

      // Assuming 'role' is a property in the token payload
      return tokenPayload?.role || null;
    }

    return null;
  }

  private decodeToken(token: string): any | null {
    try {
      // Decode the JWT token
      const tokenPayloadBase64 = token.split('.')[1];
      const tokenPayloadJson = atob(tokenPayloadBase64);
      return JSON.parse(tokenPayloadJson);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
  
}
