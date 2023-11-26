import { Component } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Make sure to import Router


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService,public router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful');
          //console.log('Responsed Token:', response.userId);
          console.log('Login Response:', response);

          // Save the token
          const token = response.token;
          this.authService.setToken(token);
          // Save the user ID
          const userId = response.id;
          

          this.authService.saveUserId(userId);


          // Redirect based on the role
          const role = response.role;
          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'student') {
            this.router.navigate(['/student-dashboard']);
          } else {
            console.error('Unknown role:', role);
          }
        },
        error: (error) => {
          console.error('Error while User Login', error);
        },
      });
    }
  }
}




  

