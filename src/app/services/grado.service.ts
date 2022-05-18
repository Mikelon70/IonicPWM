import {Grado} from '../models/grado.model';
import { Injectable } from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GradoService {

  /*gradosCollection;
  constructor(private firestore: Firestore) {
    const gradosCollection = collection(this.firestore, 'grados');
  }*/

  constructor(public firestore: AngularFirestore) {}

  getGradosList(): Observable<Grado[]> {
    return this.firestore.collection<Grado>(`grados`).valueChanges();
  }

  getGradoDetail(gradoId: string): Observable<Grado> {
    return this.firestore.collection('songList').doc<Grado>(gradoId).valueChanges();
  }



  /*
  getGrados(): Observable<Grado[]> {
    return collectionData(this.gradosCollection, {idField: 'id'})
      .pipe(
        map(grados => grados as Grado[])
      );
  }
  */


  /*getGradoById(id: string): Observable<Grado> {
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
  }*/

}
