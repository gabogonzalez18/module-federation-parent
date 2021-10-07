import { loadRemoteEntry } from '@angular-architects/module-federation';

Promise.all([
   loadRemoteEntry('http://127.0.0.1:8089/remoteEntry.js', 'mfe1')
])
.catch(err => console.error('Error loading remote entries', err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));



