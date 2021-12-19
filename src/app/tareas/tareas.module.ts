import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';

import { TareasRoutingModule } from './tareas-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { MenuComponent } from './components/menu/menu.component';

import { TareasComponent } from './pages/tareas/tareas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TareasFormComponent } from './components/tareas-form/tareas-form.component';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    TareasComponent,
    TareasFormComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMasonryModule,
    TareasRoutingModule
  ]
})
export class TareasModule { }
