import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userEmail: string;
  user: User;

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService) { }

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

