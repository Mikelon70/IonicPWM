import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteCRUDService {


  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly db_name: string = 'remotestack.db';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly db_table: string = 'gradosTable';

  // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/naming-convention
  GRADOS: Array <any>;

  private dbInstance: SQLiteObject;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,

  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({name: this.db_name, location: 'default'})
        .then((sqLite: SQLiteObject) => {
          sqLite.executeSql(`
            CREATE TABLE IF NOT EXISTS ${this.db_table} (
              id  INTEGER PRIMARY KEY AUTOINCREMENT,
              grado_id TEXT,
              name TEXT)`, [] )
            .then((res) => { console.log(JSON.stringify(res)); } )
            .catch((error) => alert(JSON.stringify(error)));
          this.dbInstance = sqLite;
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }


  public addGrado(grado){
    console.log('hola');
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table}(grado_id, name) VALUES ('${grado.id}','${grado.name}')`,[])
      .then(() => {
        alert('Success');
        console.log('hola desde dentro');
      }, (e) => { alert('error en crear grado: '+JSON.stringify(e)); });
    console.log('adios');

  }

  getAllGrados() {
    return this.dbInstance.executeSql(`
      SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.GRADOS = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.GRADOS.push(res.rows.item(i));
        }
        return this.GRADOS;
      }else{
        console.log('vacio');
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }

// Get user by id
  getGrado(id): Promise<any> {
    return this.dbInstance.executeSql(`
      SELECT * FROM ${this.db_table} WHERE grado_id = ?`, [id])
      .then((res) => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
          grado_id: res.rows.item(0).grado_id,
          name: res.rows.item(0).name,
        }));
  }

// Delete seleted user
  deleteGrado(grado) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE grado_id = '${grado}'`, [])
      .then(() => {
        alert('grado deleted!');
        this.getAllGrados();
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }
}
