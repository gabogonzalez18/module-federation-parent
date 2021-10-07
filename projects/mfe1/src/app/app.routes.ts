import { Routes } from '@angular/router';
import { FlightsSearchComponent } from './flights/flights-search/flights-search.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },

];
