import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoProfesorPage } from './curso-profesor.page';

describe('CursoProfesorPage', () => {
  let component: CursoProfesorPage;
  let fixture: ComponentFixture<CursoProfesorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CursoProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
