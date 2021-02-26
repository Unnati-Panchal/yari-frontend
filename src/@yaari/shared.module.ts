import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DndDirective} from '@yaari/directives/dnd.directive';
import { ErrorSuccessComponent } from './components/yaari-error/yaari-error.component';

const modules = [
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [DndDirective, ErrorSuccessComponent, ErrorSuccessComponent, ErrorSuccessComponent],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules, DndDirective, ErrorSuccessComponent, ErrorSuccessComponent]
})
export class SharedModule { }
