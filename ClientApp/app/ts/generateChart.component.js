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
var GenerateChartComponent = /** @class */ (function () {
    function GenerateChartComponent(dataService) {
        this.dataService = dataService;
        this.worker = new Worker();
        this.tableMode = true;
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.groups = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];
        this.isFirstHour = true;
        this.isNewDay = true;
        this.isDisableSettings = true;
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
        //timeArr: string[] = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        this.firstTabSelectEvent = { activeId: "09:00", nextId: "09:00", preventDefault: "ƒ" };
        this.activeIdString = this.timeArr[0].time;
        this.selectedHour = new Hour;
        this.selectedDateHours = [];
        this.chartData = [];
        this.slot = new Slot;
        this.slots = [];
        this.newHour = new Hour;
        //this.datepicker = new NgbdDatepicker(this.calendar);
        //this.today = calendar.getToday();
        //this.date = this.datepicker.model;
        //this.day = this.date.day;
        //this.month = this.date.month;
    }
    GenerateChartComponent.prototype.tabChangeHandler = function (t) {
        console.log(t);
        if (this.selectedHour.name) {
            this.saveHour();
        }
        this.loadHours();
        if (!this.isNewDay) {
            var hour = this.selectedDateHours.find(function (x) { return x.name == t.nextId; });
            if (!hour) {
                this.selectedHour.name = t.nextId;
                this.selectedHour.date = this.selectedDate;
            }
            else {
                this.selectedHour = hour;
            }
            //console.log(this.selectedHour);
        }
        else {
            this.isNewDay = false;
            this.selectedHour.name = this.timeArr[0];
            this.selectedHour.date = this.selectedDate;
            //console.log(this.selectedHour);
        }
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
        //console.log(arr);
        return arr;
    };
    GenerateChartComponent.prototype.dateChangeHandler = function (date) {
        var _this = this;
        this.day = date.day;
        this.month = date.month;
        this.activeIdString = this.timeArr[0].time;
        if (this.selectedHour.name) {
            this.saveHour();
        }
        ;
        this.selectedDate = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        this.dataService.getHours(this.selectedDate).subscribe(function (data) {
            if (data.length == 0) {
                _this.isNewDay = true;
                _this.creareAllHoursInDay(_this.selectedDate);
            }
            else {
                _this.selectedHour = data[0];
                _this.selectedDateHours = data;
                _this.isNewDay = false;
                console.log(_this.selectedDateHours);
                //console.log(this.workers);
            }
        });
    };
    GenerateChartComponent.prototype.compare = function (a, b) {
        if (a.name > b.name)
            return 1; // если первое значение больше второго
        if (a.name == b.name)
            return 0; // если равны
        if (a.name < b.name)
            return -1; // если первое значение меньше второго
    };
    GenerateChartComponent.prototype.creareAllHoursInDay = function (date) {
        var _this = this;
        var hours = [];
        this.timeArr.forEach(function (item, i, arr) {
            var hour = new Hour();
            //console.log(item);
            hour.date = date;
            hour.name = item.time;
            hour.maxCount = item.maxSlots;
            hour.minCount = item.minSlots;
            _this.selectedHour = hour;
            _this.saveHour();
            //console.log(hour);
            //hours.push(hour);
        });
        //return hours;
    };
    GenerateChartComponent.prototype.randomInteger = function (min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    };
    GenerateChartComponent.prototype.createSlots = function () {
        var _this = this;
        var countSlotsInDay = 0;
        //var h: any;
        var slotIndex = 1;
        var countWorker = this.workers.length;
        //this.loadSlots();
        this.selectedDateHours.forEach(function (item, i, arr) {
            for (var i = 0; i < item.minCount; i++) {
                _this.slot.hourId = item.id;
                _this.slot.index = slotIndex++;
                _this.slot.workerId = _this.workers[_this.randomInteger(0, countWorker - 1)].id;
                //console.log(this.slot);
                _this.saveSlot();
            }
            //countSlotsInDay += item.minCount;
        });
    };
    GenerateChartComponent.prototype.generateGraph = function () {
        var _this = this;
        /*this.dataService.getHours(this.selectedHour.date).subscribe((data: Hour[]) => {

            this.selectedDateHours = data;
            this.selectedDateHours.sort(this.compare);
            console.log(this.selectedDateHours);
            console.log(this.workers);
        });*/
        this.selectedDateHours.forEach(function (item, i, arr) {
            _this.dataService.getSlotsByHourId(item.id).subscribe(function (data) { return console.log(data); });
            //console.log(item);
            //this.deleteSlots(item.id)
        });
        this.createSlots();
        this.selectedDateHours.sort(this.compare);
        this.chartData = this.selectedDateHours;
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
        this.loadHours();
    };
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
            .subscribe(function (data) { /*console.log(data);*/ _this.selectedDateHours = data; });
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
        this.dataService.getData(this.dataService.url)
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
            /*styles: [`
                    .form-group {width: 100%;}
                    .worker_info_item {display: inline-block;}
            `],*/
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], GenerateChartComponent);
    return GenerateChartComponent;
}());
export { GenerateChartComponent };
//# sourceMappingURL=generateChart.component.js.map