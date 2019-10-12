import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../user';
import {LOGIN} from '../constants';
import {Token} from '../token';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public currentUserValue(): Token {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:variable-name
  login(email, password, remember_me): Observable<any> {
    console.log({email, password, remember_me});
    return this.http.post<any>(LOGIN, {
      email, password, remember_me
    })
      .pipe(
        map(user => {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        tap(_ => console.log('logged in')),
        catchError((this.handleError<any>('login', []))));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // public isAuthenticated(): boolean {
  //   const user: User = JSON.parse(localStorage.getItem('currentUser'));
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(user.token);
  // }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
