import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from "./app/app.component";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {provideRouter, Route} from "@angular/router";
import {LoggedInGuard} from "./app/guards/logged-in.guard";


export const ROUTES: Route[] = [
  {
    path: 'auth',
    // canActivate: [LoggedInGuard],
    // canActivateChild: [LoggedInGuard],
    loadChildren: () => import('./app/features/auth/auth.routes')
      .then(mod => mod.AUTH_ROUTES)
  },
  {
    path: 'home',
    pathMatch: "full",
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
    loadComponent: () => import('./app/features/home/home-page/home-page.component')
      .then(mod => mod.HomePageComponent)
  }

];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8180/v1/graphql'
          })
        }
      },
      deps: [HttpLink]
    },
    importProvidersFrom(HttpClientModule, ApolloModule),
    provideRouter(ROUTES)
  ]
});
