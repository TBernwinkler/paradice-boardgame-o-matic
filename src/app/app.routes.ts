import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Questionnaire } from './pages/questionnaire/questionnaire';
import { Results } from './pages/results/results';

export const routes: Routes = [
    {
        path: '',
        component: Welcome
    },
    {
        path: 'questionnaire',
        component: Questionnaire
    },
    {
        path: 'results',
        component: Results
    }
];
