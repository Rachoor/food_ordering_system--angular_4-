import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html',
  styleUrls: ['./add-resturant.component.css']
})
export class AddResturantComponent implements OnInit {

  resturants: FirebaseListObservable<any[]>;
  cusines = [''];
  constructor(public db: AngularFireDatabase,
              private router: Router) {
    this.resturants = db.list('/resturant');
  }

  ngOnInit() {
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  addResturant(name, detail, cusines, picture) {
    this.resturants.push({
      id: this.guid(),
      name: name,
      detail: detail,
      cusines: cusines,
      picture: picture
    });
  }

  addCusine() {
    this.cusines.push('');
  }

  removeCusine() {
    this.cusines.pop();
  }

  resturantsList(){
    this.router.navigate(['']);
  }
}
