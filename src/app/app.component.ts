import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service'; 
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animateMe', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),

      transition('closed => open', [
        animate('0.2s')
      ]),

      transition('open => closed', [
        animate('0.1s')
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'angularjs';
  user: any = null;
  isLoggedIn: boolean = false;
  hasSidebar: boolean = false;
  isMobile: boolean = matchMedia("(max-width: 768px)").matches;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() { }
  
  componentAdded(data: any) {
    setTimeout(() => {
      this.user = this.authService.user;      
      this.isLoggedIn = Object.keys(this.user || {}).length > 0;
    }, 30);
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onResize(): void {
    this.isMobile = matchMedia("(max-width: 768px)").matches;
  }
}
