import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DictionaryService } from '../services/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage {
  word: string = '';
  definition: any;

  constructor(private dictionaryService: DictionaryService,private navCtrl: NavController) {}

  async search() {
    if (this.word) {
      try {
        this.definition = await this.dictionaryService.getDefinition(this.word);
      } catch (error) {
        console.error('Error fetching definition:', error);
        this.definition = null; 
      }
    }
  }

  goBack() {
    this.navCtrl.back();
  }
  
}
