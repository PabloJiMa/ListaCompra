              
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ItemListaCompraService } from 'src/app/services/item-lista-compra.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detallelistacompra',
  templateUrl: './detallelistacompra.component.html',
  styleUrls: ['./detallelistacompra.component.css']
})
export class DetalleListaCompraComponent implements OnInit {  
  idLista: string;
  nuevoItemListaCompra: FormGroup;
  listaItems: any[] = [];
  columnas: string[] = ['eliminar', 'descripcion', 'descripcionadicional'];
  listaItemsTabla: MatTableDataSource<any> = new MatTableDataSource(this.listaItems);

  constructor(private route: ActivatedRoute,
      private _itemListaCompraService: ItemListaCompraService,
      private fb: FormBuilder,
      private router: Router
    ) {
      this.idLista = "";
      this.nuevoItemListaCompra = fb.group({        
        descripcionNuevoItemLista: new FormControl(),
        descripcionAdicNuevoItemLista: new FormControl(),
      });
     }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => { 
      let id = params.get('id');
      //console.log("🚀 ~ file: detallelistacompra.component.ts ~ line 42", params.get('id'));
      this.idLista = id !== null ? id! : "";  
      console.log("🚀 ~ file: detallelistacompra.component.ts ~ line 44", this.idLista);
      //this.listaItems$ = 
      this._itemListaCompraService.getItemsListaCompra(this.idLista).subscribe(
        data =>{
            this.listaItems = [];            
            data.forEach((element: any) => {            
              this.listaItems.push({            
                id: element.payload.doc.id,
                descripcion: element.payload.doc.data()["descripcion"],
                descripcionadicional: element.payload.doc.data()["descripcionadicional"],                
                fechaalta: element.payload.doc.data()["fechaalta"] === null ? "" : new Date(element.payload.doc.data()["fechaalta"].toDate()),
                fechamodificacion: element.payload.doc.data()["fechamodificacion"] === null ? "" : new Date(element.payload.doc.data()["fechamodificacion"].toDate()),
                usuarioalta: element.payload.doc.data()["usuarioalta"],
                usuariomodificacion: element.payload.doc.data()["usuariomodificacion"]
              })
              
            });
            //this.listaItemsTabla.forEach((element: any) => {            
            //
            //  console.log("🚀 ~ file: detallelistacompra.component.ts ~ line 62 ~ EntradasComponent ~ this.listaItemsTabla.forEach ~ element", element);
            //  
            //});
            this.listaItemsTabla = new MatTableDataSource(this.listaItems);
        }      
      );
      console.log("🚀 ~ file: detallelistacompra.component.ts ~ line 68", this.listaItems);
    });
  }

  filtrarLista(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaItemsTabla.filter = filterValue.trim().toLowerCase();
  }

  agregarItemListaCompra(){    
    let fechaActual = new Date();
    let usr: string | null = localStorage.getItem('user');    
    let usuario: any;
    if(usr !== null){
      usuario = JSON.parse(usr);
    }
    let nuevoItemLista = {      
      descripcion: this.nuevoItemListaCompra.value.descripcionNuevoItemLista,      
      descripcionadicional: this.nuevoItemListaCompra.value.descripcionAdicNuevoItemLista,   
      fechaalta: fechaActual,
      fechamodificacion: fechaActual,
      usuarioalta: usuario.uid,
      usuariomodificacion: ""
    };
    console.log("🚀 ~ file: detallelistacompra.component.ts ~ line 71", this.idLista);
    this._itemListaCompraService.addItemListaCompra(nuevoItemLista, this.idLista!).then(() => {
    
      this.nuevoItemListaCompra.reset();
    });
  }

  eliminarItemLista(id: string){
    this._itemListaCompraService.deleteItemListaCompra(id, this.idLista!);
  }

  volver(){
    this.router.navigate(['entradas']);
  }
}
