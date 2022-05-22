import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  name_form: FormGroup;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  subname_form: FormGroup;
  errorMessage = '';
  successMessage = '';
  userEmail: string;
  user: User;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    name: [
      {type: 'required', message: 'Debe introducir un nombre.'}
    ]
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages2 = {
    subname: [
      {type: 'required', message: 'Debe introducir un apellido.'}
    ]
  };

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.authService.getUserDetail(this.userEmail).subscribe(user => {
          this.user = user;
        });
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });
    this.name_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.subname_form = this.formBuilder.group({
      subname: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  changeName(value) {
    this.authService.setName(this.user.email,value);
  }

  changeSubname(value){
    this.authService.setSubname(this.user.email,value);
  }


  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      });
  }
}

