import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit {
  private wordsData = JSON.parse(localStorage.getItem('words'));
  private wordsForm: FormGroup;
  private studyWords: any;
  private complete: string;

  public hideForm = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.wordsForm = this.fb.group({
      words: new FormArray([])
    });

    this.addCheckboxes();
  }

  ngOnInit() {

  }

  private addCheckboxes() {
    this.wordsData.forEach((o, i) => {
      const control = new FormControl();
      (this.wordsForm.controls.words as FormArray).push(control);
    });
  }

  submitWordsForm() {
    const selectedWords = this.wordsForm.value.words
      .map((v, i) => v ? this.wordsData[i].word : null)
      .filter(v => v !== null);
    this.studyWords = this.wordsData.filter(word => selectedWords.includes(word.word));
    this.studyWords[0].visible = true;
    this.wordsForm.reset();
    this.hideForm = true;
  }

  reveal(studyWord: any, i: number) {
    studyWord.showDef = true;

    if (this.studyWords[i + 1]) {
      this.studyWords[i + 1].visible = true;
    } else {
      this.complete = "You're done!"
    }
  }

  restart() {
    this.studyWords.forEach(studyWord => {
      studyWord.showDef = false;
      studyWord.visible = false;
    });
    this.studyWords = [];
    this.hideForm = false;
    this.complete = '';
  }

  goToWordBank() {
    this._router.navigate(['']);
  }
}
