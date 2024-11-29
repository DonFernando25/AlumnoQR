import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async registrar() {
    const { data, error } = await this.supabaseService.registrarUsuario(
      this.nombre,
      this.correo,
      this.contrasena
    );

    if (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Usuario registrado correctamente',
        buttons: ['OK'],
      });
      await alert.present();
      this.navCtrl.navigateBack('/login');
    }
  }
}
