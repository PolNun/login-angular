import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterJoinWithComponent} from './footer-join-with/footer-join-with.component';
import {HeaderContentComponent} from "./header-content/header-content.component";


@NgModule({
  declarations: [
    HeaderContentComponent,
    FooterJoinWithComponent,
  ],
  exports: [
    HeaderContentComponent,
    FooterJoinWithComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
