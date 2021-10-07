import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { RouterModule } from '@angular/router';
import { FLIGHTS_ROUTES } from './flights.routes';
import { AuthLibModule } from 'auth-lib';
import { SharedLibModule } from 'shared-lib';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { PageResolver } from '../services/page-resolver';
import { HttpClientModule } from '@angular/common/http';
import { CmsService } from '../services/cms.service';
import { MetatagsService } from '../services/metatags.service';

@NgModule({
  imports: [
    CommonModule,
    AuthLibModule,
    SharedLibModule,
    RouterModule.forChild(FLIGHTS_ROUTES),
    TransferHttpCacheModule,
    HttpClientModule
  ],
  declarations: [
    FlightsSearchComponent
  ],
  providers: [PageResolver, CmsService, MetatagsService]
})
export class FlightsModule { }
