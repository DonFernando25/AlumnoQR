import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalendarificService {
  private API_URL = 'https://calendarific.com/api/v2/holidays';
  private API_KEY = 'X3PeYR90CCMgMPZatB6lCnjy7gmsgxdo'; 
  private country = 'CL';

  constructor(private http: HttpClient) {}

  
  getHolidays(year: number, country: string) {
    const params = {
      api_key: this.API_KEY,
      country: country,
      year: year.toString(),
    };
    return this.http.get(`${this.API_URL}`, { params });
  }
}
