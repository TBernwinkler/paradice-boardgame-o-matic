import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectLanguageState = (state: AppState) => state.language

export const selectLanguage = createSelector(
    selectLanguageState,
    (state) => state.language
)
