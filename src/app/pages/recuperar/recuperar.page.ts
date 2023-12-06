import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  
  constructor(
    private navCtrl : NavController
  ) { }

  ngOnInit() {
  }

  isAlertOpen = false;
  public alertButtons1 = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
  volver(){
    this.navCtrl.navigateForward("home");
  }
}


