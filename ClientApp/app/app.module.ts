import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
//import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { NgbdDatepickerBasic } from './datepicker-basic';
import { DutyChart } from './chart'


@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, NgMultiSelectDropDownModule.forRoot()],
    declarations: [AppComponent, NgbdDatepickerBasic, DutyChart],
    bootstrap: [AppComponent]
})
export class AppModule { }