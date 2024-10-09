// src/app/repositories/impl/cookies-repository.service.ts
import { Inject, Injectable } from '@angular/core';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Cookie } from '../../core/models/cookie.model';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { HttpClient } from '@angular/common/http';
import { COOKIES_API_URL } from './repository.tokens';

@Injectable({
    providedIn: 'root'
  })
  export class CookiesRepositoryService extends BaseRepositoryHttpService<Cookie> {
    constructor(http: HttpClient, @Inject(COOKIES_API_URL) apiUrl: string) {
      super(http, apiUrl); // Aquí se pasa el HttpClient y la URL al constructor de la clase base
    }
    
    // Aquí puedes añadir métodos específicos para manejar cookies si es necesario
  }