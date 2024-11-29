import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/<word>'; 

  constructor() {}

  async getDefinition(word: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}${word}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from the dictionary API:', error);
      throw error;
    }
  }
}
