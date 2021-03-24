import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ControlMensajesService } from './control-mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class ListaCompraService {

  private nombreColeccion: string = "ListaCompra";
  private nombreColeccionItem: string = "ItemListaCompra";
  constructor(private firestore: AngularFirestore,
      public router: Router,      
      public dialog: MatDialog,
      public mensajes: ControlMensajesService  
    
    ) { }

  addListaCompra(listaCompra: any){
    return this.firestore.collection(this.nombreColeccion).add(listaCompra).then(()=>{
      this.dialog
      .open(DialogComponent, {
        data: this.mensajes.getMensaje("lista/add-lista")
      });
    }).catch((error) => {
      this.dialog
      .open(DialogComponent, {
        data: this.mensajes.getMensaje(error.code)
      });
    });
  }

  deleteListaCompra(id: string): Promise<any>{
    return this.firestore.collection(this.nombreColeccionItem).doc(id).delete().then(() => {
      return this.firestore.collection(this.nombreColeccion).doc(id).delete().then(()=>{
        this.dialog
        .open(DialogComponent, {
          data: this.mensajes.getMensaje("lista/delete-lista")
        });
      }).catch((error) => {
        this.dialog
        .open(DialogComponent, {
          data: this.mensajes.getMensaje(error.code)
        });
      });
    }).catch((error) => {
      this.dialog
      .open(DialogComponent, {
        data: this.mensajes.getMensaje(error.code)
      });
    });
  }

  getListaCompra(): Observable<any>{
    return this.firestore.collection(this.nombreColeccion).snapshotChanges();
  }

}
