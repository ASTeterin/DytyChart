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
import { Worker } from './worker';
import { AbsentPeriod } from './absentPeriod';
var EditWorkerComponent = /** @class */ (function () {
    function EditWorkerComponent(dataService) {
        this.dataService = dataService;
        this.currentWorker = new Worker();
        this.isDisableSettings = true;
        this.periods = [];
        this.groups = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];
        this.absentPeriod = new AbsentPeriod();
    }
    EditWorkerComponent.prototype.createArray = function (countElement) {
        var arr = [];
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    };
    EditWorkerComponent.prototype.compare = function (a, b) {
        if (a.name > b.name)
            return 1; // если первое значение больше второго
        if (a.name == b.name)
            return 0; // если равны
        if (a.name < b.name)
            return -1; // если первое значение меньше второго
    };
    EditWorkerComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
        this.fromDate.day = 14;
        this.fromDate.month = 2;
        this.fromDate.year = 2020;
        //this.loadAbsentPeriods();
        //this.workers.sort();
        //this.currentWorker = this.workers[0];
        //console.log(this.currentWorker);
    };
    EditWorkerComponent.prototype.loadWorkers = function () {
        var _this = this;
        this.dataService.getData(this.dataService.url).subscribe(function (data) {
            _this.workers = data;
            _this.workers.sort(_this.compare);
            //console.log(this.workers)
        });
    };
    EditWorkerComponent.prototype.cancel = function () {
        this.currentWorker = new Worker();
        this.periods = [];
    };
    EditWorkerComponent.prototype.saveWorker = function () {
        var _this = this;
        console.log(this.currentWorker);
        if (!this.currentWorker.id) {
            this.dataService.createWorker(this.currentWorker)
                .subscribe(function (data) { return _this.workers.push(data); });
        }
        else {
            this.dataService.updateWorker(this.currentWorker)
                .subscribe(function (data) { return _this.loadWorkers(); });
        }
        this.saveAbsentPeriod();
        this.loadAbsentPeriods(this.currentWorker);
        //this.cancel();
        //this.periods = [];
    };
    EditWorkerComponent.prototype.saveAbsentPeriod = function () {
        var _this = this;
        console.log(this.absentPeriod);
        if (!this.absentPeriod.id) {
            this.dataService.createAbsentPeriod(this.absentPeriod)
                .subscribe(function (data) { return _this.absentPeriods.push(data); });
        }
        else {
            this.dataService.updateAbsentPeriod(this.absentPeriod)
                .subscribe(function (data) { return _this.loadAbsentPeriods(_this.currentWorker); });
        }
    };
    EditWorkerComponent.prototype.createNewWorker = function () {
        this.isDisableSettings = false;
        this.cancel();
        this.currentWorker.countAbsencePeriod = 0;
    };
    EditWorkerComponent.prototype.addAbsencePeriod = function () {
        this.currentWorker.countAbsencePeriod++;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        this.absentPeriod.WorkerId = this.selectedWorkerId;
        this.absentPeriods.push(this.absentPeriod);
        //this.saveAbsentPeriod();
        console.log(this.periods);
        console.log(this.absentPeriod);
        //this.absentPeriod.start = 
    };
    EditWorkerComponent.prototype.deleteAbsencePeriod = function () {
        this.currentWorker.countAbsencePeriod--;
        console.log(this.periods);
        //this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        //this.absentPeriod.start = 
    };
    EditWorkerComponent.prototype.showDate = function ($event) {
        this.absentPeriod.start = new Date($event.fromDate.year, $event.fromDate.month - 1, $event.fromDate.day, 0, 0, 0, 0);
        if ($event.todate)
            this.absentPeriod.end = new Date($event.todate.year, $event.todate.month - 1, $event.todate.day, 0, 0, 0, 0);
        console.log(this.absentPeriod);
        console.log($event);
    };
    EditWorkerComponent.prototype.loadAbsentPeriods = function (worker) {
        var _this = this;
        this.dataService.getAbsentPeriodsForWorker(worker.id).subscribe(function (data) { return _this.absentPeriods = data; });
    };
    EditWorkerComponent.prototype.loadAllAbsentPeriods = function () {
        var _this = this;
        this.dataService.getAbsentPeriods().subscribe(function (data) { return _this.absentPeriods = data; });
    };
    EditWorkerComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.cancel();
        this.currentWorker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        this.isDisableSettings = false;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        this.loadAbsentPeriods(this.currentWorker);
        console.log(this.absentPeriods);
        console.log(this.currentWorker);
    };
    EditWorkerComponent.prototype.deleteWorker = function (id) {
        var _this = this;
        this.dataService.deleteWorker(id).subscribe(function (data) { return _this.loadWorkers(); });
        this.cancel();
    };
    EditWorkerComponent.prototype.onColorPickerSelected = function (event) {
        console.log(event);
    };
    EditWorkerComponent = __decorate([
        Component({
            templateUrl: '../html/editWorker.component.html',
            styles: [" \n            .worker_item {  margin-top: 5px;\n                            font-size: 20px; }\n    "],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], EditWorkerComponent);
    return EditWorkerComponent;
}());
export { EditWorkerComponent };
//# sourceMappingURL=editWorker.component.js.map