import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CalendarificService } from '../calendarific.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  holidays: any[] = [];

  constructor(private calendarificService: CalendarificService,private navCtrl: NavController) {}

  ngOnInit() {
    this.loadHolidays();
  }

  goBack() {
    this.navCtrl.back();
  }

  loadHolidays() {
    const year = new Date().getFullYear();
    const country = 'CL'; // Cambia al código del país deseado

    this.calendarificService.getHolidays(year, country).subscribe(
      (response: any) => {
        this.holidays = response.response.holidays;
      },
      (error) => {
        console.error('Error al obtener los días festivos:', error);
      }
    );
  }
}
