import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = {} as FormGroup;
  successMessage: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['student', Validators.required], // Default role or empty string, adjust as needed

    });
  }



  onSubmit() {
    if (this.signupForm.valid) {
      //console.log(this.signupForm.value);
      const { username,email, password,role } = this.signupForm.value;
      this.authService.signup({username,email,password,role}).subscribe({

        next:() => {
          this.successMessage = 'Information added successfully';

          console.log('User Signed Up successfully');
        },
        error:(error)=>{
          console.error('Error while User SignUp',error);

        }
       } );
    }
  }
}
