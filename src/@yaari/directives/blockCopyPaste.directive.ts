import { Directive, HostListener } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor(private _snackBar: MatSnackBar) { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent): void {
    this._snackBar.open(`You're not allowed to paste in this field`, '', { duration: 3000 });
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent): void {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent): void {
    e.preventDefault();
  }

  /* @HostListener('keydown', ['$event']) triggerEsc(e: KeyboardEvent) {
     alert(e);
     if(e.keyCode===27){
       console.log("local esc");
       alert("esc")
     }
   }*/

  @HostListener('keydown', ['$event'])
  public onKeydownHandler(e: KeyboardEvent): void {
    if(e.keyCode === 13){
      alert('enter');
    }
  }
}
