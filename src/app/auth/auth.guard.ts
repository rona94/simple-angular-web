import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppInitService } from '../app-init.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private preInitService: AppInitService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      return true; // User is allowed to access the route
    }

    // If not authenticated, redirect to the login page with a return URL
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false; // User is not allowed to access the route
  }
  
}
