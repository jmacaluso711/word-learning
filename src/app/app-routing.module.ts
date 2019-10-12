import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordBankComponent } from './word-bank/word-bank.component';
import { FlashCardComponent } from './flash-card/flash-card.component';


const routes: Routes = [
  {
    path: '',
    component: WordBankComponent,
  },
  {
    path: 'flash-card',
    component: FlashCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
