import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('animateMe', [
      state('open', style({
        opacity: 1,
        height: '30px',
        transform: 'translateY(0)',
      })),
      state('closed', style({
        opacity: 0,
        height: 0,
        transform: 'translateY(-30px)',
      })),

      transition('open => closed, closed => open', [
        animate('0.3s')
      ]),
    ])
  ]
})
  
export class LoginComponent implements OnInit {
  formLogin: any;
  hasError: boolean = false;
  hasErrorEmail: boolean = false;
  hasErrorPass: boolean = false;
  returnUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (Object.keys(this.authService.user).length > 0) {
      this.router.navigate(['/']);
    }
    
    this.formLogin = this.formBuilder.group({
      username: "",
      password: "",
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    let formVal = this.formLogin;

    if (formVal.status == 'VALID') {
      let { username, password } = formVal.value;
      this.authService.login(username, password).subscribe( res => {
        if (res) {
          this.hasError = this.hasErrorEmail = this.hasErrorPass = false;
          this.router.navigateByUrl(this.returnUrl);
        }
        else { 
          this.hasError = this.hasErrorEmail = this.hasErrorPass = true;
        }
      });
    }
  }

  updateInput(type: string) {
    // do only if has error
    if (this.hasErrorEmail || this.hasErrorPass) {
      switch (type) {
        case 'password':
          this.hasErrorPass = false;
          break;
        default:
          this.hasErrorEmail = false;
      } 
    }
  }
}
