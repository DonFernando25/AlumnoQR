import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SupabaseService } from '../supabase.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private authService: SupabaseService

    
  ) {}

  async login() {
    if (this.username && this.password) {
      try {
        const { data, error } = await this.authService.login(this.username, this.password);
  
        if (data) {
          this.router.navigate(['/inicio'], { state: { username: this.username } });
        } else if (error) {
          const alert = await this.alertController.create({
            header: 'Error de autenticación',
            message: error.message || 'Nombre de usuario o contraseña incorrectos.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (err) {
        const alert = await this.alertController.create({
          header: 'Error inesperado',
          message: 'Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, completa todos los campos antes de continuar.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
  
  

  goToResetPassword() {
    this.router.navigate(['/restablecer']);
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  } 

  goBack() {
    this.navCtrl.back();
  }

 

}

