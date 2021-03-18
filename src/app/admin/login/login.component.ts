import { Component, OnInit } from '@angular/core';


import { NgAuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormBuilder().group({
      userName: ['', [Validators.required, Validators.email]],      
      userPass: ['', [Validators.required, Validators.minLength(6)]]
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
      userPass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  validarObligatorios(){
      this.enviado=true;
      // stop here if form is invalid
      if (this.form.invalid) {     
        return;
      } else {
        this.auth.Login(this.f.userName.value, this.f.userPass.value);
      }
  }
}
