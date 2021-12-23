import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    usuario: { id: '', username: '' }
  }

  errors: string[] = [];

  @Output() formEvent = new EventEmitter<FormEvent>();
  @Output() close = new EventEmitter<boolean>();

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
    descripcion: ['', [Validators.required]],
    fechaVencimiento: ['', [Validators.required]],
    fechaCreacion: [],
    finalizada: [],
  });

  guardar() {
    const estadoAntiguo = this.tarea.finalizada;
    const idtarea = this.tarea.id;
    this.tarea = this.miFormulario.value;
    this.tarea['id'] = idtarea;
    console.log(this.tarea);

    if (this.tarea.id) {
      this.tareasService.actualizarTarea(this.tarea).subscribe(
        {
          next: (tareaResp) => {
            if (!estadoAntiguo && tareaResp.tarea.finalizada) {
              this.playAudio();
            }
            this.formEvent.emit({
              accion: Accion.Actualizar, tareaId: tareaResp.tarea.id
            });
          },
          error: (e) => {
            if (e.status == 400) {
              this.errors = e.error.errors
            }
          }
        }
      );
    } else {
      this.tareasService.agregarTarea(this.tarea).subscribe(
        {
          next: (tareaResp) => {
            if (tareaResp.tarea.finalizada) {
              this.playAudio();
            }
            this.formEvent.emit({
              accion: Accion.Crear, tareaId: tareaResp.tarea.id
            });
          },
          error: (e) => {
            if (e.status == 400) {
              console.log(e.error.errors);
              this.errors = e.error.errors;
            }
          }
        }
      );
    }
  }

  cerrar(){
    this.close.emit(true);
  }


  borrar() {
    if (this.tarea.id) {
      this.tareasService.borrarTarea(this.tarea.id).subscribe(
        () => {
          this.formEvent.emit({
            accion: Accion.Borrar, tareaId: this.tarea.id
          });
        }
      );
    }
  }

  cerrarErrores() {
    this.errors = [];
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/notificacion.mp3";
    audio.load();
    audio.play();
  }

}
