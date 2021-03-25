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
export class ItemListaCompraService {
  
  private nombreColeccion: string = "ListaCompra";
  private nombreColeccionItem: string = "ItemListaCompra";
  constructor(private firestore: AngularFirestore,
      public router: Router,      
      public dialog: MatDialog,
      public mensajes: ControlMensajesService  
    
    ) { }

  addItemListaCompra(itemListaCompra: any, id: string){
    return this.firestore.collection(this.nombreColeccion + '/' + id + '/' + this.nombreColeccionItem).add(itemListaCompra).then(()=>{
      this.dialog
      .open(DialogComponent, {
        data: this.mensajes.getMensaje("lista/add-item-lista")
      });
    }).catch((error) => {
      this.dialog
      .open(DialogComponent, {
        data: this.mensajes.getMensaje(error.code)
      });
    });
  }

  deleteItemListaCompra(id: string, id_lista: string): Promise<any>{
    return this.firestore.collection(this.nombreColeccion + '/' + id_lista + '/' + this.nombreColeccionItem).doc(id).delete().then(() => {
      
        this.dialog
        .open(DialogComponent, {
          data: this.mensajes.getMensaje("lista/delete-item-lista")
        });
      
    }).catch((error) => {
      this.dialog
      .open(DialogComponent, {
        data: this.mensajes.getMensaje(error.code)
      });
    });
  }

  getItemsListaCompra(id: string): Observable<any>{
    return this.firestore.collection(this.nombreColeccion + '/' + id + '/' + this.nombreColeccionItem).snapshotChanges();
  }

}
