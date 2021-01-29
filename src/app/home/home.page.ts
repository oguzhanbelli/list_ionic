import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ModalPageComponent } from '../modal/modal-page/modal-page.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
public userData:any=[];
public username:string;
public password:string;
public sifreUnutma:boolean;
public noAl:any;
public depremler:any;
  constructor(public router:Router, public toastController: ToastController,private http:HttpClient,public modalController: ModalController,private activatedRoute: ActivatedRoute) {
    console.log("Merhaba");
    let uData = JSON.parse(localStorage.getItem('userJSON'));
    if(uData){
      console.log("xxxx");
      this.userData = JSON.parse(localStorage.getItem('userJSON'));
      console.log('JSON'+this.userData.id );
    }
  
    ///Verileri Anasayfayi doldurmak için çek
    this.http.get('https://deprem.odabas.xyz/api/pure_api.php').subscribe(data=>{
      this.depremler = data;
    })

  }


// Login Fonksiyon

login(){

  console.log("UserName:"+this.username);
  console.log("Password:"+this.password);
  let body = {serviceName:'login',email:this.username,sifre:this.password}
  this.http.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
    
    if(data==0){
        console.log("Hata");
        this.presentToast('danger','Yanlış Bilgi Tekrar Dene..');
      }else{
        this.userData = data[0];
        localStorage.setItem('userJSON',JSON.stringify(this.userData));
        this.presentToast('success','Hoşgeldin...'+this.userData.ad+" "+this.userData.soyad);
      }
      

  })


}

cikis(){
  localStorage.clear();
  this.userData = [];
}

/// Uyarı Mesaj

async presentToast(renk,mesaj) {
  const toast = await this.toastController.create({
    message: mesaj,
    color:renk,
    position:'top',
    duration: 2000
  });
  toast.present();
}


//Modal Aç
async userModal() {
  const modal = await this.modalController.create({
    component: ModalPageComponent,
    cssClass: 'my-custom-class'
  });

  modal.onDidDismiss().then(data=>{
    console.log("11111");
   this.userData = JSON.parse(localStorage.getItem('userJSON'));
    //console.log(data.data.veri);
    console.log("Modal Kapatildi");
  })
  return await modal.present();
}




/// şifremi unuttum
sifremiUnuttum(status,email){

  console.log(status);
  if(status=='true'){
    this.sifreUnutma=true;

    if(email){
      this.sifreUnutma=false;
      console.log("şifre gönderme....");
      let body = {serviceName:'password',email:email}
      this.http.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
        console.log(data);
      })
      this.presentToast('success','mail gönderildi');
    }


  }else{
    console.log("buradayim");
    this.sifreUnutma=false;
 
  }
 

 
}

/// Detay sayfası yönlendirme;

detayAc(veri){
  console.log(veri);
  this.router.navigate(['detay',JSON.stringify(veri)]);
}


}
