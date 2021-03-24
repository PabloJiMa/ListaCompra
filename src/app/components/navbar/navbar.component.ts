import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { NgAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  tituloApp: string = "";
  
  constructor(
    public router: Router,
    public auth: NgAuthService       
  ) {    
   }

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn;
    this.auth.isLoggedIn.subscribe(data=>{        
        this.tituloApp = data ? "Lista Compra": "Bienvenido";
    });
  }

  detalleCuenta(){
    this.router.navigate(['perfil']);
  }

  navegarHome(){
    this.router.navigate(['entradas']);
  }
}
