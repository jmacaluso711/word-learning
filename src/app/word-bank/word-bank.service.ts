import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordBankService {

  constructor(
    private http: HttpClient
  ) { }

  public getWord(word: string) {
    return this.http.get(`https://kettle-assess.glitch.me/definition?word=${word}`);
  }
}
