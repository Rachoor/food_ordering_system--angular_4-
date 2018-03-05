import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService, CartService]
})
export class MenuComponent implements OnInit {

  id;
  private sub;
  menus;
  allMenus;
  menu;
  mcart;
  scart: FirebaseListObservable<any[]>;
  totalCartBill;
  
  constructor(private router: ActivatedRoute,
    private router1: Router,
    public db: AngularFireDatabase,
    private cartService: CartService
  ) {
    let self = this;
    this.menus = firebase.database().ref('/menus').on('value', function (snapshot) {
      self.allMenus = snapshot.val();
      //console.log(self.allMenus);
    });
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
    });
    this.scart = db.list('/cart');
    //this.menus = db.list('/menus');
    //console.log(this.menus);
  }
  ngOnInit() {
    this.getMenu(this.id);
    this.mcart = this.cartService.getCart();
    // this.rName = this.appService.getResturantByResturantId(this.id);
    // //console.log(this.rName);
    this.totalCartBill = this.cartService.totalBill();
  }

  getMenu(resturantId) {
    for (var id in this.allMenus) {
      if (resturantId == this.allMenus[id].resturantId) {
        this.menu = this.allMenus[id];
        //console.log(this.allMenus[id]);
      }
    }
  }

  back() {
    this.router1.navigate(['/'])
  }

  cart() {
    this.router1.navigate(['cart'])
  }

  checkOut() {
    this.mcart['TotalBill'] = this.totalCartBill;
    this.scart.push(
     this.mcart
       
    );
    this.mcart = [];
    this.totalCartBill = 0;
    localStorage.setItem('cart', JSON.stringify(this.mcart));
    //this.router1.navigate(['form'])
  }

  addToCart(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice) {
      this.cartService.addItem(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice);
      this.totalCartBill = this.cartService.totalBill();
      //console.log(dishQuantity);
    }
  increase(resturantId, dishId) {
    this.cartService.increaseQty(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(resturantId, dishId);
  }
  decrease(resturantId, dishId) {
    this.cartService.decreaseQty(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
  }

  removeDishFromCart(resturantId, dishId) {
    this.cartService.removeItem(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
  }

  removeResturantFromCart(resturantId) {
    this.cartService.removeResturant(resturantId);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(resturantId);
  }

}
