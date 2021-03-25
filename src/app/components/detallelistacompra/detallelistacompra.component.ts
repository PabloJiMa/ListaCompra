import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ItemListaCompraService } from 'src/app/services/item-lista-compra.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detallelistacompra',
  templateUrl: './detallelistacompra.component.html',
  styleUrls: ['./detallelistacompra.component.css']
})
export class DetalleListaCompraComponent implements OnInit {
  listaItems$: Observable<any> | undefined;
  idLista: string | undefined;
  nuevoItemListaCompra: FormGroup;
  listaItems: any[] = [];
  columnas: string[] = ['editar', 'eliminar', 'fecha', 'descripcion'];
  listaItemsTabla: MatTableDataSource<any> = new MatTableDataSource(this.listaItems);

  constructor(private route: ActivatedRoute,
      private _itemListaCompraService: ItemListaCompraService,
      private fb: FormBuilder,
      private router: Router
    ) {
      this.nuevoItemListaCompra = fb.group({        
        descripcionNuevoItemLista: new FormControl(),
        descripcionAdicNuevoItemLista: new FormControl(),
      });
     }

  ngOnInit() {
    this.listaItems$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.idLista = params.get('id')!;
        return this._itemListaCompraService.getItemsListaCompra(this.idLista);
      })
    );
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
    console.log(nuevoItemLista);
    this._itemListaCompraService.addItemListaCompra(nuevoItemLista, this.idLista!).then(() => {
      this.nuevoItemListaCompra.reset();
    });
  }

  eliminarItemLista(id: string){
    this._itemListaCompraService.deleteItemListaCompra(id, this.idLista!);
  }

}
