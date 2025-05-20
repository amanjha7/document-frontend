import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-image-doctor',
  standalone: false,
  templateUrl: './image-doctor.component.html',
  styleUrls: ['./image-doctor.component.scss']
})
export class ImageDoctorComponent implements AfterViewInit {
  @ViewChild('imageCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private image = new Image();
  private actions: any[] = [];
  private previewAction: any = null;
  private drawing = false;
  private startX = 0;
  private startY = 0;
  private selectedTextIndex: number = -1;

  selectedTool: string = 'rect';
  selectedColor: string = '#ff0000';
  selectedLineWidth: number = 2.5;
  fillShape: boolean = false;
  imageLoaded = false;
  undoStack: any[] = [];
  redoStack: any[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image.src = reader.result as string;
        this.image.onload = () => {
          const canvas = this.canvasRef.nativeElement;
          canvas.width = this.image.width;
          canvas.height = this.image.height;
          this.redraw();
          this.imageLoaded = true;
          this.actions = [];
        };
      };
      reader.readAsDataURL(file);
    }
  }

  setTool(tool: string) {
    this.selectedTool = tool;
  }

  // onMouseDown(event: MouseEvent) {
  //   if (!this.imageLoaded) return;
  //   this.drawing = true;
  //   this.startX = event.offsetX;
  //   this.startY = event.offsetY;
  // }

  onMouseDown(event: MouseEvent) {
    if (!this.imageLoaded) return;
    const { x, y } = this.getCanvasCoordinates(event);
    this.drawing = true;
    this.startX = x;
    this.startY = y;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.drawing || !this.imageLoaded) return;
    const { x, y } = this.getCanvasCoordinates(event);

    this.previewAction = {
      type: this.selectedTool,
      x: this.startX,
      y: this.startY,
      width: x - this.startX,
      height: y - this.startY,
      color: this.selectedColor,
      lineWidth: this.selectedLineWidth,
      fill: this.fillShape,
      fromX: this.startX,
      fromY: this.startY,
      toX: x,
      toY: y
    };

    this.redraw();
  }
  
onMouseUp(event: MouseEvent) {
  if (!this.imageLoaded) return;
  this.drawing = false;
  const { x, y } = this.getCanvasCoordinates(event);

  if (this.selectedTool === 'text') {
    for (let i = this.actions.length - 1; i >= 0; i--) {
      const action = this.actions[i];
      if (action.type === 'text' && this.isTextClicked(action, x, y)) {
        const newText = prompt('Edit text:', action.text);
        if (newText !== null) {
          action.text = newText;
          action.lineWidth = this.selectedLineWidth;
          this.selectedTextIndex = i;
          this.redraw();
        }
        return;
      }
    }

    const text = prompt('Enter text:');
    if (text) {
      this.actions.push({
        type: 'text',
        x,
        y,
        text,
        color: this.selectedColor,
        lineWidth: this.selectedLineWidth
      });
      this.selectedTextIndex = this.actions.length - 1;
    }
  } else if (this.previewAction) {
    this.actions.push({ ...this.previewAction });
    this.undoStack.push(this.previewAction);
  }

  this.previewAction = null;
  this.redraw();
}


    private isTextClicked(action: any, x: number, y: number): boolean {
    this.ctx.font = `${action.lineWidth * 4}px Arial`;
    const metrics = this.ctx.measureText(action.text);
    const height = action.lineWidth * 4;
    return x >= action.x && 
           x <= action.x + metrics.width &&
           y >= action.y - height && 
           y <= action.y;
  }

  private redraw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);

    this.actions.forEach(action => this.drawAction(action));
    
    if (this.previewAction) {
      this.drawAction(this.previewAction);
    }
  }

  private drawAction(action: any) {
    this.ctx.strokeStyle = action.color;
    this.ctx.fillStyle = action.color;
    this.ctx.lineWidth = action.lineWidth;

    switch (action.type) {
      case 'rect':
        this.ctx.strokeRect(action.x, action.y, action.width, action.height);
        if (action.fill) {
          this.ctx.fillRect(action.x, action.y, action.width, action.height);
        }
        break;
      case 'oval':
        this.ctx.beginPath();
        this.ctx.ellipse(
          action.x + action.width/2,
          action.y + action.height/2,
          Math.abs(action.width)/2,
          Math.abs(action.height)/2,
          0, 0, 2 * Math.PI
        );
        action.fill ? this.ctx.fill() : this.ctx.stroke();
        break;
      case 'arrow':
        this.drawArrow(action.x, action.y, action.toX, action.toY);
        break;
      case 'text':
        this.ctx.font = `${action.lineWidth * 4}px Arial`;
        this.ctx.fillText(action.text, action.x, action.y);
        break;
    }
  }

  private drawArrow(fromX: number, fromY: number, toX: number, toY: number) {
    const headlen = 15;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.lineTo(
      toX - headlen * Math.cos(angle - Math.PI/6),
      toY - headlen * Math.sin(angle - Math.PI/6)
    );
    this.ctx.moveTo(toX, toY);
    this.ctx.lineTo(
      toX - headlen * Math.cos(angle + Math.PI/6),
      toY - headlen * Math.sin(angle + Math.PI/6)
    );
    this.ctx.stroke();
  }

  undo() {
    if (this.actions.length > 0) {
      this.redoStack.push(this.actions.pop());
      this.redraw();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.actions.push(this.redoStack.pop());
      this.redraw();
    }
  }

  setLineWidth(width: number) {
    this.selectedLineWidth = width;
    if (this.selectedTextIndex !== -1) {
      this.actions[this.selectedTextIndex].lineWidth = width;
      this.redraw();
    }
  }

  downloadImage() {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = this.canvasRef.nativeElement.toDataURL();
    link.click();
  }

  private getCanvasCoordinates(event: MouseEvent): { x: number; y: number } {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left +20,
      y: event.clientY - rect.top +20
    };
  }

}