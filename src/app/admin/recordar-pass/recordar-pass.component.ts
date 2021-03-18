import { Component, OnInit } from '@angular/core';

import { NgAuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-recordar-pass',
  templateUrl: './recordar-pass.component.html',
  styleUrls: ['./recordar-pass.component.css']
})
export class RecordarPassComponent implements OnInit {

  constructor(
    public router: Router,
    public auth: NgAuthService    
  ) { }

  ngOnInit(): void {
  }
}
