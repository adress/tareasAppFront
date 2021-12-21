import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  miFormulario: FormGroup = this.fb.group({
    username: ['adress', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  login() {
    console.log(this.miFormulario.value);
    const { username, password } = this.miFormulario.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response) {
          this.router.navigateByUrl('/tareas');
        }
      }
    );
  }

}
