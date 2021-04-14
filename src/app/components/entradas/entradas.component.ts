import { Component, OnInit } from '@angular/core';
import { ListaCompraService } from 'src/app/services/lista-compra.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {  
  nuevaListaCompra: FormGroup;
  lista: any[] = [];
  columnas: string[] = ['editar', 'eliminar', 'fecha', 'descripcion'];
  listaTabla: MatTableDataSource<any> = new MatTableDataSource(this.lista);

  constructor(private _listaCompraService: ListaCompraService,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.nuevaListaCompra = fb.group({
        fechaNuevaLista: new FormControl(),
        descripcionNuevaLista: new FormControl()
      });
      
   }

  ngOnInit(): void {
    this.getListaCompra();  
    localStorage.setItem('id-lista', '');  
  }

  getListaCompra(){
    this._listaCompraService.getListaCompra().subscribe(
      data =>{
          this.lista = [];
          console.log("🚀 ~ file: entradas.component.ts ~ line 42 ~ EntradasComponent ~ getListaCompra ~ this.lista = [];", data);
          data.forEach((element: any) => {            
            this.lista.push({            
              id: element.payload.doc.id,
              descripcion: element.payload.doc.data()["descripcion"],
              fecha: element.payload.doc.data()["fecha"] === null ? "" : new Date(element.payload.doc.data()["fecha"].toDate()),
              fechaalta: element.payload.doc.data()["fechaalta"] === null ? "" : new Date(element.payload.doc.data()["fechaalta"].toDate()),
              fechamodificacion: element.payload.doc.data()["fechamodificacion"] === null ? "" : new Date(element.payload.doc.data()["fechamodificacion"].toDate()),
              usuarioalta: element.payload.doc.data()["usuarioalta"],
              usuariomodificacion: element.payload.doc.data()["usuariomodificacion"]
            })
            
          });
          //this.lista.forEach((element: any) => {            
          //
          //  console.log("🚀 ~ file: entradas.component.ts ~ line 43 ~ EntradasComponent ~ this.lista.forEach ~ element", element);
          //  
          //});
          this.listaTabla = new MatTableDataSource(this.lista);
      }      
    )
    //console.log("🚀 ~ file: entradas.component.ts ~ line 28 ~ EntradasComponent ~ data.forEach ~ lista", this.lista);
  }

  filtrarLista(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaTabla.filter = filterValue.trim().toLowerCase();
  }

  agregarListaCompra(){    
    let fechaActual = new Date();
    let usr: string | null = localStorage.getItem('user');    
    let usuario: any;
    if(usr !== null){
      usuario = JSON.parse(usr);
    }
    let nuevaLista = {
      descripcion: this.nuevaListaCompra.value.descripcionNuevaLista,
      fecha: this.nuevaListaCompra.value.fechaNuevaLista,
      fechaalta: fechaActual,
      fechamodificacion: fechaActual,
      usuarioalta: usuario.uid,
      usuariomodificacion: ""
    };
    console.log(nuevaLista);
    this._listaCompraService.addListaCompra(nuevaLista).then(() => {
      this.nuevaListaCompra.reset();
    });
  }

  editarLista(id_lista: string){    
    this.router.navigate(['detallelistacompra'], {queryParams: { id: id_lista }});
    //console.log("🚀 ~ file: entradas.component.ts ~ line 93 ~ EntradasComponent ~ editarLista ~ ", id_lista );
    
  }

  eliminarLista(id: string){
    //console.log("🚀 ~ file: entradas.component.ts ~ line 53 ~ EntradasComponent ~ eliminarLista ~ id", id)
    this._listaCompraService.deleteListaCompra(id);
  }
}


