import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioFirebaseService } from 'src/app/servivces/servicio-firebase.service';
import { Alumno } from 'src/app/interface/alumno';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Profesor } from 'src/app/interface/profesor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  correoElectronico: string = '';
  contrasena: string = '';
  isAlertOpen = false;
  mostrarSpinner = false;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private servFire: ServicioFirebaseService,
    private afAuth: AngularFireAuth
  ) { }

  loginAlumno() {
    this.navCtrl.navigateForward("home-alumno");
  }

  loginProfesor() {
    this.navCtrl.navigateForward("home-profesor");
  }

  async iniciarSesion() {
    try {
      const { correoElectronico, contrasena } = this; // Obtiene el correo y la contraseña del formulario
      const userCredential = await this.afAuth.signInWithEmailAndPassword(correoElectronico, contrasena);
      // El usuario se autenticó correctamente
      this.mostrarSpinner = true;
      if (correoElectronico.endsWith('@alumno.cl')) {
        setTimeout(() => {
          this.loginAlumno();
          this.mostrarSpinner = false;
        }, 2000);
      } else if (correoElectronico.endsWith('@profesor.cl')) {
        setTimeout(() => {
          this.loginProfesor();
          this.mostrarSpinner = false;
        }, 2000);
      } else {
        this.mostrarAlertaError();
      }

    } catch (error) {
      // Maneja errores, por ejemplo, muestra un mensaje de error al usuario
      this.mostrarAlertaError();
    }
  }



  mostrarAlertaError() {
    this.isAlertOpen = true;
    this.mostrarSpinner = false;
  }


  alertButtons = [
    {
      text: 'OK',
      handler: () => {
        this.isAlertOpen = false;
      },
    },
  ];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }



  recuperar() {
    this.navCtrl.navigateForward("recuperar");
  }
  ////////////////////////////////////////////////////////////////////////
  recuperarAlumno() {
    this.servFire.getAlumnos();
  }

  grabarAlumno() {
    let alumno: Alumno = {
      id: 'hExDVi3TWtQDUaoRPbEr7baFbWs2',
      rut: '24.567.890-6',
      pnombre: 'Pedro',
      snombre: 'Luis',
      apaterno: 'Sánchez',
      amaterno: 'Fernández',
      correo: "p.sanchez@alumno.cl",
      carrera: 'Ingeniería en informática',
      foto: 'ps.jpg',
      genero: 'F',
      porcentaje: 0,
      idal : '',
    };
    this.servFire.grabarAlumno(alumno).then(() => {
      console.log("Grabó")
    }).catch((e) => {
      console.log(e);
    })
  }

  eliminarAlumno() {
    let id = 'Waua26nld8YkcQnjBFn4';
    this.servFire.eliminarAlumno(id).then(() => {
      console.log("Eliminó");
    }).catch((e) => {
      console.log(e);
    })
  }


  recuperarProfesor() {
    this.servFire.getProfesor();
  }

  grabarProfesor() {
    let profesor: Profesor = {
      rut: "24.785.612-k",
      pnombre: "Isabella",
      snombre: "Ana",
      apaterno: "González",
      amaterno: "Soto",
      correo: "i.gonzalez@profesor.cl",
      contrasenia: "i.gonzalez",
      foto: "ig.jpg",
      genero: "M"
    };
    this.servFire.grabarProfesor(profesor).then(() => {
      console.log("Grabó")
    }).catch((e) => {
      console.log(e);
    })
  }

  eliminarProfesor() {
    let id = 'Waua26nld8YkcQnjBFn4';
    this.servFire.eliminarProfesor(id).then(() => {
      console.log("Eliminó");
    }).catch((e) => {
      console.log(e);
    })
  }
}
