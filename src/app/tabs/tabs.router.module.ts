import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  { path: 'tabs', component: TabsPage,
    children: [
      { path: 'ubis', children: [ { path: '', loadChildren: '../ubigeo/deps/deps.module#DepsPageModule' }]},
      { path: 'ubis/prov/:depid', children: [ { path: '', loadChildren: '../ubigeo/provs/provs.module#ProvsPageModule' }]},
      { path: 'ubis/dist/:provid', children: [ { path: '', loadChildren: '../ubigeo/dists/dists.module#DistsPageModule' }]},
      { path: 'tab1', children: [ { path: '', loadChildren: '../tab1/tab1.module#Tab1PageModule' }]},
      { path: 'tab2/:id', children: [{ path: '', loadChildren: '../tab2/tab2.module#Tab2PageModule' }]},
      { path: 'tab3/:id', children: [{ path: '', loadChildren: '../tab3/tab3.module#Tab3PageModule' }]},
      { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' }]},
  { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
