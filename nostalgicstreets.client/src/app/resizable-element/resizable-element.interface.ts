import { ResizableElementDirection } from "./resizable-element.enum";

export interface Position {
  top: number;
  width: number;
  height: number;
  left: number;
}

export interface ResizableElementEvent {
  currentWidthValue: number;
  currentHeightValue: number;

  originalWidthValue: number;
  originalHeightValue: number;

  differenceWidthValue: number;
  differenceHeightValue: number;

  currentTopValue: number;
  currentLeftValue: number;

  originalTopValue: number;
  originalLeftValue: number;

  differenceTopValue: number;
  differenceLeftValue: number;

  originalEvent: MouseEvent;
  direction: ResizableElementDirection;
}
