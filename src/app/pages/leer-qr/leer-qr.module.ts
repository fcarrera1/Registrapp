import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeerQrPageRoutingModule } from './leer-qr-routing.module';
import { LeerQrModalComponent } from './leer-qr-modal.component'
import { LeerQrPage } from './leer-qr.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeerQrPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [LeerQrPage, LeerQrModalComponent]
})
export class LeerQrPageModule { }
