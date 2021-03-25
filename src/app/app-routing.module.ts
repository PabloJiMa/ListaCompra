import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from  './admin/login/login.component';
import { RegistroComponent } from  './admin/registro/registro.component';
import { RecordarPassComponent } from  './admin/recordar-pass/recordar-pass.component';
import { VerificarEmailComponent } from  './admin/verificar-email/verificar-email.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { AccesoIncorrectoComponent } from './components/acceso-incorrecto/acceso-incorrecto.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetallelistacompraComponent } from './components/detallelistacompra/detallelistacompra.component';

//Servicios
import { AuthGuard } from "./services/auth.guard";

const  routes:  Routes  = [
      { path: '',   redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component:  LoginComponent},
      { path: 'registro', component:  RegistroComponent },
      { path: 'recordar-pass', component:  RecordarPassComponent },
      { path: 'verificar-email', component:  VerificarEmailComponent },
      { path: 'entradas', component:  EntradasComponent, canActivate: [AuthGuard]  },
      { path: 'detallelistacompra', component:  DetallelistacompraComponent, canActivate: [AuthGuard]  },
      { path: 'acceso-incorrecto', component: AccesoIncorrectoComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
