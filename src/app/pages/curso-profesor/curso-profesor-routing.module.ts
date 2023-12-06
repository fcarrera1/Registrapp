import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoProfesorPage } from './curso-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: CursoProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoProfesorPageRoutingModule {}
