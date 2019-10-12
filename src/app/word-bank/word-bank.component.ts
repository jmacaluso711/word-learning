import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordBankService } from './word-bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-bank',
  templateUrl: './word-bank.component.html',
  styleUrls: ['./word-bank.component.css']
})
export class WordBankComponent implements OnInit {
  private wordForm: FormGroup;
  private loading = false;

  public words = JSON.parse(localStorage.getItem('words')) || [];

  constructor(
    private fb: FormBuilder,
    private wbService: WordBankService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.wordForm = this.fb.group({
      word: ['', Validators.required]
    })
  }

  public submitWordForm(): void {
    const formValue = this.wordForm.value;
    this.loading = true;

    this.wbService.getWord(formValue.word)
      .subscribe(res => {
        this.words.push(res);
        localStorage.setItem('words', JSON.stringify(this.words));
        this.loading = false;
        this.wordForm.reset();
      })
  }

  public flashCardMode() {
    this._router.navigate(['flash-card']);
  }

}
