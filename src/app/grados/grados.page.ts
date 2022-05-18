import { Component, OnInit } from '@angular/core';
import {GradoService} from '../services/grado.service';
import {Observable} from 'rxjs';
import {Grado} from '../models/grado.model';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.page.html',
  styleUrls: ['./grados.page.scss'],
})
export class GradosPage implements OnInit{
  public grados: Grado[];

  constructor(private gradosService: GradoService) {}

  ngOnInit() {
    this.gradosService.getGradosList().subscribe(
      (grad) => {
        this.grados = grad;
      }
    );
  }
}
