import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Grado} from '../models/grado.model';
import {Observable, Subject} from 'rxjs';
import {collection, collectionData, docSnapshots} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  constructor(private firestore: AngularFirestore) { }


  getGrados(): Observable<Grado[]> {
    //return this.firestore.collection<Grado>('grados').snapshotChanges();

    // @ts-ignore
    const gradosCollection = collection(this.firestore, 'grados');
    return collectionData(gradosCollection, {idField: 'id'})
      .pipe(
        map(grados => grados as Grado[])
      );
  }


  getGradoById(id: string): Observable<Grado> {
    // @ts-ignore
    const document = doc(this.firestore, 'grados/${id}');
    return docSnapshots(document)
      .pipe(
        map(doc => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const id = doc.id;
          const data = doc.data();
          return {id, ...data} as Grado;
          }
        )
      );
  }

}
