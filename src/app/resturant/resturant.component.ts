import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-resturant',
  templateUrl: './resturant.component.html',
  styleUrls: ['./resturant.component.css']
})
export class ResturantComponent implements OnInit {
  resturants: FirebaseListObservable<any[]>;
  constructor(private router: Router,
    public db: AngularFireDatabase, ) {
    
    this.resturants = db.list('/resturant');
  }

  ngOnInit() {
    //this.resturants = this.appService.getAll();
    //console.log(this.appService.getAll());
  }

  addResturant() {
    this.router.navigate(['add-resturant']);
  }

  addMenu() {
    this.router.navigate(['add-menu']);
  }

  showMenu(id){
    this.router.navigate(['menu', id]);
    //console.log(id);
  }


}
