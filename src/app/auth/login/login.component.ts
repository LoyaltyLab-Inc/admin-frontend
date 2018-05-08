import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/utils';

@Component({
  selector: 'af-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.less']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) { }
}
