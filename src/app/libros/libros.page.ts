import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BibleService } from '../bible.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {
  reference: string = 'Juan 3:16'; 
  verse: any;

  constructor(private bibleService: BibleService,private navCtrl: NavController) {}

  ngOnInit() {
    
    this.loadDefaultVerse();
  }

  loadDefaultVerse() {
    this.bibleService.getVerse('john 3:16').subscribe(
      (response) => {
        this.verse = response;
      },
      (error) => {
        console.error('Error al cargar el versículo:', error);
      }
    );
  }

  searchVerse() {
    if (this.reference.trim() !== '') {
      this.bibleService.getVerse(this.reference).subscribe(
        (response) => {
          this.verse = response;
        },
        (error) => {
          console.error('Error al buscar el versículo:', error);
        }
      );
    }
  }

  goBack() {
    this.navCtrl.back();
  }
  
}


