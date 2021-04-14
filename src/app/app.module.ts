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
import { AccesoIncorrectoComponent } from './components/acceso-incorrecto/acceso-incorrecto.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';

//Servicios
import { NgAuthService } from './services/auth.service';
import { ControlMensajesService } from './services/control-mensajes.service';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FechaPipe } from './pipes/fecha.pipe';
import { DetalleListaCompraComponent } from './components/detallelistacompra/detallelistacompra.component';

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
    AccesoIncorrectoComponent,
    DialogComponent,
    PerfilComponent,
    FechaPipe,
    DetalleListaCompraComponent    
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
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [
    NgAuthService, 
    ControlMensajesService, 
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
