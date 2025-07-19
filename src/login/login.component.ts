import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { AuthApiService } from '../services/authApi.service';
import { LoginUser } from '../interfaces/loginUser';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authApiService: AuthApiService
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    const dto: LoginUser = this.loginForm.value;
    try {
      const user = await firstValueFrom(this.authApiService.login(dto));
      const { data, token } = user;
      this.authService.login(data, token);
    } catch (error) {
      alert(error);
    } 
  }
}
