import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  // BehaviorSubject to track the user's authentication state
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private apiUrl: string = environment.apiUrl;
  private jwthelper: any = new JwtHelperService();
  private userAuth: BehaviorSubject<User> = new BehaviorSubject<User>({});
  

  constructor(private http: HttpClient) {
    // Initialize the authentication state based on whether the user is already authenticated (e.g., via token stored in local storage)
    this.isAuthenticatedSubject.next(this.isAuthenticated());
  }

  // Simulate a login process (replace with your actual login logic)
  login(username: string, password: string): Observable<boolean> {
    // Perform authentication logic here (e.g., validate credentials with a server)

    var result = this.http.post<any>(`${this.apiUrl}/auth/login`, { email: username, password })
      .pipe(map(res => {
        const hasToken = res.token != null && res.token != '';
        let newToken = this.jwthelper.isTokenExpired(res.token) ? '' : res.token;
        
        // Update the authentication state
        this.isAuthenticatedSubject.next(hasToken);

        // set session token    
        localStorage.setItem('token', newToken);

        if (hasToken) { 
          this.setUser(newToken, username);
        }

        return hasToken;
    }));

    return result;
  }

  // Logout the user
  logout(): void {
    // Perform logout logic here (e.g., clear tokens, session data, etc.)

    // For this example, let's assume successful logout
    const isAuthenticated = false;
    localStorage.removeItem("token");
    this.userAuth.next({});

    // Update the authentication state
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    // Perform a check (e.g., check for a valid token)

    // For this example, let's simulate authentication based on the presence of a token in local storage
    const token = localStorage.getItem('token');

    return !this.jwthelper.isTokenExpired(token);
  }

  // Get an observable to subscribe to the authentication state changes
  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // decode token used to get user
  // set per reload
  setUserByToken(): void {
    const token = localStorage.getItem('token');
    
    if (token != '' && token != null) { 
      if (!this.jwthelper.isTokenExpired(token)) {
        const res = this.jwthelper.decodeToken(token);
        const username = res.sub;
        this.setUser(token, username);
      }
    }
  }

  // get data from api and set to user model
  setUser(token: string, username: string): void {
    this.http.get<any>(`${this.apiUrl}/user/info?user=${username}`, {
      headers: { 'Authorization': `Bearer ${token}`, }
    }).subscribe(
      res => {
        this.userAuth.next(res)
      },
      err => console.log('error',err)
    );
  }

  get user(): User { 
    return this.userAuth.value;
  }

  // get user(): Observable<User> { 
  //   return this.userAuth.asObservable();
  // }

  getHttpHeaders(token: string) : void {
    new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }
}