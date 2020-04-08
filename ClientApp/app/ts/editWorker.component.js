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
import { SpecialHour } from './specialHour';
//import { NgbdModalStacked } from './modalWindow.component'
import * as moment from 'moment';
import { NgbdModalStacked } from './modalWindow.component';
var EditWorkerComponent = /** @class */ (function () {
    function EditWorkerComponent(dataService, modal) {
        this.dataService = dataService;
        this.modal = modal;
        this.currentWorker = new Worker();
        this.isDisableSettings = true;
        this.periods = [];
        this.groups = [];
        //groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }, { id: 4, name: "Сменники" }];
        this.absentPeriod = new AbsentPeriod();
        this.absentPeriods = [];
        this.dropdownList = [
            { item_id: 0, item_text: '08:00' },
            { item_id: 1, item_text: '09:00' },
            { item_id: 2, item_text: '10:00' },
            { item_id: 3, item_text: '11:00' },
            { item_id: 4, item_text: '12:00' },
            { item_id: 5, item_text: '13:00' },
            { item_id: 6, item_text: '14:00' },
            { item_id: 7, item_text: '15:00' },
            { item_id: 8, item_text: '16:00' },
            { item_id: 9, item_text: '17:00' },
            { item_id: 10, item_text: '18:00' },
            { item_id: 11, item_text: '19:00' }
        ];
        this.selectedDesirableSlots = [];
        this.selectedUnwantedSlots = [];
        this.specialHour = new SpecialHour();
        this.specialHours = [];
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
        var _this = this;
        this.loadWorkers();
        this.dataService.getGroups().subscribe(function (data) {
            return _this.groups = data;
        });
    };
    EditWorkerComponent.prototype.loadWorkers = function () {
        var _this = this;
        this.dataService.getData(this.dataService.urlWorker).subscribe(function (data) {
            _this.workers = data;
            _this.workers.sort(_this.compare);
            //console.log(this.workers)
        });
    };
    EditWorkerComponent.prototype.cancel = function () {
        this.currentWorker = new Worker();
        this.periods = [];
    };
    EditWorkerComponent.prototype.isAllInfoEntered = function () {
        return ((!this.currentWorker.color) || (!this.currentWorker.idGroup) || (!this.currentWorker.name)) ? false : true;
    };
    EditWorkerComponent.prototype.saveWorker = function () {
        var _this = this;
        var isErrorWhenSaving = true;
        if (!this.isAllInfoEntered()) {
            this.modal.open(isErrorWhenSaving);
            return;
        }
        isErrorWhenSaving = false;
        if (!this.currentWorker.id) {
            this.dataService.createWorker(this.currentWorker)
                .subscribe(function (data) {
                _this.workers.push(data);
            });
        }
        else {
            this.dataService.updateWorker(this.currentWorker)
                .subscribe(function (data) { return _this.loadWorkers(); });
        }
        if (this.absentPeriods.length > 0) {
            this.saveAbsentPeriod();
            this.loadAbsentPeriods(this.currentWorker);
        }
        this.modal.open(isErrorWhenSaving);
        //this.cancel();
        //this.periods = [];
    };
    EditWorkerComponent.prototype.saveAbsentPeriod = function () {
        var _this = this;
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
        this.absentPeriod.index = this.currentWorker.countAbsencePeriod;
        this.saveAbsentPeriod();
        this.loadAbsentPeriods(this.currentWorker);
        //this.absentPeriods.push(this.absentPeriod);
        console.log(this.absentPeriods);
        //this.saveAbsentPeriod();
    };
    EditWorkerComponent.prototype.deleteAbsencePeriod = function (period) {
        var _this = this;
        this.dataService.deleteAbsentPeriod(period.id).subscribe(function (data) { return _this.loadAbsentPeriods(_this.currentWorker); });
        console.log(this.absentPeriods);
        this.loadAbsentPeriods(this.currentWorker);
        this.currentWorker.countAbsencePeriod--;
    };
    EditWorkerComponent.prototype.showDate = function ($event) {
        this.absentPeriod.start = moment(new Date($event.fromDate.year, $event.fromDate.month - 1, $event.fromDate.day));
        if ($event.todate)
            this.absentPeriod.end = moment(new Date($event.todate.year, $event.todate.month - 1, $event.todate.day));
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
    };
    EditWorkerComponent.prototype.deleteWorker = function (id) {
        var _this = this;
        this.dataService.deleteWorker(id).subscribe(function (data) { return _this.loadWorkers(); });
        this.cancel();
    };
    EditWorkerComponent.prototype.onColorPickerSelected = function (event) {
        console.log(event);
    };
    EditWorkerComponent.prototype.updateDesirableSlots = function (selectedData) {
        var _this = this;
        console.log(selectedData);
        switch (selectedData.x) {
            case "select": {
                this.specialHour.type = true;
                this.specialHour.workerId = this.selectedWorkerId;
                this.specialHour.hourNumber = selectedData.data;
                this.dataService.createSpecialHour(this.specialHour)
                    .subscribe(function (data) { return _this.specialHours.push(data); });
                break;
            }
            case "unSelect": {
                this.dataService.deleteSpecialHour(selectedData.data.id).subscribe(function (data) { return console.log(data); });
            }
        }
    };
    EditWorkerComponent = __decorate([
        Component({
            templateUrl: '../html/editWorker.component.html',
            styleUrls: ['../css/editWorker.css'],
            providers: [DataService, NgbdModalStacked]
        }),
        __metadata("design:paramtypes", [DataService, NgbdModalStacked])
    ], EditWorkerComponent);
    return EditWorkerComponent;
}());
export { EditWorkerComponent };
//# sourceMappingURL=editWorker.component.js.map