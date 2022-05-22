import { Component, OnInit } from '@angular/core';
import {GradoService} from '../services/grado.service';
import {Observable} from 'rxjs';
import {Grado} from '../models/grado.model';
import {SqliteCRUDService} from "../services/sqlite-crud.service";

@Component({
  selector: 'app-grados',
  templateUrl: './grados.page.html',
  styleUrls: ['./grados.page.scss'],
})
export class GradosPage implements OnInit{
  public grados: Grado[];
  private favoritos;

  constructor(private gradosService: GradoService) {}

  ngOnInit() {
    this.gradosService.getGradosList().subscribe(
      (grad) => {
        this.grados = grad;
      }
    );
  }
}
