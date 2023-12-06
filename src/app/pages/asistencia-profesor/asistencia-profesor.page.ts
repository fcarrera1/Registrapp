import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Alumno } from 'src/app/interface/alumno';
import { Seccion } from 'src/app/interface/seccion';
import { Asistencia } from 'src/app/interface/asistencia';
import { AlertController } from '@ionic/angular';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asistencia-profesor',
  templateUrl: './asistencia-profesor.page.html',
  styleUrls: ['./asistencia-profesor.page.scss'],
})

export class AsistenciaProfesorPage implements OnInit {
  seccionID !: string;
  nombreSeccion !: string;
  siglas !: string;
  alumnos: Alumno[] = [];
  asistenciasAlumno: Asistencia[] = [];
  profesorID !: string;
  porcentaje: number[] = [];
  estadosSeleccionados: (string | undefined)[] = [];


  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
  ) {
    this.seccionID = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.alumnos = [];
    let x = 0;
    console.log(this.seccionID);

    this.firestore.collection<Seccion>('Seccion').doc(this.seccionID).valueChanges().subscribe((seccion: any) => {
      x++;
      this.nombreSeccion = seccion.nombre;
      this.siglas = seccion.sigla;
      console.log("carga principal:" + x + " - " + seccion.alumnoID);
      const alumnoIDs = seccion.alumnoID;

      if (x < 2) {

        alumnoIDs.forEach((alumnoID: string) => {
          console.log("carga :" + x + " - " + alumnoID);
          this.calcularPorcentajeAsistencia(this.seccionID, alumnoID);

          this.firestore.collection<Alumno>('Alumno').doc(alumnoID).valueChanges().subscribe((alumno: any) => {
            // Calcula el porcentaje de asistencia para este alumno y asígnalo a su propiedad "porcentaje".

            console.log(this.porcentaje)
            this.alumnos.push(alumno);
            console.log(alumno);
          });
        });
      }
    });

  }

  isAlertOpen = false;
  public alertButtons = ['Aceptar'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  d: number = 0;

  listar() {

    this.alumnos = [];
    let x = 0;
    console.log(this.seccionID);

    this.firestore.collection<Seccion>('Seccion').doc(this.seccionID).valueChanges().subscribe((seccion: any) => {
      x++;
      this.nombreSeccion = seccion.nombre;
      this.siglas = seccion.sigla;
      console.log("carga principal:" + x + " - " + seccion.alumnoID);

      const alumnoIDs = seccion.alumnoID;
      if (x < 2) {
        alumnoIDs.forEach((alumnoID: string) => {
          console.log("carga :" + x + " - " + alumnoID);
          this.firestore.collection<Alumno>('Alumno').doc(alumnoID).valueChanges().subscribe((alumno: any) => {
            this.alumnos.push(alumno);
            console.log(alumno)
          });
        });

      }
    });


  }

  calcularPorcentajeAsistencia(seccionID: string, alumnoID: string) {
    this.firestore
      .collection<Asistencia>('Asistencia', (ref) =>
        ref.where('seccionID', '==', seccionID).where('alumnoID', '==', alumnoID)
      )
      .valueChanges()
      .subscribe((asistencias: Asistencia[]) => {
        this.asistenciasAlumno = asistencias;

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

        // Redondear y guardar el porcentaje de asistencia en el array porcentaje.
        this.porcentaje.push(Math.round(porcentajeAsistencia));
      });
  }

  async presentarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        role: 'Aceptar',
        handler: () => {

          this.navCtrl.navigateForward("curso-profesor");
        }
      }],
    });
  
    await alert.present();
  }
  
  async guardarAsistencia(alumnoID: string, estado: string) {
    const fechaFormateada = format(new Date(), "EEEE dd 'de' MMMM", { locale: es });

    const asistencia: Asistencia = {
      alumnoID: alumnoID,
      seccionID: this.seccionID,
      estado: estado,
      fecha: fechaFormateada,
    };

    try {
      await this.firestore.collection('Asistencia').add(asistencia);
      console.log('Asistencia guardada correctamente');
    } catch (error) {
      console.error('Error al guardar la asistencia', error);
    }
  }

  async guardarAsistencias() {
    // Verifica que tanto alumnos como estadosSeleccionados tengan la misma longitud
    if (this.alumnos.length !== this.estadosSeleccionados.length) {
      console.error("La longitud de 'alumnos' y 'estadosSeleccionados' no coincide.");
      return;
    }

    // Itera sobre los alumnos y verifica el estado seleccionado
    for (let i = 0; i < this.alumnos.length; i++) {
      const alumno = this.alumnos[i];
      const estadoSeleccionado = this.estadosSeleccionados[i];

      // Asegúrate de tener un estado seleccionado y un alumno válido
      if (estadoSeleccionado !== undefined && alumno !== undefined) {
        await this.guardarAsistencia(alumno.idal, estadoSeleccionado);
      } else {
        console.error("El valor de 'alumno' o 'estadoSeleccionado' es undefined.");
      }
    }

    // Muestra la alerta después de guardar todas las asistencias
    this.setOpen(true);
  }

  volver() {
    this.navCtrl.navigateForward("curso-profesor");
  }
  generarQr(id: string) {
    this.navCtrl.navigateForward(`/generar-qr/${id}`);
  }
}
