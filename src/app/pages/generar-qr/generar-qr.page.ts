import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from 'src/app/interface/seccion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  seccionID!: string;
  qrData!: string;
  profesorID!: string;
  fecha!: string;
  hora!: string;

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.seccionID = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const alumnoID = user.uid;

        this.firestore
          .collection<Seccion>('Seccion')
          .doc(this.seccionID)
          .valueChanges()
          .subscribe((seccion: any) => {
            if (seccion) {
              this.profesorID = seccion.profesorID;

              const fecha = new Date();
              this.fecha = fecha.toLocaleDateString();

              const hora = fecha.toLocaleTimeString();
              const partesHora = hora.split(':');
              this.hora = partesHora.slice(0, 2).join(':');

              this.qrData =
                '{' +
                'id seccion: ' + this.seccionID + ',' +
                ' id profesor: ' + this.profesorID + ',' +
                ' fecha: ' + this.fecha + ',' +
                ' hora: ' + this.hora + ',' +
                ' id alumno: ' + alumnoID +
                '}';
            }
          });
      }
    });
  }

  volver(id: string) {
    this.navCtrl.navigateForward(`/asistencia-profesor/${id}`);
  }
}
