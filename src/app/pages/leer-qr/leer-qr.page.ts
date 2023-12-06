import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HomeAlumnoPage } from '../home-alumno/home-alumno.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from './../../services/dialog.service';
import { LeerQrModalComponent } from './leer-qr-modal.component';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

import { ToastController } from '@ionic/angular';
import { QRCodeData } from 'src/app/interface/qrcode-data';
@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });

  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  constructor(
    private navCtrl: NavController,
    private toast: ToastController,
    private readonly ngZone: NgZone,
    private readonly dialogService: DialogService,
  ) { }


  public ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          this.ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        }
      );
    });
  }


  public async scan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.scan({
      formats,
    });

    this.barcodes = barcodes;
  }

  async ionViewDidEnter() {
    this.barcodes = [];
    await this.scan().then(() => { 
      if(this.barcodes.length > 0){
        this.guardarClaseQR().then(() => {
          this.navCtrl.navigateForward(['tabs/home']);
        });

      }});
  }
  async guardarClaseQR(){
    let CodigoQRObjeto: QRCodeData = JSON.parse(this.barcodes[0].rawValue) as QRCodeData;

  }

  public async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }
  
  volver() {
    this.navCtrl.navigateForward("home-alumno");
  }

}

