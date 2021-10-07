import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthLibService } from 'auth-lib';
import { MetatagsService } from 'projects/mfe1/src/app/services/metatags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private transferState: TransferState,
    private metaTagsService: MetatagsService
    ) {

  }

  ngOnInit() {
    this.setMetaTags();
  }

  setMetaTags() {
    const stateKey = makeStateKey<any>(this.router.url);
    console.log('stateUrl', this.router.url);
    if (this.transferState.hasKey(stateKey)) {
        const stateData = this.transferState.get<any>(stateKey, null);
        console.log('recuperando de state --->', stateData);
        // if (state.url.indexOf('accidents') !== -1) {
            this.metaTagsService.setMetaTags(stateData.titleValidation!, stateData.descriptionValidation!);
        // } 
        // else if (state.url.indexOf('/cotizacion') !== -1) {
        //     this.metaTagsService.setMetaTags(stateData.titleQuotation!, stateData.descriptionQuotation!);
        // }
        // return the state datа as Observable
        // return of(stateData);
    } else {
      console.log('Server');

      this.metaTagsService.setMetaTags('Seguros Bolivar | Seguros Bolívar', 'Cotice y compre en línea su seguro de accidentes personales en viaje. Cuide a los que más quiere con un apoyo económico en caso de fallecimiento accidental.');
    //     this.cmsService.getInfoCMS() // httpClient call
    //         .pipe(
    //             tap({
    //                 next: (response) => {
    //                     // const seoData = {
    //                     //     title: response.title,
    //                     //     description: response.description
    //                     // };
    //                     // if (state.url.indexOf('validacion') !== -1) {
    //                         this.metaTagsService.setMetaTags(response.titleValidation!, response.descriptionValidation!);
    //                     // } 
    //                     // else if (state.url.indexOf('/cotizacion') !== -1) {
    //                     //     this.metaTagsService.setMetaTags(response.titleQuotation!, response.descriptionQuotation!);
    //                     // } 
    //                     console.log('data antes de setear --->', response);
    //                     this.transferState.set(stateKey, response);
    //                 }
    //             })
    //         );
    }
  }

}
