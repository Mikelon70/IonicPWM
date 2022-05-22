import { Component, OnInit } from '@angular/core';
import {SqliteCRUDService} from '../services/sqlite-crud.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos;
  constructor(private sqliteService: SqliteCRUDService) { }

  ngOnInit() {
    this.getAll();
  }

  delete(grado){
    this.sqliteService.deleteGrado(grado);
    this.getAll();
  }

  getAll(){
    this.sqliteService.getAllGrados().then((res) => {
      this.favoritos=res;
    });
  }

}
