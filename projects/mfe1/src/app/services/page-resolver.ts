import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { MetatagsService } from '../services/metatags.service';


@Injectable({ providedIn: 'root' })

export class PageResolver implements Resolve<any> {

    constructor(
        private transferState: TransferState,
        private metaTagsService: MetatagsService,
        private cmsService: CmsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('resolve ---->');
        
        const stateKey = makeStateKey<any>(state.url);
        console.log('stateUrl', state.url);
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
            return of(stateData);
        } else {
            console.log('entra server');
            
            return this.cmsService.getInfoCMS() // httpClient call
                .pipe(
                    tap({
                        next: (response) => {
                            // const seoData = {
                            //     title: response.title,
                            //     description: response.description
                            // };
                            // if (state.url.indexOf('validacion') !== -1) {
                                this.metaTagsService.setMetaTags(response.titleValidation!, response.descriptionValidation!);
                            // } 
                            // else if (state.url.indexOf('/cotizacion') !== -1) {
                            //     this.metaTagsService.setMetaTags(response.titleQuotation!, response.descriptionQuotation!);
                            // } 
                            console.log('data antes de setear --->', response);
                            this.transferState.set(stateKey, response);
                        }
                    })
                );
        }
    }
    
}