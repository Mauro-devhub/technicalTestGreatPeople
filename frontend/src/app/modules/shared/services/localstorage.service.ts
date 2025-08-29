import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    } else {
      return null;
    }
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}