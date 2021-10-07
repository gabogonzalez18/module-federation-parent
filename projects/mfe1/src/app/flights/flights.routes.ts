import { Routes } from '@angular/router';
import { PageResolver } from '../services/page-resolver';
import { FlightsSearchComponent } from './flights-search/flights-search.component';

export const FLIGHTS_ROUTES: Routes = [
    {
      path: 'cotizacion',
      component: FlightsSearchComponent,
      // resolve: [PageResolver]
    },
];
