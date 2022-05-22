import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteCRUDService {


  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly db_name: string = 'remotestack.db';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly db_table: string = 'gradosTable';

  private dbInstance: SQLiteObject;

  // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/naming-convention
  GRADOS: Array <any>;

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.databaseConn();
  }

// Create SQLite database
  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({name: this.db_name, location: 'default'})
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`
            CREATE TABLE IF NOT EXISTS ${this.db_table} (
              grado_id INTEGER PRIMARY KEY,
              name varchar(255))`, [] )
            .then((res) => { alert(JSON.stringify(res)); } )
            .catch((error) => alert(JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

// Create new degree
  public addGrado(i, n) {
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (grado_id, name) VALUES ('${i}','${n}')`, [])
      .then(() => {
        alert('Success');
        this.getAllGrados();
      }, (e) => { alert(JSON.stringify(e.err)); });
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
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }

// Get degree by id
  getGrado(id): Promise<any> {
    return this.dbInstance.executeSql(`
      SELECT * FROM ${this.db_table} WHERE grado_id = ?`, [id])
      .then((res) => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
          grado_id: res.rows.item(0).grado_id,
          name: res.rows.item(0).name,
        }));
  }

// Delete seleted degree
  deleteGrado(grado) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE grado_id = ${grado}`, [])
      .then(() => {
        alert('grado deleted!');
        this.getAllGrados();
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }
}
