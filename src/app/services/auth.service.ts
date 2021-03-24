import { Injectable, NgZone } from '@angular/core';
//import { firebase } from 'firebase/app';
import { User } from "../clases/user";
import { ControlMensajesService } from "../services/control-mensajes.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
    userState: any;
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    //Método para saber si estamos logados
    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
      public dialog: MatDialog,
      public mensajes: ControlMensajesService     
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));         
        } else {
          localStorage.setItem('user', '');
        }
      })
    }
    
    //Método para hacer login
    Login(email: string, pass: string) {      
      return this.afAuth.signInWithEmailAndPassword(email, pass)
        .then((result) => {
          this.ngZone.run(() => {
            console.log('Autenticado con éxito');
            this.router.navigate(['entradas']);
          });
          this.SetUserData(result.user);
          this.loggedIn.next(true);
        }).catch((error) => {
          this.dialog
          .open(DialogComponent, {
            data: this.mensajes.getMensaje(error.code)
          });
        })
    }
    
    //Método para registrarse
    Registro(email: string, pass: string) {
      return this.afAuth.createUserWithEmailAndPassword(email, pass)
        .then((result) => {
          //this.EnvioCorreoVerificacion();
          this.SetUserData(result.user);
        }).catch((error) => {
          console.log(error);
          this.dialog
          .open(DialogComponent, {
            data: this.mensajes.getMensaje(error.code)
          });          
        })
    }

    //Método para enviar correo de verificación.     
    //EnvioCorreoVerificacion() {
    //    return this.afAuth.currentUser.then(u => u!.sendEmailVerification())
    //    .then(() => {
    //      this.router.navigate(['login']);
    //      this.dialog
    //      .open(DialogComponent, {
    //        data: this.mensajes.getMensaje("auth/register-ok")
    //      });  
    //    }).catch((error) => {
    //      console.log(error);
    //      this.dialog
    //      .open(DialogComponent, {
    //        data: this.mensajes.getMensaje(error.code)
    //      });          
    //    })
    //}    
    
    //Método para recordar contraseña
    RecordarPass(email: string) {
      return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.dialog
          .open(DialogComponent, {
            data: this.mensajes.getMensaje("auth/recover-pass")
          });
        this.router.navigate(['login']);
      }).catch((error) => {
        this.dialog
          .open(DialogComponent, {
            data: this.mensajes.getMensaje(error.code)
          });
      })
    }
    
    //Método para registrarse con Google
    //GoogleAuth() {
    //  return this.AuthLogin(new firebase.GoogleAuthProvider());
    //}
  
    //AuthLogin(provider: any) {
    //  return this.afAuth.signInWithPopup(provider)
    //  .then((result) => {
    //     this.ngZone.run(() => {
    //        this.router.navigate(['dashboard']);
    //      })
    //    this.SetUserData(result.user);
    //  }).catch((error) => {
    //    this.dialog
    //      .open(DialogComponent, {
    //        data: error.message
    //      });
    //  })
    //}
    
    //Método para recoger el usuario registrado/que ha hecho login, e insertarlo en una coleccion
    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userRegistrado: User = {
        uid: user.uid,
        email: user.email,
        nombre: user.email,
        foto: ""        
      }
      return userRef.set(userRegistrado, {
        merge: true
      })
    }
    
    //Método para salir
    LogOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        this.loggedIn.next(false);
      })
    }  

    getTotalUsers(){
      //return this.afs.collection('users').
    }
}