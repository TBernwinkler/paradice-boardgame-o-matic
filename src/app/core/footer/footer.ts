import { Component, inject } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCartShopping, faDiceSix, faTableList } from "@fortawesome/free-solid-svg-icons"
import { faDiscord, faInstagram, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../../states/language/language.selector';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [FaIconComponent, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  faSquareGithub = faSquareGithub;
  faDiscord = faDiscord;
  faInsta = faInstagram;
  faDiceSix = faDiceSix;
  faTableList = faTableList;
  faShoppingCart = faCartShopping;

  private translate = inject(TranslateService)
  private store = inject(Store<AppState>)
  language$: Observable<string>;

  constructor() {
    this.language$ = this.store.select(selectLanguage)
    this.translate.addLangs(['de', 'en']);
    this.translate.setFallbackLang('de');
    this.language$.subscribe(languageCode => this.translate.use(languageCode))
  }
}
