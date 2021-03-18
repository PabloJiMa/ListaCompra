import { Component, OnInit } from '@angular/core';

import { NgAuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DebeCoincidir } from 'src/app/validators/coincidir.validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup = new FormBuilder().group({
    userName: ['', [Validators.required, Validators.email]],      
    userPass: ['', [Validators.required, Validators.minLength(6)]],
    userPassComprobar: ['', [Validators.required, Validators.minLength(6)]]
  }
  , {
    validator: DebeCoincidir('userPass', 'userPassComprobar')
  });
  enviado: boolean = false;

  constructor(
    public router: Router,
    public auth: NgAuthService,
    private formBuilder: FormBuilder  
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],      
      userPass: ['', [Validators.required, Validators.minLength(6)]],
      userPassComprobar: ['', [Validators.required, Validators.minLength(6)]]

    }
    , {
      validator: DebeCoincidir('userPass', 'userPassComprobar')
    });
  }

  get f() { return this.form.controls; }

  Registro(){
      this.enviado=true;      
      if (this.form.invalid) {     
        return;
      } else {
        this.auth.Registro(this.f.userName.value, this.f.userPass.value);
      }
  }

}
