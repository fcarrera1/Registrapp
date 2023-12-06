import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Seccion } from 'src/app/interface/seccion';
import { Asistencia } from 'src/app/interface/asistencia';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
})
export class AsistenciaAlumnoPage implements OnInit {
  currentclass = undefined;
  clasesAlumno: Seccion[] = [];
  asistenciasAlumno: Asistencia[] = [];
  porcentaje !: number;


  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userUID = user.uid;
        this.obtenerClasesAlumno(userUID);
      }
    });
  }

  ngOnInit() {
  }


  obtenerClasesAlumno(userUID: string) {
    this.firestore.collection<Seccion>('Seccion', (ref) =>
      ref.where('alumnoID', 'array-contains', userUID)
    )
      .valueChanges()
      .subscribe((clases: Seccion[]) => {
        this.clasesAlumno = clases;
      });
  }



  volver() {
    this.navCtrl.navigateForward("home-alumno");
  }

  obtenerAsistencia(seccionID: string, alumnoID: string) {
    this.firestore
      .collection<Asistencia>('Asistencia', (ref) =>
        ref.where('seccionID', '==', seccionID).where('alumnoID', '==', alumnoID)
      )
      .valueChanges()
      .subscribe((asistencias: Asistencia[]) => {
        this.asistenciasAlumno = asistencias;

        const estadosAsistencia: string[] = [];

      // Recorre las asistencias y agrega los estados al arreglo.
      let presenteCount = 0;

      // Recorre las asistencias y cuenta el número de veces que el estado es "presente".
      asistencias.forEach((asistencia) => {
        if (asistencia.estado === 'presente') {
          presenteCount++;
        }
      });

      // Calcular el porcentaje de asistencia.
      const totalClases = asistencias.length;
      const porcentajeAsistencia = (presenteCount / totalClases) * 100;


      // Guarda el porcentaje de asistencia en la variable porcentaje.
      this.porcentaje = Math.round(porcentajeAsistencia);
    });
  }

  toggleCard(seccion: Seccion) {
    seccion.isExpanded = !seccion.isExpanded;

    // Aquí, cuando se expande una sección, obtén las asistencias del alumno para esa sección.
    if (seccion.isExpanded) {
      this.afAuth.currentUser.then((user) => {
        if (user) {
          this.obtenerAsistencia(seccion.idurl, user.uid);
        }
      });
    }

    // Restablece el estado isExpanded para otras secciones.
    this.clasesAlumno.forEach((item) => {
      if (item !== seccion) {
        item.isExpanded = false;
      }
    });
  }
  
}
