import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http= inject(HttpClient);
  private baseUrl = 'http://localhost:5001/api/account';
  currentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(`${this.baseUrl}/login`, model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
      )
    }

    register(model: any) {
      return this.http.post<User>(`${this.baseUrl}/register`, model).pipe(
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
          return user;
        })
        )
      }



    logout() {
      localStorage.removeItem('user');
      this.currentUser.set(null);
    }
  }



