import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {

  username: string = 'Invitado';

  constructor(private router: Router, private navCtrl: NavController) {
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['username']) {
      this.username = navigation.extras.state['username'];
    }
  }

  

  goBack() {
    this.navCtrl.back();
  }
  
  goToPage(page: string) {
    this.router.navigate([`/${page}`]); 
  }

  gologin() {
    this.router.navigate(['/login']); 
  }

}

