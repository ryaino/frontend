import {Route} from "@angular/router";

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component')
      .then(mod => mod.LoginPageComponent)
  },
];
