import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(private authService: AuthService) {}

    // Add your pre-initialization logic here
    async initialize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.authService.setUserByToken();
            setTimeout(() => {
                console.log('AppInitService Finished');
                resolve();
            }, 30);
        });
  }
}