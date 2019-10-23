var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { DutyChart } from './chart';
//import { MultipleMaterialSelectComponent } from './multiselect'
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, MultiselectDropdownModule, DutyChart /*, AngularMultiSelectModule MDBBootstrapModule.forRoot()*/],
            declarations: [AppComponent, NgbdDatepickerBasic /*, MultipleMaterialSelectComponent*/],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map