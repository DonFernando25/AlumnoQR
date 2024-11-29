import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  username: string = 'Invitado';

  constructor (private router: Router, private navCtrl: NavController, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['username']) {
      this.username = navigation.extras.state['username'];
    }
  }


  goBack() {
      this.navCtrl.navigateRoot(['/login']); 
  }
  
  goToPage(page: string) {
    this.router.navigate([`/${page}`]); 
  }


}

