import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {RouterModule} from "@angular/router";
import { ListProductsComponent } from './components/list-products/list-products.component';
import {ProductoService} from "./services/producto.service";
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    IndexComponent,
    ListProductsComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
})
export class ProductoModule {
}
