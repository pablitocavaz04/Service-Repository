// src/app/core/cookie.model.ts
import { Model } from './base.model';

export interface Cookie extends Model {
  name: string;
  value: string;
  // Puedes agregar otras propiedades relacionadas con las cookies según sea necesario
}
