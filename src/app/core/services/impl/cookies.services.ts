// src/app/services/impl/cookies.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { ICookiesRepository } from '../../repositories/intefaces/cookie-repository.interface'; // Asegúrate de tener este archivo
import { Cookie } from '../../models/cookie.model';
import { COOKIES_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class CookiesService extends BaseService<Cookie> {
  constructor(
    @Inject(COOKIES_REPOSITORY_TOKEN) repository: ICookiesRepository // Asegúrate de tener esta interfaz
  ) {
    super(repository);
  }

  // Aquí puedes implementar métodos específicos para manejar cookies si es necesario
}
