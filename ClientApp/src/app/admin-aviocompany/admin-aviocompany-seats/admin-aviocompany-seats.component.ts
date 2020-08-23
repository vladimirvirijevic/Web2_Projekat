import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-aviocompany-seats',
  templateUrl: './admin-aviocompany-seats.component.html',
  styleUrls: ['./admin-aviocompany-seats.component.css']
})
export class AdminAviocompanySeatsComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  
  public ctx: CanvasRenderingContext2D;
   
  constructor() { }

  ngOnInit(): void {

   this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawAirPlane();
  }

  drawAirPlane()
  {
    //na 10*10 dimenzije
   this.ctx.moveTo(350,70);//5,1*70
   this.ctx.lineTo(280,210);//4,3*70
   this.ctx.moveTo(350,70);//5,1*70
   this.ctx.lineTo(420,210);//6,3*70
   this.ctx.moveTo(280,210);//4,3*70
   this.ctx.lineTo(0,420);//0,6*70
   this.ctx.moveTo(420,210);//6,3*70
   this.ctx.lineTo(700,420);//10,6*70
   this.ctx.moveTo(0,420);//0,6*70
   this.ctx.lineTo(245,350);//3.5,5*70
   this.ctx.moveTo(700,420);//10,6*70
   this.ctx.lineTo(455,350);//6.5,5*70
   this.ctx.moveTo(245,350);//3.5,5*70
   this.ctx.lineTo(245,630);//3.5,9*70
   this.ctx.moveTo(455,350);//6.5,5*70
   this.ctx.lineTo(455,630);//6.5,9*70
   this.ctx.moveTo(245,630);//3.5,9*70
   this.ctx.lineTo(140,700);//2,10*70
   this.ctx.moveTo(140,700);//2,10*70
   this.ctx.lineTo(350,630);//5,9*70
   this.ctx.moveTo(455,630);//6.5,9*70
   this.ctx.lineTo(560,700);//8,10*70
   this.ctx.moveTo(560,700);//8,10*70
   this.ctx.lineTo(350,630);//5,9*70
   this.ctx.stroke();




  }
}
