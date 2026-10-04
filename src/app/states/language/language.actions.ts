import { createAction, props } from "@ngrx/store"

export const setLanguage = createAction('[Header Language] setLanguage', props<{language: string}>());
