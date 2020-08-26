import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 
  selector: 'app-admin-aviocompany-seats',
  templateUrl: './admin-aviocompany-seats.component.html',
  styleUrls: ['./admin-aviocompany-seats.component.css']
})

export class AdminAviocompanySeatsComponent implements OnInit {
    
  //buttoni na sedistima
  public clickedButton1:Boolean=false;
  public numberOfSeat:Number;
  public clickedButton2:Boolean=false;
  public clickedButton3:Boolean=false;
  public clickedButton4:Boolean=false;
  public clickedButton5:Boolean=false;
  public clickedButton6:Boolean=false;
  public clickedButton7:Boolean=false;
  public clickedButton8:Boolean=false;
  public clickedButton9:Boolean=false;
  public clickedButton10:Boolean=false;
  public clickedButton11:Boolean=false;
  public clickedButton12:Boolean=false;
  public clickedButton13:Boolean=false;
  public clickedButton14:Boolean=false;
  public clickedButton15:Boolean=false;
 
  //id leta iz rute
  public flightId:number;
 
  //canvas
  @ViewChild('canvas', { static: true })
  
  canvas: ElementRef<HTMLCanvasElement>;  
  public ctx: CanvasRenderingContext2D;
   
  constructor(
    private route: ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {

   this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawAirPlane();
    this.flightId=Number(this.route.snapshot.paramMap.get("id"));
    console.log(this.flightId);
  }
//iscrtavanje aviona po canvasu
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
//kada su buttoni kliknuti
  ClickedButton1()
  {
    this.clickedButton1=true;
    this.numberOfSeat=1;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton2()
  {
    this.clickedButton2=true;
    this.numberOfSeat=2;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton3()
  {
    this.clickedButton3=true;
    this.numberOfSeat=3;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton4()
  {
    this.clickedButton4=true;
    this.numberOfSeat=4;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton5()
  {
    this.clickedButton5=true;
    this.numberOfSeat=5;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton6()
  {
    this.clickedButton6=true;
    this.numberOfSeat=6;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton7()
  {
    this.clickedButton7=true;
    this.numberOfSeat=7;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton8()
  {
    this.clickedButton8=true;
    this.numberOfSeat=8;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton9()
  {
    this.clickedButton9=true;
    this.numberOfSeat=9;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton10()
  {
    this.clickedButton10=true;
    this.numberOfSeat=10;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton11()
  {
    this.clickedButton11=true;
    this.numberOfSeat=11;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton12()
  {
    this.clickedButton12=true;
    this.numberOfSeat=12;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton13()
  {
    this.clickedButton13=true;
    this.numberOfSeat=13;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton14()
  {
    this.clickedButton14=true;
    this.numberOfSeat=14;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }
  ClickedButton15()
  {
    this.clickedButton15=true;
    this.numberOfSeat=15;
    this.router.navigate([`/seat/${this.flightId}/${this.numberOfSeat}`]);
  }

}
