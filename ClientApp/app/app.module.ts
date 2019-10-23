import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

//import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NgbdDatepickerBasic } from './datapicker-basic';
import { DutyChart } from './chart'
//import { MultipleMaterialSelectComponent } from './multiselect'

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, MultiselectDropdownModule/*, AngularMultiSelectModule MDBBootstrapModule.forRoot()*/],
    declarations: [AppComponent, NgbdDatepickerBasic, DutyChart/*, MultipleMaterialSelectComponent*/],
    bootstrap: [AppComponent]
})
export class AppModule { }