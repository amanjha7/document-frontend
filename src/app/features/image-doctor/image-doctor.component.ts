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
  styleUrls: ['./image-doctor.component.scss'],
})
export class ImageDoctorComponent implements AfterViewInit {
  @ViewChild('imageCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  selectedTool: string = '';
  selectedColor: string = '#ff0000';
  imageLoaded = false;
  private image = new Image();

  private startX = 0;
  private startY = 0;
  private drawing = false;

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

          // Resize canvas to match image dimensions
          canvas.width = this.image.width;
          canvas.height = this.image.height;

          this.ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
          this.imageLoaded = true;
        };
      };
      reader.readAsDataURL(file);
    }
  }

  setTool(tool: string) {
    this.selectedTool = tool;
  }

  onMouseDown(event: MouseEvent) {
    if (!this.imageLoaded) return;
    this.startX = event.offsetX;
    this.startY = event.offsetY;
    this.drawing = true;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.drawing || !this.imageLoaded) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = this.selectedColor;
    ctx.fillStyle = this.selectedColor;
    ctx.lineWidth = 3;

    switch (this.selectedTool) {
      case 'rect':
        ctx.strokeRect(this.startX, this.startY, currentX - this.startX, currentY - this.startY);
        break;
      case 'oval':
        ctx.beginPath();
        ctx.ellipse(
          (this.startX + currentX) / 2,
          (this.startY + currentY) / 2,
          Math.abs(currentX - this.startX) / 2,
          Math.abs(currentY - this.startY) / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        break;
      case 'arrow':
        this.drawArrow(this.startX, this.startY, currentX, currentY);
        break;
      case 'blur':
        ctx.filter = 'blur(4px)';
        ctx.fillRect(this.startX, this.startY, currentX - this.startX, currentY - this.startY);
        ctx.filter = 'none';
        break;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (!this.imageLoaded) return;
    this.drawing = false;

    const x = event.offsetX;
    const y = event.offsetY;

    if (this.selectedTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        this.ctx.fillStyle = this.selectedColor;
        this.ctx.font = '20px Arial';
        this.ctx.fillText(text, x, y);
      }
    }
  }

  drawArrow(fromX: number, fromY: number, toX: number, toY: number) {
    const ctx = this.ctx;
    const headlen = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  downloadImage() {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = this.canvasRef.nativeElement.toDataURL('image/png');
    link.click();
  }
}
