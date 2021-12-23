import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() busqueda = new EventEmitter<string>();;
  @ViewChild('barraBusqueda') barraBusqueda!: ElementRef;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  limpiar() {
    if (this.barraBusqueda.nativeElement.value.length > 0) {
      this.barraBusqueda.nativeElement.value = '';
      this.busqueda.emit('');
    }
  }

  ngAfterViewInit(): void {
    fromEvent(this.barraBusqueda.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      //filter(res => res.length > 0),
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.busqueda.emit(this.barraBusqueda.nativeElement.value);
    });
  }

  get auth() {
    return this.authService.usuario;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }


}
