import { Component } from '@angular/core';
import { Orientation } from '../resizable-element/resizable-element.component';

@Component({
  selector: 'app-oldnewpicture',
  templateUrl: './oldnewpicture.component.html'
})
export class OldnewpictureComponent {
  public readonly OrientationType = Orientation;
}
