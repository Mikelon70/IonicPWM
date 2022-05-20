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

  validation_messages = {
    nombre: [
      { type: 'required', message: 'Debe introducir un nombre.' },
      { type: 'minlength', message: 'Tu nombre debe tener un mínimo de 3 caracteres.' }
    ],
    apellido: [
      { type: 'required', message: 'Debe introducir un apellido.' },
      { type: 'minlength', message: 'Tu apellido debe tener un mínimo de 3 caracteres.' }
    ],
    email: [
      { type: 'required', message: 'Debe introducir un email.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Debe introducir una contraseña.' },
      { type: 'minlength', message: 'Tu contraseña debe contener mínimo 5 caracteres.' }
    ]
  };

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
        this.navCtrl.navigateForward('/perfil');
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      })
  }
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
