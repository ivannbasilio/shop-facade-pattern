import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/products/view/product/product.component';
import { CartComponent } from './components/cart/view/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './ui/toolbar/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from './ui/popup/pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    ToolbarComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
