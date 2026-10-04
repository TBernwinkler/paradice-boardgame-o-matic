import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, provideTranslateLoader } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { languageReducer } from './states/language/language.reducer';
import { provideEffects } from '@ngrx/effects';
import * as gamesEffect from './states/games/game.effect';
import { gameFeatures } from './states/games/game.feature';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: '/assets/i18n/',
                suffix: '.json'
            }),
            fallbackLang: 'de',
            lang: 'de'
        }),
        provideStore({
            language: languageReducer
        }),
        provideEffects(gamesEffect),
        provideState(gameFeatures)
    ]
};
