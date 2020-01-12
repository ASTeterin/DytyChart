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
import { Hour } from './hour';
import { Slot } from './slot';
import { tsXLXS } from 'ts-xlsx-export';
var GenerateChartComponent = /** @class */ (function () {
    function GenerateChartComponent(dataService) {
        this.dataService = dataService;
        this.worker = new Worker();
        //tableMode: boolean = true;
        //optionsModel: number[];
        //myOptions: IMultiSelectOption[];
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.groups = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];
        this.isFirstHour = true;
        this.isNewDay = true;
        this.isDisableSettings = true;
        this.isPlanningToday = false;
        this.palanningDay = 3;
        this.timeArr = [
            { time: "08:00", minSlots: 1, maxSlots: 1 },
            { time: "09:00", minSlots: 1, maxSlots: 1 },
            { time: "10:00", minSlots: 2, maxSlots: 2 },
            { time: "11:00", minSlots: 3, maxSlots: 3 },
            { time: "12:00", minSlots: 4, maxSlots: 4 },
            { time: "13:00", minSlots: 5, maxSlots: 6 },
            { time: "14:00", minSlots: 6, maxSlots: 7 },
            { time: "15:00", minSlots: 6, maxSlots: 7 },
            { time: "16:00", minSlots: 4, maxSlots: 5 },
            { time: "17:00", minSlots: 3, maxSlots: 3 },
            { time: "18:00", minSlots: 2, maxSlots: 2 },
            { time: "19:00", minSlots: 1, maxSlots: 1 },
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
    GenerateChartComponent.prototype.tabChangeHandler = function (t) {
        if (this.selectedHour.name) {
            this.saveHour();
        }
        this.loadHours();
        //console.log(t);
        var hour = new Hour();
        if (!this.isNewDay) {
            hour = this.selectedDateHours.find(function (x) { return x.name == t.nextId; });
            console.log(this.selectedDateHours);
        }
        else {
            this.isNewDay = false;
            /*hour.date = this.selectedDate;
            hour.name = this.timeArr[0].time;
            hour.minCount = 1;*/
            //hour = this.selectedDateHours.find(x => x.name == this.timeArr[0].time);
        }
        this.selectedHour = hour;
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
        console.log(date);
        this.day = date.day;
        this.month = date.month;
        this.isNewDay = true;
        this.activeIdString = this.timeArr[0].time;
        if (this.selectedHour.name) {
            this.saveHour();
        }
        ;
        this.selectedDate = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        console.log(this.selectedDate);
        /*this.dataService.getHours(this.selectedDate).subscribe((data: Hour[]) => {
            //console.log(data);
            this.selectedDateHours = data
        });*/
        //this.loadHours();
        //console.log(this.selectedDateHours);
        this.tabChangeHandler(this.isNewDay);
        this.getWorkersInfo();
    };
    GenerateChartComponent.prototype.compare = function (a, b) {
        if (a.name > b.name)
            return 1; // если первое значение больше второго
        if (a.name == b.name)
            return 0; // если равны
        if (a.name < b.name)
            return -1; // если первое значение меньше второго
    };
    GenerateChartComponent.prototype.createSlots = function () {
        var _this = this;
        var countSlotsInDay = 0;
        //var h: any;
        var slotIndex = 1;
        var countWorker = this.workers.length;
        //this.loadSlots();
        /*this.selectedDateHours.forEach((item, i, arr) => {
            for (var i = 0; i < item.minCount; i++) {
                this.slot.hourId = item.id;
                this.slot.index = slotIndex++;
                this.slot.workerId = this.workers[this.randomInteger(0, countWorker-1)].id;
                //console.log(this.slot);
                this.saveSlot();
            }
            //countSlotsInDay += item.minCount;
        });*/
        this.dataService.getFilledSlots(this.selectedDate).subscribe(function (data) { return _this.slots = data; });
        console.log(this.slots);
    };
    GenerateChartComponent.prototype.generateGraph = function () {
        var _this = this;
        this.dataService.getFilledSlots(this.selectedDate).subscribe(function (data) { return _this.slots = data; });
        this.loadHours();
        console.log(this.selectedDateHours);
        this.chartData = this.selectedDateHours;
        this.getWorkersInfo();
        console.log(this.absentWorkers);
        console.log(this.countFreeSlotsForWorker);
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
        this.isPlanningToday = (this.selectedDate.getDay() == this.palanningDay) ? true : false;
    };
    GenerateChartComponent.prototype.exportGraph = function () {
        var fileName = 'dutyChart';
        var data = [];
        data = this.getDataToExport();
        console.log(data);
        tsXLXS().exportAsExcelFile(data).saveAsExcelFile(fileName);
    };
    GenerateChartComponent.prototype.getToday = function () {
        var today;
        today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    };
    GenerateChartComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
        this.selectedDate = this.getToday();
        //this.loadHours();
        //console.log(this.selectedDateHours);
        //this.tabChangeHandler(this.isNewDay);
        //this.loadHours();
    };
    GenerateChartComponent.prototype.ngAfterContentInit = function () {
        //this.selectedDate = this.getToday();
        //console.log(this.selectedDate);
        var date = { year: this.selectedDate.getFullYear(), month: this.selectedDate.getMonth() + 1, day: this.selectedDate.getDate() };
        this.dateChangeHandler(date);
    };
    //ngAfterContentInit()
    //{
    //this.loadHours();
    //}
    GenerateChartComponent.prototype.saveWorker = function () {
        var _this = this;
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(function (data) { return _this.loadWorkers(); });
    };
    GenerateChartComponent.prototype.saveSlot = function () {
        var _this = this;
        this.dataService.createSlot(this.slot)
            .subscribe(function (data) { return _this.slots.push(data); });
        this.calcelSlot();
    };
    GenerateChartComponent.prototype.saveHour = function () {
        var _this = this;
        this.selectedHour.date = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), 0, 0, 0, 0));
        if (!this.selectedHour.id) {
            this.dataService.createHour(this.selectedHour)
                .subscribe(function (data) { return _this.selectedDateHours.push(data); });
        }
        else {
            this.dataService.updateHour(this.selectedHour)
                .subscribe(function (data) { return _this.loadHours(); });
        }
        this.cancel();
    };
    GenerateChartComponent.prototype.loadHours = function () {
        var _this = this;
        this.dataService.getHours(this.selectedDate)
            .subscribe(function (data) { return _this.selectedDateHours = data; });
        //console.log(this.selectedDateHours);
    };
    GenerateChartComponent.prototype.cancel = function () {
        this.selectedHour = new Hour();
    };
    GenerateChartComponent.prototype.calcelSlot = function () {
        this.slot = new Slot();
    };
    GenerateChartComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    GenerateChartComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        this.isDisableSettings = false;
        console.log(this.worker);
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
        //console.log("111111111");
        this.worker.desirableSlots.push(slotId);
        this.saveWorker();
        console.log(this.worker);
        //console.log(s);
    };
    GenerateChartComponent = __decorate([
        Component({
            templateUrl: '../html/generateChart.component.html',
            styleUrls: ['../css/generateChart.css'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], GenerateChartComponent);
    return GenerateChartComponent;
}());
export { GenerateChartComponent };
//# sourceMappingURL=generateChart.component.js.map