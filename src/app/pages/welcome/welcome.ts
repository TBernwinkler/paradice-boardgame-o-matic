import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    TranslateService,
    TranslatePipe
} from "@ngx-translate/core";
import { AppState } from '../../states/app.state';
import { Observable } from 'rxjs';
import { selectLanguage } from '../../states/language/language.selector';
import { gameActions } from '../../states/games/game.actions';


@Component({
  selector: 'app-welcome',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  private translate = inject(TranslateService)
  private readonly store = inject(Store<AppState>)
  
  private router = inject(Router);
  language$: Observable<string>;
  
  constructor() {
    this.language$ = this.store.select(selectLanguage)
    this.translate.addLangs(['de', 'en']);
    this.translate.setFallbackLang('de');
    this.language$.subscribe(languageCode => this.translate.use(languageCode));
  }

  loadGameList() {
    console.log("Attempting to load games.")
    this.store.dispatch(gameActions.loadGames());
  }
}