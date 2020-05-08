var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { GenerateChartComponent } from './generateChart.component';
import { EditWorkerComponent } from './editWorker.component';
import { EditGroupComponent } from './editGroup.component';
import { EditDefaultSlotsComponent } from './editDefaultSlots.component';
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
import { NgbdModalStackedModule } from './modalWindow.module';
var appRoutes = [
    { path: '', component: GenerateChartComponent },
    { path: 'editUser', component: EditWorkerComponent },
    { path: 'editGroup', component: EditGroupComponent },
    { path: 'editDefaultSlots', component: EditDefaultSlotsComponent },
    { path: '**', redirectTo: '/' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NgbModule, NgbdModalStackedModule, NgMultiSelectDropDownModule.forRoot(), NgbdTabsetModule, RouterModule.forRoot(appRoutes), MDBBootstrapModule.forRoot(), ColorPickerModule, NgxSpinnerModule],
            declarations: [AppComponent, NgbdDatepicker, ChartComponent, NgMultiselect, GenerateChartComponent, EditWorkerComponent, EditDefaultSlotsComponent, EditGroupComponent, NgbdDatepickerRangePopup, NavComponent],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map