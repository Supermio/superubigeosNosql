import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '' , loadChildren: './auth/login/login.module#LoginPageModule'},
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' }
  /*,  { path: 'prov/:id', redirectTo: '/tabs/tab2/:id', pathMatch: 'full' },
  { path: 'dist/:id', redirectTo: '/tabs/tab3/:id', pathMatch: 'full' }*/
  , { path: 'deps', loadChildren: './ubigeo/deps/deps.module#DepsPageModule' },
  { path: 'tabs/ubis/prov/:id', loadChildren: './ubigeo/provs/provs.module#ProvsPageModule' },
  { path: 'tabs/ubis/dist/:id', loadChildren: './ubigeo/dists/dists.module#DistsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
