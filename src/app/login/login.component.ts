import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import {NgxUiLoaderService} from 'ngx-ui-loader'
import { GlobalConstants } from '../shared/global-constans';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {


  loginForm: any = FormGroup
  responseMessage: any;


constructor(private router: Router,
  private userService: UserService,
  private snackbarService: SnackbarService,
  private dialogRef: MatDialogRef<LoginComponent>,
  private ngxService: NgxUiLoaderService,
  private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null,[Validators.required]]

    })
  }

  close() 
    {
      this.router.navigate(["/"])
      this.dialogRef.close();
      
      
      

  }
 

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((response: any)=> {
      this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token', response.token)
     
      this.router.navigate(['/max-your-lifts/dashboard'])

    }, (error)=> {
      this.ngxService.stop();
      if(error.error?.messagge) {
        this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openToast(this.responseMessage, GlobalConstants.error)
    })
  }

}