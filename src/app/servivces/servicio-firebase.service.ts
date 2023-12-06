import { Injectable } from '@angular/core';
import { Alumno } from '../interface/alumno';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Profesor } from '../interface/profesor';
import { Asistencia } from '../interface/asistencia';

@Injectable({
  providedIn: 'root'
})
export class ServicioFirebaseService {

  private alumnoColeccion : AngularFirestoreCollection<Alumno>;
  private profesorColeccion : AngularFirestoreCollection<Profesor>;

  constructor(private afs: AngularFirestore) { 
    this.alumnoColeccion = afs.collection<Alumno>('Alumno');
    this.profesorColeccion = afs.collection<Profesor>('Profesor');
  }

  getAlumnos(){
    this.afs.collection('Alumno').valueChanges().subscribe(
      (res)=>{
        console.log("ok");
        console.log(res);
      }
    )
  }

  grabarAlumno(alumno : Alumno){
    return this.alumnoColeccion.add(alumno);
  }

  eliminarAlumno(id : string){
    return this.alumnoColeccion.doc(id).delete();
  }
///////////////////////////////////////////////////////////////////////////////////
  getProfesor(){
    this.afs.collection('Profesor').valueChanges().subscribe(
      (res)=>{
        console.log("ok");
        console.log(res);
      }
    )
  }

  grabarProfesor(profesor : Profesor){
    return this.profesorColeccion.add(profesor);
  }

  eliminarProfesor(id : string){
    return this.alumnoColeccion.doc(id).delete();
  }
}


