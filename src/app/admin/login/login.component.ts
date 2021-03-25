import { Component, OnInit } from '@angular/core';


import { NgAuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormBuilder().group({
      userName: ['', [Validators.required, Validators.email]],      
      userPass: ['', [Validators.required, Validators.minLength(6)]],
      rememberPwd: ['']
    });
  enviado: boolean = false;
  
  constructor(
    public router: Router,
    public auth: NgAuthService,
    private formBuilder: FormBuilder
    
    ) {
      
     }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],      
      userPass: ['', [Validators.required, Validators.minLength(6)]],
      rememberPwd: ['']
    });

    //TEMPORAL PARA HACER DEBUG
    if(localStorage.getItem('userMail') !== null && localStorage.getItem('userMail') !== "" /*|| isDevMode()*/){
      this.form.controls["userName"].setValue(localStorage.getItem('userMail'));
      this.form.controls["userPass"].setValue(localStorage.getItem('userPass'));
      this.form.controls["rememberPwd"].setValue(true);
    } else {
      this.form.controls["rememberPwd"].setValue(false);
    }
    
  }

  get f() { return this.form.controls; }

  validarObligatorios(){
      this.enviado=true;
      // stop here if form is invalid
      if (this.form.invalid) {     
        return;
      } else {
        this.auth.Login(this.f.userName.value, this.f.userPass.value, this.f.rememberPwd.value);
      }
  }
}
