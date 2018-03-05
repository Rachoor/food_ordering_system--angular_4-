import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as _ from "lodash";


@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  resturants;
  info;
  allMenusArray = [];
  allMenus = {};
  menus: FirebaseListObservable<any[]>;
  dishes = [{ dishId: this.guid(), dishName: '', dishPrice: '', dishImage: '' }];

  constructor(public db: AngularFireDatabase,
    private router: Router) {
    let self = this;
    this.menus = db.list('/menus');
    this.resturants = db.list('/resturant');
    this.info = firebase.database().ref('/menus').on('value', function (snapshot) {
      self.allMenus = snapshot.val();
      for(var id in self.allMenus){
        self.allMenus[id]['menuId'] = id;
        self.allMenusArray.push(self.allMenus[id])
      }
      //console.log(snapshot.val());
    });
    // let a = _.find(this.allMenus, function(o) { return o; });
    // console.log(a);
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

  getMenu(resturantInfo) {
    for (var id in this.allMenus) {
      if (resturantInfo.id == this.allMenus[id].resturantId) {
        this.dishes = this.allMenus[id].dishes
        console.log(this.allMenus[id]);
      }
      //console.log(this.allMenus[id]);

    }
  }
  
  addMenu(resturantId, resturantName, dishes) {
    console.log(this.allMenusArray);
    let a = _.findIndex(this.allMenusArray, ['resturantId', resturantId]);
    console.log(a);
    if(a > -1){
      this.menus.update('/'+this.allMenusArray[a].menuId ,{
                  resturantId: resturantId,
                  resturantName: resturantName,
                  dishes: this.dishes
                });
    }else{
      this.menus.push({
                  resturantId: resturantId,
                  resturantName: resturantName,
                  dishes: this.dishes
                });
    }
//     for (var id in this.allMenus) {
//       if (resturantId == this.allMenus[id].resturantId) {
//         this.menus.update('/'+id ,{
//           resturantId: resturantId,
//           resturantName: resturantName,
//           dishes: this.dishes
//         });
//       } else {
//         this.menus.push({
//           resturantId: resturantId,
//           resturantName: resturantName,
//           dishes: this.dishes
//         });
//       }
//   }
}

  addDish() {
    this.dishes.push({
      dishId: this.guid(),
      dishName: '',
      dishPrice: '',
      dishImage: ''
    });
  }

  removeDish(){
    this.dishes.pop();
  }

  resturantsList() {
    this.router.navigate(['']);
  }
}
