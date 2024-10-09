// src/app/repositories/repository.factory.ts
import { FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Person } from '../models/person.model';
import { Cookie } from '../models/cookie.model'; // Importar el modelo de cookies
import { PEOPLE_API_URL, PEOPLE_REPOSITORY_TOKEN, COOKIES_REPOSITORY_TOKEN } from './repository.tokens';

export function createHttpRepository<T>(http: HttpClient, apiUrl: string): IBaseRepository<T> {
  return new BaseRepositoryHttpService<T>(http, apiUrl);
}

// Ejemplo de configuración para People
export const PeopleRepositoryFactory: FactoryProvider = {
  provide: PEOPLE_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL: string) => {
    return createHttpRepository<Person>(http, apiURL);
  },
  deps: [HttpClient, PEOPLE_API_URL]
};

// Configuración para Cookies
export const CookiesRepositoryFactory: FactoryProvider = {
  provide: COOKIES_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL: string) => {
    return createHttpRepository<Cookie>(http, apiURL);
  },
  deps: [HttpClient, PEOPLE_API_URL] // Cambia PEOPLE_API_URL por la URL que usarás para las cookies
};
