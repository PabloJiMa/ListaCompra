import { Component, OnInit } from '@angular/core';

import { NgAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    public auth: NgAuthService
    ) { }

  ngOnInit(): void {
  }
  

}
