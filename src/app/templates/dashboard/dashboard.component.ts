import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit {
  user: any = null;
  hasSidebar = false;
  isMobile = matchMedia("(max-width: 768px)").matches;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.user = this.authService.user;
    }, 30);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onResize(): void {
    this.isMobile = matchMedia("(max-width: 768px)").matches;
  }
}
