import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { GenerateChartComponent } from './generateChart.component';
import { EditWorkerComponent } from './editWorker.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbdDatepicker } from './datepicker';
import { DutyChart } from './chart';
import { NavComponent } from './nav';
import { NgMultiselect } from './multiselect';
import { NgbdTabsetModule } from './tabset.module';
import { NgbdDatepickerRangePopup } from './rangeSelectionDatepicker';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { ColorPickerModule } from 'angular2-color-picker';
import { ColorPickerModule } from 'ngx-color-picker';


const appRoutes: Routes = [
    { path: '', component: GenerateChartComponent },
    { path: 'editUser', component: EditWorkerComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, NgMultiSelectDropDownModule.forRoot(), NgbdTabsetModule, RouterModule.forRoot(appRoutes), MDBBootstrapModule.forRoot(), ColorPickerModule],
    declarations: [AppComponent, NgbdDatepicker, DutyChart, NgMultiselect, GenerateChartComponent, EditWorkerComponent, NgbdDatepickerRangePopup, NavComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }