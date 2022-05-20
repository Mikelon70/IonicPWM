import { Component, OnInit } from '@angular/core';
import {GradoService} from '../services/grado.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Grado} from '../models/grado.model';

@Component({
  selector: 'app-detalles-grados',
  templateUrl: './detalles-grados.page.html',
  styleUrls: ['./detalles-grados.page.scss'],
})
export class DetallesGradosPage implements OnInit {

  public grado: Grado;

  constructor(private gradosService: GradoService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const gradoId: string = this.route.snapshot.paramMap.get('id');
    this.gradosService.getGradoDetail(gradoId).subscribe(grado => {
          this.grado = grado;
    });
  }

}
