import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private alumnoID: string = '';

  setAlumnoID(id: string) {
    this.alumnoID = id;
  }

  getAlumnoID() {
    return this.alumnoID;
  }
}