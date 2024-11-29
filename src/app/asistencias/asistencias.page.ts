import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  asistencias: any[] = []; 

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.obtenerAsistencias();
  }

  async obtenerAsistencias() {
    const { data, error } = await this.supabaseService.obtenerAsistencias();
    if (error) {
      console.error('Error al obtener asistencias:', error);
    } else {
      this.asistencias = data || [];
    }
  }
}
