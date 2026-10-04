import { Component, inject } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faHome, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { selectLanguage } from '../../states/language/language.selector';
import { setLanguage } from '../../states/language/language.actions';
import { NgClass, AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [FaIconComponent, NgClass, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  faLanguage = faLanguage;
  faHome = faHome;

  private store = inject(Store<AppState>)
  language$: Observable<string>;

  constructor() {
    this.language$ = this.store.select(selectLanguage)
  }

  setLanguage(selectedLanguage: string) {
    this.store.dispatch(setLanguage({language: selectedLanguage}));
  }

}
