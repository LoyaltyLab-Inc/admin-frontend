import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserContextService } from '../../shared/userContext.service';

@Component({
  selector: 'af-signup',
  templateUrl: './signup.template.html',
  styleUrls: ['./signup.style.less']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isErrorVisible = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserContextService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignedIn() {
    this.router.navigate(['auth', 'login']);
  }

  onSignedUp() {
    const user: User = this.form.value;

    this.userService.postUser(user)
      .subscribe(resUser => {
        if (resUser) {
          this.router.navigate(['statistic', 'all']);
        } else {
          this.isErrorVisible = true;
          setTimeout(() => {
            this.isErrorVisible = false;
          }, 4000);
        }
      });
  }

}
