import { QrCodePipe } from './qr-code.pipe';

describe('QrCodePipe', () => {
  it('create an instance', () => {
    const pipe = new QrCodePipe();
    expect(pipe).toBeTruthy();
  });
});
