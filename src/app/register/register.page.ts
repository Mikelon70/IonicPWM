import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';
  dni = '';
  name = '';
  email = '';


  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    email: [
      { type: 'required', message: 'Debe introducir un email.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Debe introducir una contraseña.' },
      { type: 'minlength', message: 'Tu contraseña debe contener mínimo 5 caracteres.' }
    ],
    name: [
      {type: 'required', message: 'Debe introducir un nombre.'}
    ],
    dni: [
      {type: 'required', message: 'Debe introducir un DNI.'},
      { type: 'pattern', message: 'Enter a valid DNI.' }
    ]
  };

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dni: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{8}')
      ])),
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
        this.dni = this.validations_form.get('dni').value;
        this.email = this.validations_form.get('email').value;
        this.name = this.validations_form.get('name').value;
        this.authService.setDniAndName(this.dni, this.name, this.email);
        this.navCtrl.navigateForward('/perfil');
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
