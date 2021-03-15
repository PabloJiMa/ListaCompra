import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from  './admin/login/login.component';
import { RegistroComponent } from  './admin/registro/registro.component';
import { RecordarPassComponent } from  './admin/recordar-pass/recordar-pass.component';
import { VerificarEmailComponent } from  './admin/verificar-email/verificar-email.component';

const  routes:  Routes  = [
  {
    path:  'admin',
    component:  LoginComponent,
    children: [      
      { path:  'login', component:  LoginComponent},
      { path:  'registro', component:  RegistroComponent },
      { path:  'recordar-pass', component:  RecordarPassComponent },
      { path:  'verificar-email', component:  VerificarEmailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
