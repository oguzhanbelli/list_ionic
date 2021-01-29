import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detay',
  templateUrl: './detay.page.html',
  styleUrls: ['./detay.page.scss'],
})
export class DetayPage implements OnInit {
public gelgel:any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.gelgel = JSON.parse(this.activatedRoute.snapshot.paramMap.get('dataAl'));
    console.log(this.gelgel);
  }

}
