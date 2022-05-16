import { Component, OnInit } from '@angular/core';
import {GradoService} from '../services/grado.service';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.page.html',
  styleUrls: ['./grados.page.scss'],
})
export class GradosPage implements OnInit {

  constructor(private gradosService: GradoService,
              ) { }

  ngOnInit() {
  }

}
