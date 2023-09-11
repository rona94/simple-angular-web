import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  formUserUpdate: any;
  user: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.formUserUpdate = this.formBuilder.group({
      email: '',
      firstname: '',
      lastname: '',
      age: 0,
      address: '',
      contact: '',
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setForm();
    }, 30);
  }

  setForm() {
    this.user = this.authService.user;
    this.formUserUpdate.setValue({
      email: this.user.email || '',
      firstname: this.user.firstname || '',
      lastname: this.user.lastname || '',
      age: this.user.age || 0,
      address: this.user.address || '',
      contact: this.user.contact || '',
    });
  };

  submit() {
    this.userService.updateUser(this.formUserUpdate.value).subscribe((res) => {
      console.log(res);
    });
  }

}
