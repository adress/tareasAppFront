import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareasService } from '../../services/tareas.service';
import { Tarea, FormEvent, Accion } from '../../interfaces/tarea.interface';


@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styles: []
})
export class TareasFormComponent implements OnInit {

  @Input() tareaId!: string;

  tarea: Tarea = {
    descripcion: '',
    finalizada: false,
    fechaCreacion: '',
    fechaVencimiento: '',
  }

  @Output() formEvent = new EventEmitter<FormEvent>();

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService) { }

  ngOnInit(): void {
    if (this.tareaId) {
      this.tareasService.getTareaById(this.tareaId).subscribe(
        (tarea) => {
          this.tarea = tarea;
          this.miFormulario.reset(tarea);
        }
      );
    }
  }

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
        (tarea) => {
          tarea.fechaVencimiento = this.tarea.fechaVencimiento;
          this.formEvent.emit({ accion: Accion.Actualizar, tarea: tarea });
        }
      );
    } else {
      this.tareasService.agregarTarea(this.tarea).subscribe(
        (tarea) => {
          tarea.fechaVencimiento = this.tarea.fechaVencimiento;
          this.formEvent.emit({ accion: Accion.Crear, tarea: tarea });
        }
      );
    }
  }

  borrar() {
    if (this.tarea.id) {
      this.tareasService.borrarTarea(this.tarea.id).subscribe(
        () => {
          this.formEvent.emit({ accion: Accion.Borrar, tareaId: this.tarea.id });
        }
      );
    }

  }
}
