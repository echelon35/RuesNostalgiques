import { NgModule } from '@angular/core';
import { ResizableElementDirective } from './resizable-element.directive';
import { ResizableElementComponent } from './resizable-element.component';

@NgModule({
  declarations: [ResizableElementDirective, ResizableElementComponent],
  imports: [],
  exports: [ResizableElementDirective, ResizableElementComponent]
})
export class AngularResizeElementModule { }
