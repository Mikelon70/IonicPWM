import { Component, OnInit } from '@angular/core';
import {GradoService} from '../services/grado.service';
import {Observable} from 'rxjs';
import {Grado} from '../models/grado.model';
import {SqliteCRUDService} from "../services/sqlite-crud.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-grados',
  templateUrl: './grados.page.html',
  styleUrls: ['./grados.page.scss'],
})
export class GradosPage implements OnInit{
  public grados: Grado[];
  private favoritos;

  constructor(private gradosService: GradoService,
              private authService: AuthenticationService,
              private router: Router) {}

  ngOnInit() {
    this.gradosService.getGradosList().subscribe(
      (grad) => {
        this.grados = grad;
      }
    );
  }

  goToFavoritos(){
      this.router.navigate(['/favotitos']);
  }
}
