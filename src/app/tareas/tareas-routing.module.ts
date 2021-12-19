import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { TareasFormComponent } from './components/tareas-form/tareas-form.component';

const routes: Routes = [
  {
    path: '',
    component: TareasComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'tarjeta',
        component: TareasFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
