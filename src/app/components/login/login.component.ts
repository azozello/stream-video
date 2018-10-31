import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('enterEmail') enterEmail: ElementRef;
  @ViewChild('enterPassword') enterPassword: ElementRef;

  @ViewChild('formEmail') formEmail: ElementRef;
  @ViewChild('email') email: ElementRef;

  @ViewChild('formPassword') formPassword: ElementRef;
  @ViewChild('password') password: ElementRef;

  loginForm: FormGroup;

  constructor(private renderer: Renderer2,
              private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onFocusEmail() {
    this.renderer.addClass(this.formEmail.nativeElement, 'focused');
  }

  public onBlurEmail() {
    console.log(this.loginForm.controls['email'].value + 'ada');
    if (this.loginForm.controls['email'].value === '') {
      this.renderer.removeClass(this.email.nativeElement, 'filled');
      this.renderer.removeClass(this.formEmail.nativeElement, 'focused');
    } else {
      this.renderer.addClass(this.email.nativeElement, 'filled');
    }
  }

  public onFocusPassword() {
    this.renderer.addClass(this.formPassword.nativeElement, 'focused');
  }

  public onBlurPassword() {
    console.log(this.loginForm.controls['password'].value + 'ada');
    if (this.loginForm.controls['password'].value === '') {
      this.renderer.removeClass(this.password.nativeElement, 'filled');
      this.renderer.removeClass(this.formPassword.nativeElement, 'focused');
    } else {
      this.renderer.addClass(this.password.nativeElement, 'filled');
    }
  }

  public next() {
    this.renderer.addClass(this.enterEmail.nativeElement, 'animate_fade_out');
    setTimeout(() => {
      this.renderer.addClass(this.enterEmail.nativeElement, 'dn');
      this.renderer.removeClass(this.enterPassword.nativeElement, 'dn');
      this.renderer.addClass(this.enterPassword.nativeElement, 'animate_fade_in');
    }, 700);
    this.clearFades();
  }

  public prev() {
    this.renderer.addClass(this.enterPassword.nativeElement, 'animate_fade_out');
    setTimeout(() => {
      this.renderer.addClass(this.enterPassword.nativeElement, 'dn');
      this.renderer.removeClass(this.enterEmail.nativeElement, 'dn');
      this.renderer.addClass(this.enterEmail.nativeElement, 'animate_fade_in');
    }, 700);
    this.clearFades();
  }

  private clearFades() {
    this.renderer.removeClass(this.enterPassword.nativeElement, 'animate_fade_out');
    this.renderer.removeClass(this.enterPassword.nativeElement, 'animate_fade_in');

    this.renderer.removeClass(this.enterEmail.nativeElement, 'animate_fade_out');
    this.renderer.removeClass(this.enterEmail.nativeElement, 'animate_fade_in');
  }
}
