import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from '../models/Seat';
import { AirlineAdminService } from '../services/airline-admin.service';

@Component({
  selector: 'app-reserve-flight',
  templateUrl: './reserve-flight.component.html',
  styleUrls: ['./reserve-flight.component.css']
})
export class ReserveFlightComponent implements OnInit {

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
    //promenljive za labele
    public sediste1:string="Unreserved";
    public sediste2:string="Unreserved";
    public sediste3:string="Unreserved";
    public sediste4:string="Unreserved";
    public sediste5:string="Unreserved";
    public sediste6:string="Unreserved";
    public sediste7:string="Unreserved";
    public sediste8:string="Unreserved";
    public sediste9:string="Unreserved";
    public sediste10:string="Unreserved";
    public sediste11:string="Unreserved";
    public sediste12:string="Unreserved";
    public sediste13:string="Unreserved";
    public sediste14:string="Unreserved";
    public sediste15:string="Unreserved";
   //id leta iz rute
  public flightId:number;
   //podaci o sedistima 
    public sedista:Seat[];

  //canvas
  @ViewChild('canvas', { static: true })
  
  canvas: ElementRef<HTMLCanvasElement>;  
  public ctx: CanvasRenderingContext2D;

  constructor(
    private route: ActivatedRoute,
    public router:Router,
    public adminAirlineService:AirlineAdminService
  ) { }

  ngOnInit(): void {
    
   this.ctx = this.canvas.nativeElement.getContext('2d');
   this.drawAirPlane();
   this.flightId=Number(this.route.snapshot.paramMap.get("id"));
   console.log(this.flightId);
   this.getSeats();
   
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
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
   
}
ClickedButton2()
{
  this.clickedButton2=true;
  this.numberOfSeat=2;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
 
}
ClickedButton3()
{
  this.clickedButton3=true;
  this.numberOfSeat=3;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
 
 
}
ClickedButton4()
{
  this.clickedButton4=true;
  this.numberOfSeat=4;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
  
}
ClickedButton5()
{
  this.clickedButton5=true;
  this.numberOfSeat=5;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
  
}
ClickedButton6()
{
  this.clickedButton6=true;
  this.numberOfSeat=6;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
  
}
ClickedButton7()
{
  this.clickedButton7=true;
  this.numberOfSeat=7;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
}
ClickedButton8()
{
  this.clickedButton8=true;
  this.numberOfSeat=8;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
  
}
ClickedButton9()
{
  this.clickedButton9=true;
  this.numberOfSeat=9;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
 
}
ClickedButton10()
{
  this.clickedButton10=true;
  this.numberOfSeat=10;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
}
ClickedButton11()
{
  this.clickedButton11=true;
  this.numberOfSeat=11;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
 
}
ClickedButton12()
{
  this.clickedButton12=true;
  this.numberOfSeat=12;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
 
}
ClickedButton13()
{
  this.clickedButton13=true;
  this.numberOfSeat=13;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
  
}
ClickedButton14()
{
  this.clickedButton14=true;
  this.numberOfSeat=14;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
  
}
ClickedButton15()
{
  this.clickedButton15=true;
  this.numberOfSeat=15;
  this.router.navigate([`/app/userReserves/${this.flightId}/${this.numberOfSeat}`]);
 
}

getSeats()
{
    this.adminAirlineService.getSeats(this.flightId).subscribe
    (
      data=>
      {
       this.sedista=data;
       console.log(data);
       this.popuniLabeleSedista();
      },
      err=>
      {
       console.log("ne radi");
      }
    );
}
//labele sedista se popunjavaju sa reserved onda kada postanu rezervisana
popuniLabeleSedista()
{
  
  this.sedista.forEach(element => {
    if(element.numberOfSeat==1)
    {
      if(element.isItReserved)
      {
        this.sediste1="Reserved";
      }
    }
    else if(element.numberOfSeat==2)
    {
      if(element.isItReserved)
      {
        this.sediste2="Reserved";
      }
    }
    else if(element.numberOfSeat==3)
    {
      if(element.isItReserved)
      {
        this.sediste3="Reserved";
      }
    }
    else if(element.numberOfSeat==4)
    {
      if(element.isItReserved)
      {
        this.sediste4="Reserved";
      }
    }
    else if(element.numberOfSeat==5)
    {
      if(element.isItReserved)
      {
        this.sediste5="Reserved";
      }
    }
    else if(element.numberOfSeat==6)
    {
      if(element.isItReserved)
      {
        this.sediste6="Reserved";
      }
    }
    if(element.numberOfSeat==7)
    {
      if(element.isItReserved)
      {
        this.sediste7="Reserved";
      }
    }
    else if(element.numberOfSeat==8)
    {
      if(element.isItReserved)
      {
        this.sediste8="Reserved";
      }
    }
    else if(element.numberOfSeat==9)
    {
      if(element.isItReserved)
      {
        this.sediste9="Reserved";
      }
    }
    else if(element.numberOfSeat==10)
    {
      if(element.isItReserved)
      {
        this.sediste10="Reserved";
      }
    }
    else if(element.numberOfSeat==11)
    {
      if(element.isItReserved)
      {
        this.sediste11="Reserved";
      }
    }
    else if(element.numberOfSeat==12)
    {
      if(element.isItReserved)
      {
        this.sediste12="Reserved";
      }
    }
    else if(element.numberOfSeat==13)
    {
      if(element.isItReserved)
      {
        this.sediste13="Reserved";
      }
    }
    else if(element.numberOfSeat==14)
    {
      if(element.isItReserved)
      {
        this.sediste14="Reserved";
      }
    }
    else if(element.numberOfSeat==15)
    {
      if(element.isItReserved)
      {
        this.sediste15="Reserved";
      }
    }
  });
}

}
