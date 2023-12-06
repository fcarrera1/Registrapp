import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeProfesorPage } from './home-profesor.page';
import {
  Barcode,
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';

import { ToastController } from '@ionic/angular';


const routes: Routes = [
  {
    path: '',
    component: HomeProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProfesorPageRoutingModule {
  constructor(private toast: ToastController) {}
  public barcodes: Barcode[] = [];

  public async scan(): Promise<void> {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    this.barcodes = barcodes;
  }
}
