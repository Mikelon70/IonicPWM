import { Injectable, Input } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import 'firebase/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Input() user!: User;

  constructor(private afAuth: AngularFireAuth, public firestore: AngularFirestore) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res));
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res));
    });
  }

  userDetails() {
    return this.afAuth.user;
  }

  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log('LOG Out');
            resolve();
          }).catch((error) => {
          reject();
        });
      }
    });
  }
  setName(id: string, name: string){
    this.firestore.collection('users').doc(id)
      // eslint-disable-next-line max-len
      .set({name}).then (r =>{});
  }

  setDniAndName(dni: string, name: string, email: string) {
    this.firestore.collection('users').doc(email)
      // eslint-disable-next-line max-len
      .set({dni: dni, name: name}).then (r =>{});
  }

  getUserDetail(email: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(email).valueChanges();
  }

}
