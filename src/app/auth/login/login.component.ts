import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserContextService } from '../../shared/userContext.service';
import { User } from '../../models/User';

@Component({
  selector: 'af-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isErrorVisible = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserContextService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSignedIn() {
    this.userService.getUser(this.form.get('email').value)
      .subscribe((user: User) => {
        if (user && user.password === this.form.get('password').value) {
          this.router.navigate(['statistic', 'all']);
        } else {
          this.isErrorVisible = true;
          setTimeout(() => {
            this.isErrorVisible = false;
          }, 4000);
        }
      });
  }

  onSignedUp() {

    this.router.navigate(['auth', 'signup']);
  }
}
