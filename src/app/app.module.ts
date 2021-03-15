import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

//Modulos de Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Componentes
import { LoginComponent } from './admin/login/login.component';
import { RegistroComponent } from './admin/registro/registro.component';
import { RecordarPassComponent } from './admin/recordar-pass/recordar-pass.component';
import { VerificarEmailComponent } from './admin/verificar-email/verificar-email.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//Servicios
import { NgAuthService } from './services/auth.service';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccesoIncorrectoComponent } from './components/acceso-incorrecto/acceso-incorrecto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecordarPassComponent,
    VerificarEmailComponent,
    NavbarComponent,
    PageNotFoundComponent,
    EntradasComponent,
    AccesoIncorrectoComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [NgAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
