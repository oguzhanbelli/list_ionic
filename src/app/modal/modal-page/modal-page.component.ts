import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
public ad:string;
public soyad:string;
public username:string;
public password:string;
public sonuc:any;
public userData:any=[];
  constructor(public route:Router, public modalController: ModalController,public toastController: ToastController,private http:HttpClient) { }

  ngOnInit() {}

userSave(){
  console.log("Ad:"+this.ad);
  let body = {serviceName:'singUp',ad:this.ad,soyad:this.soyad,email:this.username,sifre:this.password}
  this.http.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
   
        if(data==0){
          this.presentToast('danger','Kayitli user');

        }else{
          console.log("Kayit oldu");
          this.sonuc = data[0];
          this.presentToast('dark','Kayit oldun');
          localStorage.setItem('userJSON',JSON.stringify(data[0]));
         // this.userData = JSON.parse(localStorage.getItem('userJSON'));
          //let veri:12;
         // this.route.navigate(['home',veri]);
         console.log("222222");
         this.dismiss();
         console.log("3333");
        }

  },hata=>{
    console.log("Hata var");
  })
 
}


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }



  async presentToast(renk,mesaj) {
    const toast = await this.toastController.create({
      message: mesaj,
      color:renk,
      position:'top',
      duration: 2000
    });
    toast.present();
  }

  


}
