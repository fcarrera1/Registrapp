import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Profesor } from 'src/app/interface/profesor';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {
  profesor : Profesor | null = null;
  handlerMessage = '';
  roleMessage = '';

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.navCtrl.navigateForward("home-profesor");
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.navCtrl.navigateForward("home"); 
      },
    },
  ];

  constructor(
    private navCtrl : NavController,
    private firestore : AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe((user)=>{
      if (user){
        const userUid = user.uid;
        this.firestore.collection<Profesor>('Profesor').doc(userUid).valueChanges().subscribe((data)=> {
          if (data){
            this.profesor = data;
          }
        })
      }
    })
   }

  ngOnInit() {

  }
  isAlertOpen = false;
  public alertButtons1 = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  GenerarQR(){
    this.navCtrl.navigateForward("generar-qr");
  }

  Cursos(){
    this.navCtrl.navigateForward("curso-profesor");
  }

  Salida(){
    this.navCtrl.navigateForward("home");
  }
}
