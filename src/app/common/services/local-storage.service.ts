import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any | null {
    const str: string | null = localStorage.getItem(key);
    if (!str) {
      return null;
    }
    return JSON.parse(str);
  }

  // async getAsync(key: string): Promise<any | null> {
  //   const str: string | null = await localStorage.getItem(key);
  //   console.log(str)
  //   if (!str) {
  //     return null;
  //   }
  //   return JSON.parse(str);
  // }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
