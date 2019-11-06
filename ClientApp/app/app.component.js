var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './Worker';
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.worker = new Worker();
        this.tableMode = true;
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.timeArr = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        //this.datepicker = new NgbdDatepicker(this.calendar);
        //this.today = calendar.getToday();
        //this.date = this.datepicker.model;
        //this.day = this.date.day;
        //this.month = this.date.month;
    }
    AppComponent.prototype.dateChangeHandler = function (date) {
        this.day = date.day;
        this.month = date.month;
        console.log(date);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
    };
    AppComponent.prototype.generateTextInfo = function () {
    };
    AppComponent.prototype.save = function () {
        var _this = this;
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(function (data) { return _this.loadWorkers(); });
    };
    AppComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    AppComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        //this.currenStaffIsDutyCheck = this.worker.isDuty;
        //console.log(this.worker);
        //console.log(this.currenStaffIsDutyCheck);
        //this.date = this.datepicker.model;
        //console.log(this.date);
    };
    AppComponent.prototype.loadWorkers = function () {
        var _this = this;
        //this.workers = this.dataService.getWorkers();
        console.log('1');
        this.dataService.getWorker()
            .subscribe(function (data) { return _this.workers = data; });
        //this.selectedWorker = this.workers[1];
    };
    AppComponent.prototype.generateGraph = function () {
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            //styleUrls: ['./app.component.css'],
            styles: [" \n            .form-group {width: 100%;\n    "],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map