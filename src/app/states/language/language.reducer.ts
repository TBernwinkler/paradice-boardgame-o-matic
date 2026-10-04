import { createReducer, on } from '@ngrx/store'
import { setLanguage } from './language.actions'

export interface LanguageState {
    language: string
}

export const initialLanguageState: LanguageState = {
    language: 'de'
}

export const languageReducer = createReducer(
    initialLanguageState,    
    on(setLanguage, (state, parameter) => ({...state, language: parameter.language}))
)
