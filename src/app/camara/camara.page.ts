import { Component } from '@angular/core';
import { QrService } from '../servicios/qr.service';
import { SupabaseService } from '../supabase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {
  
  objetoJson = false
  JsonData : any

  constructor( private supabaseService: SupabaseService,
    private alertController: AlertController,public qr : QrService) {}

  
    async Scaneo() {
      this.objetoJson = false;
      this.JsonData = undefined;
    
      await this.qr.StartScan();
    
      try {
        const parseResult = JSON.parse(this.qr.scanResult);
        console.log(parseResult);
    
        if (parseResult) {
          if (parseResult.profesor && parseResult.asignatura) {
            const alumno = localStorage.getItem('username');
            const fecha = new Date().toISOString(); 
    
            const { error } = await this.supabaseService.insertAsistencia({
              profesor: parseResult.profesor,
              asignatura: parseResult.asignatura,
              fecha,
              alumno,
            });
    
            if (error) {
              throw error; 
            }
    
            this.objetoJson = true;
            this.JsonData = {
              profesor: parseResult.profesor,
              asignatura: parseResult.asignatura,
              fecha,
              alumno,
            };
    
            console.log('Asistencia registrada:', this.JsonData);
    
           
            const alert = await this.alertController.create({
              header: 'Éxito',
              message: 'Asistencia registrada correctamente.',
              buttons: ['OK'],
            });
            await alert.present();
          } else {
            throw new Error('El QR no contiene los datos requeridos.');
          }
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
    
        console.log(e);
    
        const alert = await this.alertController.create({
          header: 'Error',
          message: `Hubo un problema al procesar el QR: ${errorMessage}`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
    
  

  
  Flashlight(){
    this.qr.flash()
  }

}


