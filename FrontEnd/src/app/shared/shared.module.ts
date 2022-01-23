import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {IndexComponent} from "./pages/index/index.component";
import {SharedRoutingModule} from "./shared.routing.module";

@NgModule({
  declarations: [
    NavbarComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
