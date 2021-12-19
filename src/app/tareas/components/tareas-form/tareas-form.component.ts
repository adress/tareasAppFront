import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../interfaces/tarea.interface';

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styles: [
  ]
})
export class TareasFormComponent implements OnInit {

  tarea: Tarea = {
    titulo: '',
    descripcion: '',
    fechaCreacion: '',
    finalizada: false,
    fechaVencimiento: ''
  }

  constructor(private fb: FormBuilder,
    private tareasService: TareasService) { }


  miFormulario: FormGroup = this.fb.group({
    titulo: [],
    descripcion: [],
    fechaCreacion: [],
    finalizada: [],
    fechaVencimiento: []
  });


  guardar() {
    const idtarea = this.tarea.id;
    this.tarea = this.miFormulario.value;
    this.tarea['id'] = idtarea;

    if (this.tarea.id) {
      this.tareasService.actualizarTarea(this.tarea).subscribe(
        (tarea) => console.log('tarea actaulizada', tarea)
      );
    } else {
      this.tareasService.agregarTarea(this.tarea).subscribe(
        (tarea) => console.log('tarea guardada', tarea)
      );
    }
  }

  borrar() {
    this.tareasService.borrarTarea(this.tarea.id!).subscribe(
      () => console.log('tarea borrada', this.tarea.id)
    );
  }

  ngOnInit(): void {

  }
}
