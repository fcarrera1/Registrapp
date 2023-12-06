import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomeAlumnoPage } from '../home-alumno/home-alumno.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Seccion } from 'src/app/interface/seccion';


@Component({
  selector: 'app-curso-profesor',
  templateUrl: './curso-profesor.page.html',
  styleUrls: ['./curso-profesor.page.scss'],
})
export class CursoProfesorPage implements OnInit {
  clasesProfesor : Seccion [] = [];
  seccionid !: string;

  constructor(
    private navCtrl : NavController,
    private afAuth : AngularFireAuth,
    private firestore : AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user){
        const userUID = user.uid;
        this.obtenerClasesProfesor(userUID);
      }
    })
  }

  ngOnInit() {
  }
  obtenerClasesProfesor(userUID: string){
    this.firestore.collection<Seccion>('Seccion', (ref) =>
      ref.where('profesorID',"==",userUID)
    )
    .valueChanges()
    .subscribe((clases:Seccion[]) =>{
      this.clasesProfesor = clases;
    })
  }
  volver(){
    this.navCtrl.navigateForward("home-profesor");
  }



  toggleCard(seccion: Seccion) {
    seccion.isExpanded = !seccion.isExpanded;

    this.clasesProfesor.forEach((item) => {
      if (item !== seccion) {
        item.isExpanded = false;
      }
    });
  }

  AsisteciaP(id: string) {

    this.navCtrl.navigateForward(`/asistencia-profesor/${id}`);
  }

}
