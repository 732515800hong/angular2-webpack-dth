import { Directive, OnChanges, OnInit, DoCheck, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[carousel-slider]',
  host: {
    '(touchstart)': 'touchStart($event)',
    '(touchmove)': 'touchMove($event)',
    '(touchend)': 'touchEnd($event)',
    'webkitTransitionEnd': 'transitionEnd($event)',
    '(transitionend)': 'transitionEnd($event)'
  }
})
export class CarouselSliderDirective implements OnChanges, OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer
  ) {

  }

  @Input() radius: Array<any>;
  @Input() size: number;
  @Input() isPlay: boolean;
  @Input() speed: number;

  startPos: any = { x: 0, y: 0 };    //touchstart 触点位置
  movePos: any = { x: 0, y: 0 };     //touchmove 移动距离
  startTouchTime: number;              //用于记录滑动时间计算
  transitionStyle: string = 'all .3s ease';
  transformx: number;
  last: number;
  innerWidth: number;
  currentSlider: number;
  animateTo: number;
  direction: string;
  isStart: boolean = true;                  //是否可以触发touchstart
  isMove: boolean = false;                  //是否可以触发touchmove
  isEnd: boolean = false;                   //是否可以触发touchend
  timeout: any;

  ngOnInit() {
    this.currentSlider = 1;
    this.innerWidth = window.innerWidth;
    if (!this.speed) {
      this.speed = 3000;
    }
  }

  ngOnChanges() {
    this.last = this.size > 1 ? this.size - 1 : this.size;
    if (this.size > 1) {
      this.setTransformStyle("none", `translate3d(-${this.innerWidth}px,0px,0px)`);
      if (this.isPlay) {
        this.play();
      }
    }
  }

  private cancelPlay() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private play() {
    this.timeout = setTimeout(() => {
      let transformx = -this.innerWidth;
      let target = this.getTarget('next');
      this.flexAnimateEnd(target);
      console.log(target);
      this.setElementTranslate(transformx, true, false, true);
      this.play();
    }, this.speed);
  }

  private touchStart(e: TouchEvent) {
    if (!this.isStart) {
      return;
    }
    this.cancelPlay();
    this.isStart = false;
    this.isMove = true;
    this.setTargetPostion(e, "start");
    this.movePos = { x: 0, y: 0 };
    this.transformx = this.getTranslate('x');
    this.startTouchTime = Date.now();
  }

  private touchMove(e: TouchEvent) {
    if (!this.isMove || (e.touches || e.changedTouches).length > 1) {
      return;
    }

    this.isEnd = true;
    this.setTargetPostion(e, "move");
    this.setElementTranslate(this.movePos.x);

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  }

  private touchEnd(e: TouchEvent) {
    if (!this.isEnd) {
      return;
    }
    this.isMove = false;
    this.isEnd = false;
    let touchEndTime = Date.now();
    let timeDiff = touchEndTime - this.startTouchTime;
    let transformx = 0;
    if (this.size > 1 && (timeDiff < 300 || Math.abs(this.movePos.x) > this.innerWidth / 2.5)) {
      transformx = this.movePos.x < 0 ? -this.innerWidth : this.innerWidth;
      let target = this.movePos.x < 0 ? this.getTarget('next') : this.getTarget('prev');
      this.flexAnimateEnd(target);
    } else {
      this.isStart = true;
    }
    this.setElementTranslate(transformx, true);
    this.play();
  }

  private flexAnimateEnd(target: number) {
    let atEnd = target === 0 || target === this.last;
    if (this.direction === 'next') {
      this.animateTo = target;
      this.currentSlider = target;
    } else {
      this.animateTo = target;
      this.currentSlider = target;
    }

    if (this.radius && this.radius.length > 0) {
      this.radius.forEach((radiu: any) => radiu.active = false);
      this.radius[this.currentSlider - 1].active = true;
    }
  }

  private transitionEnd() {
    if (this.animateTo === 1) {
      this.setElementTranslate(-(this.innerWidth), false, true);
    } else if (this.animateTo === this.last - 1) {
      this.setElementTranslate(-(this.animateTo * this.innerWidth), false, true);
    }
    this.isStart = true;
  }

  private getTarget(dir: string) {
    this.direction = dir;
    if (dir === 'next') {
      return (this.currentSlider === this.last - 1) ? 1 : this.currentSlider + 1;
    } else {
      return (this.currentSlider === 1) ? this.last - 1 : this.currentSlider - 1;
    }
  }

  private setTargetPostion(e: TouchEvent, type: string) {
    let touche = e.touches[0] || e.changedTouches[0];
    if (type === "move") {
      this.movePos = {
        x: touche.pageX - this.startPos.x,
        y: touche.pageY - this.startPos.y
      };
    } else {
      this.startPos = {
        x: touche.pageX,
        y: touche.pageY
      };
    }
  }

  private getTranslate(axis: string) {
    let curStyle = window.getComputedStyle(this.elementRef.nativeElement, null);
    let curTransform = curStyle.transform || curStyle.webkitTransform || curStyle.getPropertyValue("transform");
    let transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    if (axis === 'x') {
      return transformMatrix.m41;
    }
    if (axis === 'y') {
      return transformMatrix.m42;
    }
    return 0;
  }

  private setElementTranslate(move: number, isTransition?: boolean, isEnd?: boolean, isPlay?: boolean) {
    let transformx = 0;
    if (isPlay) {
      transformx = this.getTranslate('x');
    } else if (!isEnd) {
      transformx = this.transformx;
    }
    transformx = transformx + move;
    if (!isTransition) {
      this.setTransformStyle('none', 'translate3d(' + transformx + 'px,0px,0px)');
    } else {
      this.setTransformStyle('translate3d(' + transformx + 'px,0px,0px)');
    }
  }

  private setTransformStyle(transitionStyle: string, transformStyle?: string) {
    if (!transformStyle) {
      transformStyle = transitionStyle;
      transitionStyle = this.transitionStyle;
    }
    this.renderer.setElementStyle(this.elementRef.nativeElement, '-webkit-transition', transitionStyle);
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'transition', transitionStyle);
    this.renderer.setElementStyle(this.elementRef.nativeElement, '-webkit-transform', transformStyle);
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'transform', transformStyle);
  }

}