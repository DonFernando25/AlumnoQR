import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  implements CanComponentDeactivate {

  username: string = 'Invitado';

  constructor (private router: Router, private navCtrl: NavController, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['username']) {
      this.username = navigation.extras.state['username'];
    }
  }

  canDeactivate(): boolean {
    const confirmLogout = confirm('¿Seguro que quieres salir? Esto cerrará tu sesión.');
    if (confirmLogout) {
      this.authService.logout();
    }
    return confirmLogout;
  }

  

  goBack() {
    const confirmLogout = this.canDeactivate(); 
    if (confirmLogout) {
      this.navCtrl.navigateRoot(['/login']); 
    }
  }
  
  goToPage(page: string) {
    this.router.navigate([`/${page}`]); 
  }


}

