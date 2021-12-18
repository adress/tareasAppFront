import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';

import { TareasRoutingModule } from './tareas-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMasonryModule,
    TareasRoutingModule
  ]
})
export class TareasModule { }
