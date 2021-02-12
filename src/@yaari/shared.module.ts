import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DndDirective} from '@yaari/directives/dnd.directive';

const modules = [
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [DndDirective],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules, DndDirective]
})
export class SharedModule { }
