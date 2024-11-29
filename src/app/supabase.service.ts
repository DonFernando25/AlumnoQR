import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://wysuyipauzepvildtjiv.supabase.co'; 
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5c3V5aXBhdXplcHZpbGR0aml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MjU2MjEsImV4cCI6MjA0ODQwMTYyMX0.fw0r18Bof8yoXdZyT1X07wWIFPboAegLExMZAn3SxHw'; 
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async registrarUsuario(nombre: string, correo: string, contrasena: string) {
    const { data, error } = await this.supabase.from('usuarios').insert([
      { nombre, correo, contrasena },
    ]);
    return { data, error };
  }

  async login(username: string, password: string) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('correo', username) 
      .eq('contrasena', password) 
      .maybeSingle(); 
    if (data) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username); 
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
  
    return { data, error };
  }



  async getSession() {
    const { data } = await this.supabase.auth.getSession();
    return data?.session;
  }

  logout(): void {
    this.supabase.auth.signOut();
    localStorage.removeItem('isLoggedIn');
  }


  async insertAsistencia(data: any) {
    return await this.supabase.from('asistencia').insert([data]);
  }
}

