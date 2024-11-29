import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Injectable({
  providedIn: 'root'
})
export class QrService {

  scan : boolean = false
  scanResult : any = ""
  flashOn : boolean = false

  constructor() { }
  async CheckPermission() {
    try
    {
      const status = await BarcodeScanner.checkPermission({force:true}); 
      if(status.granted) {
        return true;
      }

      return false;

    }
    catch(e)
    {
      return undefined;
    }
  }

  
  async StartScan() {
    if(!this.scan) {
      this.scan = true;
      try 
      {
        const permission = await this.CheckPermission();
        if(!permission) {
          alert("No hay permisos de camara. Activelos manualmente en información de la aplicación")
          this.scan = false
          this.scanResult = "Error. No hay Permisos"
        }else {
          await BarcodeScanner.hideBackground(); 
          document.querySelector('body')?.classList.add('scanner-active');
          const result = await BarcodeScanner.startScan();
          console.log("Resultado del escaneo: ", result) 
          BarcodeScanner.showBackground(); 
          document.querySelector('body')?.classList.remove('scanner-active');
          this.scan = false;
          if(result?.hasContent) { 
            this.scanResult = result.content;
          }
        }
      }
      catch(e)
      {
          console.log(e);
      }
    } else {
      this.StopScan();
    }
  }

 
  StopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.scan = false;
    this.scanResult = ""
  }

  
  flash(){
    if(!this.flashOn){
      BarcodeScanner.enableTorch() 
      this.flashOn = true
    } else {
      BarcodeScanner.disableTorch() 
      this.flashOn = false
    }
  }


}
