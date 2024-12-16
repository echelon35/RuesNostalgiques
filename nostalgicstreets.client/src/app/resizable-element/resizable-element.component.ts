import { Component, Input } from '@angular/core';
import { ResizableElementEvent } from '../resizable-element/resizable-element.interface';
import { ResizableElementDirection } from '../resizable-element/resizable-element.enum';

export enum Orientation {
  PORTRAIT = 'portrait',
  PAYSAGE = 'paysage',
}

@Component({
  selector: 'app-resizable-element',
  templateUrl: './resizable-element.component.html',
  styleUrl: 'resizable-element.scss'
})
export class ResizableElementComponent {
  public readonly AngularResizeElementDirection = ResizableElementDirection;
  public data: any = {};
  @Input() original: string;
  @Input() new: string;
  @Input() orientation: Orientation;

  public onResize(evt: ResizableElementEvent): void {
    this.data.width = evt.currentWidthValue;
    this.data.height = evt.currentWidthValue;
    //this.data.top = evt.currentTopValue;
    //this.data.left = evt.currentLeftValue;
  }
}
