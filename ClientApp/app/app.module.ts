import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbdDatepickerBasic } from './datepicker-basic';
import { DutyChart } from './chart'
import { NgMultiselect } from './multiselect'


@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, NgMultiSelectDropDownModule.forRoot()],
    declarations: [AppComponent, NgbdDatepickerBasic, DutyChart, NgMultiselect],
    bootstrap: [AppComponent]
})
export class AppModule { }