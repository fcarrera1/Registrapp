import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoProfesorPageRoutingModule } from './curso-profesor-routing.module';

import { CursoProfesorPage } from './curso-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoProfesorPageRoutingModule
  ],
  declarations: [CursoProfesorPage]
})
export class CursoProfesorPageModule {}
