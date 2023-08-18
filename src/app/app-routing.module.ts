import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ShopDashboardComponent } from './shop-dashboard/shop-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AtmComponent } from './atm/atm.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'atm', component: AtmComponent },
  { path: 'shop', component: ShopDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
