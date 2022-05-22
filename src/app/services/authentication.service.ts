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
  setName(_email: any, _name: string) {
    this.firestore.collection('users').doc(_email).set({name:_name}).then(r => {});
  }

  setSubname(_email: any, _subname: string) {
    this.firestore.collection('users').doc(_email).set({subname:_subname}).then(r => {});
  }

  addNewUser(_dni: string, _name: string, _subname: string, _email: string) {
    this.firestore.collection('users').doc(_email)
      // eslint-disable-next-line max-len
      .set({dni: _dni, name: _name, subname: _subname, img:'https://firebasestorage.googleapis.com/v0/b/pruebafirebase-3d1a3.appspot.com/o/fotoAlumno.png?alt=media&token=620650c8-0457-4214-9521-ed73c62f9d6a'}).then (r =>{});
  }

  getUserDetail(email: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(email).valueChanges();
  }

}
