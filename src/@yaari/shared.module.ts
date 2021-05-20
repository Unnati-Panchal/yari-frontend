import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DndDirective} from '@yaari/directives/dnd.directive';
import { ErrorSuccessComponent } from './components/yaari-error/yaari-error.component';
import {BlockCopyPasteDirective} from '@yaari/directives/blockCopyPaste.directive';

const modules = [
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [DndDirective, ErrorSuccessComponent, BlockCopyPasteDirective],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules, DndDirective, ErrorSuccessComponent, BlockCopyPasteDirective]
})
export class SharedModule { }
