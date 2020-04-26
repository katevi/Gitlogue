import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    // -- Usage of two-way data binding.
    FormsModule,
    // -- REST calls
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
