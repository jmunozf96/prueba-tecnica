import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {IndexComponent} from "./pages/index/index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'productos',
        loadChildren: () => import('../modules/producto/producto.module').then(m => m.ProductoModule),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule{

}
