import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage   {

  email: string = '';

  constructor(private router: Router, private alertController: AlertController, private navCtrl: NavController) {}

  async sendReset() {
    if (this.email) {
      const alert = await this.alertController.create({
        header: 'Correo enviado',
        message: `Se ha enviado un correo a ${this.email}`,
        buttons: ['OK']
      });

      await alert.present();

      alert.onDidDismiss().then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese un correo válido.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  goBack() {
    this.navCtrl.back();
  }



}
