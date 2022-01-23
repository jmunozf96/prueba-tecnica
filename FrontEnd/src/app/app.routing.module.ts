import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: 'prueba',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: '',
    redirectTo: 'prueba',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
