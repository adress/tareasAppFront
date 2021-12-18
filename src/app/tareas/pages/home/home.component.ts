import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../interfaces/tarea.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tareas: Tarea[] = [];

  constructor(private tareaService: TareasService) { }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe(
      (tareas) => {
        this.tareas = tareas;
      }
    )
  }

  nuevoEstado(check: boolean, tarea: Tarea) {
    tarea.finalizada = check;
    this.tareaService.actualizarTarea(tarea).subscribe(
      (nuevaTarea) => tarea = nuevaTarea
    );
  }

}
