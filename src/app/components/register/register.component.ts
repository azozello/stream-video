import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _auth: AuthService) {
    this.registerForm = fb.group({
      email: ['', Validators.required],
      image: ['', Validators.required],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!this._auth.isTokenExpired()) {
      this.router.navigate(['']);
    }
  }

  register() {
    this._auth.register(
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['image'].value
    ).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }
}
