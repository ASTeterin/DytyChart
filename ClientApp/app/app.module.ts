import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbdDatepicker } from './datepicker';
import { DutyChart } from './chart'
import { NgMultiselect } from './multiselect'
//import { NgbdTabset } from './tabset'
import { NgbdTabsetModule} from './tabset.module'


@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, NgMultiSelectDropDownModule.forRoot(), NgbdTabsetModule],
    declarations: [AppComponent, NgbdDatepicker, DutyChart, NgMultiselect],
    bootstrap: [AppComponent]
})
export class AppModule { }