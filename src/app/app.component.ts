import { Component } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Spring Boot CRUD With Angular';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {    
  }

  authenticated() { return this.app.authenticated; }

  logout() {
    this.http.post("logout", {}).subscribe(() => {
      this.app.authenticated = false;
      this.router.navigate(['/login']);
    });
  }

  userName!: string;

  

  ngOnInit() {
      let url = 'http://localhost:8080/user';

      let headers: HttpHeaders = new HttpHeaders({
          'Authorization': 'Basic ' + sessionStorage.getItem('token')
      });

      

      let options = { headers: headers };
      this.http.get<Observable<Object>>(url, options).
          subscribe((principal: any) => {
              this.userName = principal['name'];
          },
          error => {
              if(error.status == 401)
                 // alert('Unauthorized');
                console.log("Unauthorized");
          }
      );
  }

  // logout() {
  //     sessionStorage.setItem('token', '');
  //     this.router.navigateByUrl('/login');
  // }
  // private handleError(error: HttpErrorResponse) {
  //     if (error.error instanceof ErrorEvent) {
  //       console.error('An error occurred:', error.error.message);
  //     } else {
  //       console.error(
  //         `Backend returned code ${error.status}, ` +
  //         `body was: ${error.error}`);
  //     }
  //     return throwError(
  //       'Something bad happened; please try again later.');
  //   };
}
