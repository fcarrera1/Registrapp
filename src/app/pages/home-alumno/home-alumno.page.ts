import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Alumno } from 'src/app/interface/alumno';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {
  alumno : Alumno | null = null;
  fotoPerfilUrl: string | null = null;
  handlerMessage = '';
  roleMessage = '';
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.navCtrl.navigateForward("home-alumno");
      },
    },
    {
      text: 'OK',
      role: 'Aceptar',
      handler: () => {
        this.navCtrl.navigateForward("home"); 
      },
    },
  ];

  constructor(
    private navCtrl : NavController,
    private firestore : AngularFirestore,
    private afAuth : AngularFireAuth,
  ) {
    afAuth.authState.subscribe((user) => {
      if (user) {
        const userUid = user.uid;
        this.firestore.collection<Alumno>('Alumno').doc(userUid).valueChanges().subscribe((data) => {
          if (data) {
            this.alumno = data;
            console.log(this.alumno)
            this.fotoPerfilUrl = `assets/img/${this.alumno.foto}`;
          }
        });
      }
    });
  }


  ngOnInit() {
  }
  isAlertOpen = false;
  public alertButtons1 = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  leerQr(){
    this.navCtrl.navigateForward("leer-qr");
  }

  AsistenciaA(){
    this.navCtrl.navigateForward("asistencia-alumno");
  }

  Salida(){
    this.navCtrl.navigateForward("home");
  }
}
