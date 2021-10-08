import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthLibModule } from 'auth-lib';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RendererModule, TransferHttpCacheModule } from '@nguniversal/common/clover';
import { MetatagsService } from 'projects/mfe1/src/app/services/metatags.service';
import { OrquestationService } from './services/orquestation.service';
// import { SharedLibModule } from 'projects/shared-lib/src/public-api';

export function orquestation(orquestationService:OrquestationService){
  return () => {
    console.log("APP INITIALIZER");
    orquestationService.call();
  }
}
@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'appId' }),
    AuthLibModule,
    // SharedLibModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    RendererModule.forRoot(),
    TransferHttpCacheModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  providers: [
    MetatagsService,
    OrquestationService,
    {
      provide: APP_INITIALIZER,
      useFactory: orquestation,
      multi: true,
      deps: [OrquestationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
