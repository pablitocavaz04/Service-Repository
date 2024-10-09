// src/app/repositories/impl/cookies-repository.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { ICookiesRepository } from '../intefaces/cookie-repository.interface';

@Injectable({
  providedIn: 'root'
})
export class CookiesRepositoryService implements ICookiesRepository {

  private readonly storageKey = 'cookies';

  getAll(): Observable<any[]> {
    return from(
      Preferences.get({ key: this.storageKey }).then(result => {
        return result.value ? JSON.parse(result.value) : [];
      })
    );
  }

  getById(id: string): Observable<any | null> {
    return from(
      Preferences.get({ key: this.storageKey }).then(result => {
        const cookies = result.value ? JSON.parse(result.value) : [];
        return cookies.find((cookie: any) => cookie.id === id) || null;
      })
    );
  }

  add(cookie: any): Observable<string> {
    return new Observable<string>(observer => {
      this.getAll().subscribe(cookies => {
        cookie.id = Date.now().toString(); // Genera un ID temporal
        cookies.push(cookie);
        Preferences.set({ key: this.storageKey, value: JSON.stringify(cookies) }).then(() => {
          observer.next(cookie.id);
          observer.complete();
        });
      });
    });
  }

  update(id: string, updatedCookie: any): Observable<void> {
    return new Observable<void>(observer => {
      this.getAll().subscribe(cookies => {
        const index = cookies.findIndex((cookie: any) => cookie.id === id);
        if (index !== -1) {
          cookies[index] = { ...cookies[index], ...updatedCookie };
          Preferences.set({ key: this.storageKey, value: JSON.stringify(cookies) }).then(() => {
            observer.next();
            observer.complete();
          });
        } else {
          observer.error(new Error('Cookie not found'));
        }
      });
    });
  }

  delete(id: string): Observable<void> {
    return new Observable<void>(observer => {
      this.getAll().subscribe(cookies => {
        const updatedCookies = cookies.filter((cookie: any) => cookie.id !== id);
        Preferences.set({ key: this.storageKey, value: JSON.stringify(updatedCookies) }).then(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }
}
