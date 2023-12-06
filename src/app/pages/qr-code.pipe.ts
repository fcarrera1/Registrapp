import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qrCode'
})
export class QrCodePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
