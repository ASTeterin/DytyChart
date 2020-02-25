import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { GenerateChartComponent } from './generateChart.component';
import { EditWorkerComponent } from './editWorker.component';
import { EditGroupComponent } from './editGroup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbdDatepicker } from './datepicker.component';
import { ChartComponent } from './chart.component';
import { NavComponent } from './nav.component';
import { NgMultiselect } from './multiselect.component';
import { NgbdTabsetModule } from './tabset.module';
import { NgbdDatepickerRangePopup } from './rangeSelectionDatepicker';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSpinnerModule } from "ngx-spinner";


const appRoutes: Routes = [
    { path: '', component: GenerateChartComponent },
    { path: 'editUser', component: EditWorkerComponent },
    { path: 'editGroup', component: EditGroupComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NgbModule, NgMultiSelectDropDownModule.forRoot(), NgbdTabsetModule, RouterModule.forRoot(appRoutes), MDBBootstrapModule.forRoot(), ColorPickerModule, NgxSpinnerModule],
    declarations: [AppComponent, NgbdDatepicker, ChartComponent, NgMultiselect, GenerateChartComponent, EditWorkerComponent, EditGroupComponent, NgbdDatepickerRangePopup, NavComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }