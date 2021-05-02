import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HTMLAttributes } from 'react';

import { from, fromEvent } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

import { switchMap, takeUntil, pairwise, debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.component.css']
})
export class DrawingEditorComponent implements AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  colors: any = ['red', 'blue']
  clear: boolean = false



  change_color(event: any) {
    this.cx.strokeStyle = event.target.style.backgroundColor
    console.log('clicked')
  }

  onWidth(event: any) {
    this.cx.lineWidth = event.target.value
  }


  onKey(event: any) {
    this.cx.strokeStyle = event.target.value
  }

  clear_canvas() {
    this.cx.fillStyle = '#fff';
    this.cx.clearRect(0, 0, this.width, this.height)
    this.cx.fillRect(0, 0, this.width, this.height)
  }


  @Input() public width = window.innerWidth - 60;
  @Input() public height = 400;



  private cx: CanvasRenderingContext2D;

  ngAfterViewInit() {

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.cx.fillStyle = '#fff';
    this.cx.fillRect(0, 0, this.width, this.height)


    const imgData = canvasEl.toDataURL('image/png')

    console.log(imgData)

    this.captureEvents(canvasEl);

  }




  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      ).subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();


        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);



      })

  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }


}



