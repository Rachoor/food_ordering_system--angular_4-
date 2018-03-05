import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ResturantComponent } from './resturant/resturant.component';
import { AppService } from './app.service';
import { MenuComponent } from './menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { FormComponent } from './form/form.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated/';
import { environment } from '../environments/environment';
import { AddResturantComponent } from './add-resturant/add-resturant.component';
import { AddMenuComponent } from './add-menu/add-menu.component';

var config = {
  apiKey: "AIzaSyBdtYlaHYNjxqrWz_ckQXW8e9G7_o0rEcM",
  authDomain: "order-da4b9.firebaseapp.com",
  databaseURL: "https://order-da4b9.firebaseio.com",
  projectId: "order-da4b9",
  storageBucket: "order-da4b9.appspot.com",
  messagingSenderId: "486609275362"
};

const appRoutes: Routes =[
  { path: '', component: ResturantComponent },
  { path: 'add-resturant', component:AddResturantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'cart', component: CartComponent},
  { path: 'form', component: FormComponent},
  { path: 'add-menu', component: AddMenuComponent}
];


@NgModule({ 
  declarations: [
    AppComponent,
    ResturantComponent,
    MenuComponent,
    CartComponent,
    FormComponent,
    AddResturantComponent,
    AddMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
