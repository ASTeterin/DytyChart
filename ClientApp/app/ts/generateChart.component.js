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
import { WorkerInDay } from './WorkerInDay';
import { Hour } from './hour';
import { Slot } from './slot';
import { tsXLXS } from 'ts-xlsx-export';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
var GenerateChartComponent = /** @class */ (function () {
    function GenerateChartComponent(dataService, spinner) {
        this.dataService = dataService;
        this.spinner = spinner;
        this.worker = new Worker();
        this.workerInDay = new WorkerInDay();
        this.workersInDay = [];
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.groups = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }, { id: 4, name: "Сменники" }];
        this.isFirstHour = true;
        this.isNewDay = true;
        this.isDisableSettings = true;
        this.isReplacementWorker = false;
        this.isPlanningToday = false;
        this.palanningDay = 3;
        this.firstHour = "08:00";
        this.timeArr = [
            { time: "08:00" },
            { time: "09:00" },
            { time: "10:00" },
            { time: "11:00" },
            { time: "12:00" },
            { time: "13:00" },
            { time: "14:00" },
            { time: "15:00" },
            { time: "16:00" },
            { time: "17:00" },
            { time: "18:00" },
            { time: "19:00" },
        ];
        this.selectedHour = new Hour();
        this.selectedDateHours = [];
        this.chartData = [];
        this.slot = new Slot();
        this.slots = [];
        this.newHour = new Hour();
        this.countFreeSlotsForWorker = [];
        this.absentWorkers = [];
    }
    GenerateChartComponent.prototype.createWorkersInDay = function (date) {
        var _this = this;
        this.workers.forEach(function (worker) {
            _this.workerInDay.workerId = worker.id;
            _this.workerInDay.date = date;
            _this.saveWorkerInDay();
            _this.cancelWorkerInDay();
        });
    };
    GenerateChartComponent.prototype.tabChangeHandler = function (event) {
        var _this = this;
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        }
        this.selectHourEvent = event;
        this.loadHours(function () {
            var hour = new Hour();
            if (!_this.isNewDay) {
                hour = _this.selectedDateHours.find(function (x) { return x.name == event.nextId; });
            }
            else {
                _this.isNewDay = false;
                hour = _this.selectedDateHours.find(function (x) { return x.name == _this.firstHour; });
            }
            _this.selectedHour = hour;
        });
    };
    GenerateChartComponent.prototype.minSlotChangeHandler = function (count) {
        this.newHour.minCount = count;
    };
    GenerateChartComponent.prototype.maxSlotChangeHandler = function (count) {
        this.newHour.maxCount = count;
    };
    GenerateChartComponent.prototype.getArray = function (countElem) {
        var arr = [];
        for (var i = 1; i <= countElem; i++) {
            arr.push(i);
        }
        return arr;
    };
    GenerateChartComponent.prototype.dateChangeHandler = function (date) {
        this.day = date.day;
        this.month = date.month;
        this.isNewDay = true;
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        }
        ;
        this.selectedDate = moment.utc([date.year, date.month - 1, date.day]);
        this.getWorkersInfo();
        this.loadWorkerInDay();
        this.tabChangeHandler(this.isNewDay);
        //if (this.workers)
        //this.createWorkersInDay(this.selectedDate);
    };
    GenerateChartComponent.prototype.compare = function (a, b) {
        if (a.name > b.name)
            return 1; // если первое значение больше второго
        if (a.name == b.name)
            return 0; // если равны
        if (a.name < b.name)
            return -1; // если первое значение меньше второго
    };
    GenerateChartComponent.prototype.generateGraph = function () {
        var _this = this;
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        }
        ;
        this.dataService.getFilledSlots(this.selectedDate).subscribe(function (data) {
            _this.slots = data;
            _this.loadHours(function () {
                _this.chartData = _this.selectedDateHours;
                _this.getWorkersInfo();
            });
        });
    };
    GenerateChartComponent.prototype.getWorkerName = function (workerId) {
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.name : "";
    };
    GenerateChartComponent.prototype.getWorkersInfo = function () {
        var _this = this;
        this.dataService.getAbsentWorkers(this.selectedDate).subscribe(function (data) { return _this.absentWorkers = data; });
        this.dataService.getCountFreeSlotsForWorkers(this.selectedDate).subscribe(function (data) { return _this.countFreeSlotsForWorker = data; });
    };
    GenerateChartComponent.prototype.clearData = function () {
        this.countFreeSlotsForWorker = [];
        this.absentWorkers = [];
    };
    GenerateChartComponent.prototype.getDataToExport = function () {
        var _this = this;
        var dataToExport = [];
        this.selectedDateHours.forEach(function (hour) {
            var hourData = [];
            hourData.push(hour.name);
            hour.slots.forEach(function (s) {
                hourData.push(_this.getWorkerName(s.workerId));
            });
            dataToExport.push(hourData);
        });
        return dataToExport;
    };
    GenerateChartComponent.prototype.isPlanning = function () {
        this.isPlanningToday = (this.selectedDate.day() == this.palanningDay) ? true : false;
    };
    GenerateChartComponent.prototype.exportGraph = function () {
        var fileName = 'dutyChart';
        var data = [];
        data = this.getDataToExport();
        tsXLXS().exportAsExcelFile(data).saveAsExcelFile(fileName);
    };
    GenerateChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        setTimeout(function () {
            /** spinner ends after 5 seconds */
            _this.spinner.hide();
        }, 5000);
        this.loadWorkers();
        this.selectedDate = moment();
        var date = { year: this.selectedDate.year(), month: this.selectedDate.month() + 1, day: this.selectedDate.date() };
        this.dateChangeHandler(date);
    };
    GenerateChartComponent.prototype.saveWorkerInDay = function () {
        var _this = this;
        if (this.workerInDay.id) {
            this.dataService.updateWorkerInDay(this.workerInDay)
                .subscribe(function (data) { return _this.loadWorkerInDay(); });
        }
        else {
            this.dataService.createWorkerInDay(this.workerInDay)
                .subscribe(function (data) { return _this.loadWorkerInDay(); });
        }
    };
    GenerateChartComponent.prototype.loadWorkerInDay = function () {
        var _this = this;
        this.dataService.getWorkersInDay(this.selectedDate)
            .subscribe(function (data) { return _this.workersInDay = data; });
    };
    GenerateChartComponent.prototype.saveWorker = function () {
        var _this = this;
        console.log(this.workerInDay);
        this.dataService.updateWorkerInDay(this.workerInDay)
            .subscribe(function (data) { return _this.loadWorkerInDay(); });
    };
    GenerateChartComponent.prototype.saveSlot = function () {
        var _this = this;
        this.dataService.createSlot(this.slot)
            .subscribe(function (data) { return _this.slots.push(data); });
        this.cancelSlot();
    };
    GenerateChartComponent.prototype.saveHour = function () {
        var _this = this;
        this.selectedHour.date = this.selectedDate; //moment();
        console.log(this.selectedHour.date);
        if (!this.selectedHour.id) {
            this.dataService.createHour(this.selectedHour)
                .subscribe(function (data) { return _this.selectedDateHours.push(data); });
        }
        else {
            this.dataService.updateHour(this.selectedHour)
                .subscribe(function (data) { return _this.loadHours(null); });
        }
        this.cancel();
    };
    GenerateChartComponent.prototype.loadHours = function (cb) {
        var _this = this;
        this.dataService.getHours(this.selectedDate)
            .subscribe(function (data) {
            _this.selectedDateHours = data;
            if (cb)
                cb();
        });
    };
    GenerateChartComponent.prototype.cancel = function () {
        this.selectedHour = new Hour();
    };
    GenerateChartComponent.prototype.cancelSlot = function () {
        this.slot = new Slot();
    };
    GenerateChartComponent.prototype.cancelWorkerInDay = function () {
        this.workerInDay = new WorkerInDay();
    };
    GenerateChartComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    GenerateChartComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.cancelWorkerInDay();
        if (this.workers) {
            this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        }
        this.workerInDay = this.workersInDay.find(function (w) { return w.workerId == _this.selectedWorkerId; });
        this.isReplacementWorker = (this.worker.idGroup == 4) ? true : false;
        this.isDisableSettings = false;
    };
    GenerateChartComponent.prototype.loadWorkers = function () {
        var _this = this;
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.urlWorker)
            .subscribe(function (data) { return _this.workers = data; });
    };
    GenerateChartComponent.prototype.loadSlots = function () {
        var _this = this;
        this.dataService.getSlots()
            .subscribe(function (data) { return _this.slots = data; });
    };
    GenerateChartComponent.prototype.deleteSlots = function (id) {
        var _this = this;
        this.dataService.deleteSlotsInHour(id)
            .subscribe(function (data) { console.log(data); _this.loadSlots(); });
    };
    //addUnwantedSlots(slotId: number) {
    //    //console.log("111111111");
    //    this.worker.unwantedSlots.push(slotId);
    //    this.saveWorker();
    //    console.log(this.worker);
    //    //console.log(s);
    //}
    GenerateChartComponent.prototype.updateUnwantedSlots = function (selectedItems) {
        console.log(selectedItems);
    };
    GenerateChartComponent.prototype.addDesirableSlots = function (slotId) {
        this.worker.desirableSlots.push(slotId);
        this.saveWorker();
        console.log(this.worker);
    };
    GenerateChartComponent = __decorate([
        Component({
            templateUrl: '../html/generateChart.component.html',
            styleUrls: ['../css/generateChart.css'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService, NgxSpinnerService])
    ], GenerateChartComponent);
    return GenerateChartComponent;
}());
export { GenerateChartComponent };
//# sourceMappingURL=generateChart.component.js.map