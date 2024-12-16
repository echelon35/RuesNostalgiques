import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ResizableElementDirection } from './resizable-element.enum';
import { Position, ResizableElementEvent } from './resizable-element.interface';

@Directive({
  selector: '[resize], [resizeStart], [resizeEnd]'
})
export class ResizableElementDirective implements OnChanges, OnDestroy {
  private mouseClickListener: () => void;
  private mouseUpListener: () => void;
  private mouseMoveListener: () => void;

  private targetElementWidthValue: number;
  private targetElementHeightValue: number;

  private targetElementTopValue: number;
  private targetElementLeftValue: number;

  private originalEvent: MouseEvent;

  @Input()
  public targetElement: HTMLElement | ElementRef;

  @Input()
  public direction: ResizableElementDirection;

  @Input()
  public proportionalResize: boolean = false;

  @Input()
  public rect: Position;

  @Input()
  public applyClass = 'resizing';

  @Output()
  public readonly resizeStart: EventEmitter<ResizableElementEvent> = new EventEmitter();

  @Output()
  public readonly resize: EventEmitter<ResizableElementEvent> = new EventEmitter();

  @Output()
  public readonly resizeEnd: EventEmitter<ResizableElementEvent> = new EventEmitter();

  @Input()
  @HostBinding('attr.draggable')
  public useDrag;

  constructor(private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2
  ) {
    this.listenMouseDownEvent();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.useDrag) {
      this.listenMouseDownEvent();
    }
  }

  public ngOnDestroy() {
    if (this.mouseClickListener) {
      this.mouseClickListener();
    }
    if (this.mouseUpListener) {
      this.mouseUpListener();
    }
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }

  public listenMouseDownEvent(): void {
    if (this.mouseClickListener) {
      this.mouseClickListener();
    }

    const event = this.useDrag ? 'dragstart' : 'mousedown';
    this.mouseClickListener = this.renderer2.listen(this.elementRef.nativeElement, event, evt => this.onMouseDown(evt));
  }

  public onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();

    this.setOriginalData(evt);

    this.resizeStart.emit(this.generateValuesForEvent(evt));

    this.mouseUpListener = this.renderer2.listen('document', 'mouseup', event => this.onMouseUp(event));
    this.mouseMoveListener = this.renderer2.listen('document', 'mousemove', event => this.onMouseMove(event));
    this.renderer2.addClass(this.targetNativeElement, this.applyClass);
  }


  private onMouseUp(evt: MouseEvent): void {
    const eventValues = this.generateValuesForEvent(evt);
    this.resize.emit(eventValues);
    this.mouseMoveListener();
    this.mouseUpListener();

    this.renderer2.removeClass(this.targetNativeElement, this.applyClass);
    this.resizeEnd.emit(eventValues);
  }


  private onMouseMove(evt: MouseEvent): void {
    this.resize.emit(this.generateValuesForEvent(evt));
  }


  private setOriginalData(originalEvent: MouseEvent) {
    this.originalEvent = originalEvent;

    if (this.targetElement) {
      const dataSource = this.targetNativeElement;
      this.targetElementWidthValue = dataSource.offsetWidth;
      this.targetElementHeightValue = dataSource.offsetHeight;
      this.targetElementTopValue = dataSource.offsetTop;
      this.targetElementLeftValue = dataSource.offsetLeft;
    } else {
      this.targetElementWidthValue = 0;
      this.targetElementHeightValue = 0;
      this.targetElementTopValue = 0;
      this.targetElementLeftValue = 0;
    }
  }

  private get targetNativeElement(): HTMLElement {
    return this.targetElement instanceof ElementRef ? this.targetElement.nativeElement : this.targetElement;
  }

  private generateValuesForEvent(evt: MouseEvent): ResizableElementEvent {
    const originalXValue = this.originalEvent.clientX;
    const originalYValue = this.originalEvent.clientY;

    let diffWidthValue = evt.clientX - originalXValue;
    let diffHeightValue = evt.clientY - originalYValue;
    let diffTopValue = diffHeightValue;
    let diffLeftValue = diffWidthValue;

    switch (this.direction) {
      case ResizableElementDirection.TOP: {
        diffHeightValue *= -1;
        diffWidthValue = 0;
        diffLeftValue = 0;
        break;
      }
      case ResizableElementDirection.TOP_RIGHT: {
        diffHeightValue *= -1;
        diffLeftValue = 0;
        break;
      }
      case ResizableElementDirection.RIGHT: {
        diffHeightValue = 0;
        diffTopValue = 0;
        diffLeftValue = 0;
        break;
      }
      case ResizableElementDirection.BOTTOM_RIGHT: {
        diffTopValue = 0;
        diffLeftValue = 0;
        break;
      }
      case ResizableElementDirection.BOTTOM: {
        diffWidthValue = 0;
        diffLeftValue = 0;
        diffTopValue = 0;
        break;
      }
      case ResizableElementDirection.BOTTOM_LEFT: {
        diffWidthValue *= -1;
        diffTopValue = 0;
        break;
      }
      case ResizableElementDirection.LEFT: {
        diffWidthValue *= -1;
        diffHeightValue = 0;
        diffTopValue = 0;
        break;
      }
      case ResizableElementDirection.TOP_LEFT: {
        diffHeightValue *= -1;
        diffWidthValue *= -1;
      }
    }

    let currentWidthValue = this.targetElementWidthValue + diffWidthValue;
    let currentHeightValue = this.targetElementHeightValue + diffHeightValue;

    if (this.proportionalResize) {
      if (currentWidthValue > currentHeightValue) {
        currentWidthValue = currentHeightValue;
      } else {
        currentHeightValue = currentWidthValue;
      }
    }

    if (currentHeightValue <= 1) {
      diffTopValue += currentHeightValue;
    }

    if (currentWidthValue <= 1) {
      diffLeftValue += currentWidthValue;
    }

    if (currentWidthValue <= 0) {
      currentWidthValue = 0;
    }

    if (currentHeightValue <= 0) {
      currentHeightValue = 0;
    }

    let currentTopValue = this.targetElementTopValue + diffTopValue;
    let currentLeftValue = this.targetElementLeftValue + diffLeftValue;

    if (this.rect) {
      if (currentTopValue < this.rect.top) {
        currentHeightValue = this.targetElementHeightValue + this.targetElementTopValue - this.rect.top;
        currentTopValue = this.rect.top;
      }
      if (currentHeightValue + currentTopValue > this.rect.height) {
        currentHeightValue = this.rect.height - currentTopValue;
      }

      if (currentLeftValue < this.rect.left) {
        currentWidthValue = this.targetElementWidthValue + this.targetElementLeftValue - this.rect.left;
        currentLeftValue = this.rect.left;
      }
      if (currentWidthValue + currentLeftValue > this.rect.width) {
        currentWidthValue = this.rect.width - currentLeftValue;
      }
    }

    return {
      originalEvent: this.originalEvent,
      currentWidthValue,
      currentHeightValue,
      currentTopValue,
      currentLeftValue,
      originalWidthValue: this.targetElementWidthValue,
      originalHeightValue: this.targetElementHeightValue,
      originalTopValue: this.targetElementTopValue,
      originalLeftValue: this.targetElementLeftValue,
      differenceWidthValue: currentWidthValue - this.targetElementWidthValue,
      differenceHeightValue: currentHeightValue - this.targetElementHeightValue,
      differenceTopValue: currentTopValue - this.targetElementTopValue,
      differenceLeftValue: currentLeftValue - this.targetElementLeftValue,
      direction: this.direction,
    };
  }
}
