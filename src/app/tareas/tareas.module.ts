import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';

import { TareasRoutingModule } from './tareas-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMasonryModule,
    TareasRoutingModule
  ]
})
export class TareasModule { }
