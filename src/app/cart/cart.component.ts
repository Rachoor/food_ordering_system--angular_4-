import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {
  cart: FirebaseListObservable<any[]>;
  totalCartBill;

  constructor(public db: AngularFireDatabase,
              private cartService: CartService,
              private router: Router) { 
      this.cart = db.list('/cart');
    }

  ngOnInit() {
    // this.cart = this.cartService.getCart();
    this.totalCartBill = this.cartService.totalBill();
  }

  menu() {
    this.router.navigate([''])
  }

  addToCart(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice) {
    this.cart.push({
      resturantId: resturantId,
      resturantName: resturantName,
      dishes: [{
          dishId: dishId,
          dishName: dishName,
          dishPrice: dishPrice,
          dishQuantity: dishQuantity
      }]
    });
    // this.cartService.addItem(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice);
    // this.totalCartBill = this.cartService.totalBill();
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
