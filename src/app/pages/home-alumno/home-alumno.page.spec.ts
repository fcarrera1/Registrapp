import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeAlumnoPage } from './home-alumno.page';
import { IonicModule } from '@ionic/angular';


describe('HomeAlumnoPage', () => {
  let component: HomeAlumnoPage;
  let fixture: ComponentFixture<HomeAlumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
