import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, empty, EMPTY } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
          this._snackBar.open('algo salio mal, intente de nuevo', 'ok', { duration: 5 * 1000 });
          return EMPTY;
        } else {
          if (err.status == 401) {
            if (this.authService.isAuthenticated()) {
              this.authService.logout();
              this.router.navigate(['/login']);
            } else {
              //intentando iniciar session
              return throwError(() => err);
            }
          }

          if (err.status == 403) {
            const mensaje = (err.error.mensaje) ? err.error.mensaje : 'No tienes permisos para realizar esta accion';
            this._snackBar.open(mensaje, 'ok', { duration: 5 * 1000 });
            this.router.navigate(['/tareas']);
            return EMPTY;
          }

          return throwError(() => err);

        }
      })
    );
  }
}
