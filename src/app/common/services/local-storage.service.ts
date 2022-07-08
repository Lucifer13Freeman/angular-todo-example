import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any | null {
    const str: string | null = localStorage.getItem(key);
    if (!str) {
      return null;
    }
    return JSON.parse(str);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
