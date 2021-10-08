import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';

const URL = 'http://127.0.0.1:8087/remoteEntry.js';

export const APP_ROUTES: Routes = [
    {
      path: 'seguros-en-linea',
      component: HomeComponent,
      pathMatch: 'full',
    },

    // Your route here:
    {
      path: 'seguros-en-linea/seguros-accidentes-personales',
      loadChildren: () => loadRemoteModule({
          remoteEntry: URL,
          remoteName: 'mfe1',
          exposedModule: './Module'
        })
        .then(m => m.FlightsModule) 
    },

    {
      path: '',
      redirectTo: 'seguros-en-linea',
      pathMatch: 'full',
    },

    {
      path: '**',
      component: NotFoundComponent
    }


    // DO NOT insert routes after this one.
    // { path:'**', ...} needs to be the LAST one.

];

