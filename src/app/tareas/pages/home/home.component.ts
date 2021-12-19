import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea, FormEvent, Accion } from '../../interfaces/tarea.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tareas: Tarea[] = [];

  tareaSelecionada: Tarea = {
    descripcion: '',
    fechaCreacion: '',
    finalizada: false,
    fechaVencimiento: ''
  }

  panelOpenState: boolean = true;

  constructor(private tareaService: TareasService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe(
      (tareas) => {
        this.tareas = tareas;
      }
    )

    //this.abrirDialogGuardar();
  }

  nuevoEstado(check: boolean, tarea: Tarea) {
    tarea.finalizada = check;
    this.tareaService.actualizarTarea(tarea).subscribe(
      (nuevaTarea) => tarea = nuevaTarea
    );
  }

  abrirDialogGuardar(tareaId: string) {
    // console.log(window.innerWidth);
    console.log('la tarea es ', tareaId);

    const dialog = this.matDialog.open(DialogComponent, {
      width: '60%',
      panelClass: 'custom-dialog-container',
      data: tareaId
    });

    dialog.afterClosed().subscribe((formEvent: FormEvent) => {
      if (formEvent) {

        if (formEvent.accion == Accion.Crear) {
          this.tareas.push(formEvent.tarea!);
        }

        if (formEvent.accion == Accion.Actualizar) {
          //TODO: implementar accion de actualziar
          const index = this.tareas.map((tarea) => tarea.id).indexOf(formEvent.tarea?.id);
          console.log('la tarea a actualziar es'+ index);
          this.tareas[index] = formEvent.tarea!;
        }

        if (formEvent.accion == Accion.Borrar) {
          this.tareas = this.tareas.filter((tarea) => tarea.id != formEvent.tareaId);
        }
      }
    });
  }




}
