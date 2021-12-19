import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };

  constructor(private http: HttpClient) { }

  private _baseUrl: string = 'http://192.168.1.7:8000';

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this._baseUrl}/tareas/consultar`);
  }

  getTareaById(id: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this._baseUrl}/tareas/ver/${id}`);
  };

  agregarTarea(tarea: Tarea) {
    return this.http.post<Tarea>(`${this._baseUrl}/tareas/crear`, tarea);
  };

  actualizarTarea(tarea: Tarea): Observable<Tarea> {
    const { id, ...data } = tarea;
    return this.http.put<Tarea>(`${this._baseUrl}/tareas/actualizar/${tarea.id}`, data);
  }

  borrarTarea(id: string) {
    return this.http.delete(`${this._baseUrl}/tareas/borar/${id}`)
  };

}
