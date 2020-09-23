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
import { SpecialHourInDay } from './specialHourInDay';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { ExcelService } from './excel.service';
import { DatePipe } from '@angular/common';
var GenerateChartComponent = /** @class */ (function () {
    function GenerateChartComponent(dataService, spinner, excelService) {
        this.dataService = dataService;
        this.spinner = spinner;
        this.excelService = excelService;
        this.worker = new Worker();
        this.workerInDay = new WorkerInDay();
        this.workersInDay = [];
        this.dutyWorkers = [];
        this.defaultHourSettings = [];
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.groups = [];
        this.isFirstHour = true;
        this.isNewDay = true;
        this.isDisableSettings = true;
        this.isReplacementWorker = false;
        this.isPlanningToday = false;
        this.palanningDay = 3;
        this.firstHour = "08:00";
        this.lastSelectedHourName = "";
        this.timeArr = [];
        this.selectedHour = new Hour();
        this.selectedDateHours = [];
        this.chartData = [];
        this.slot = new Slot();
        this.slots = [];
        this.newHour = new Hour();
        this.countFreeSlotsForWorker = [];
        this.absentWorkers = [];
        this.workerNameToExport = [];
        this.workerColorToExport = [];
        this.workersInfoToExport = [];
        this.workerFontColorToExport = [];
        this.specialHourInDay = new SpecialHourInDay();
        this.specialHoursInDay = [];
        this.unwantedSlots = [];
        this.desirableSlots = [];
        this.selectedDesirableSlots = [];
        this.selectedUnwantedSlots = [];
        this.dropdownList = [];
    }
    GenerateChartComponent.prototype.getDropdownListSettings = function (defaultHourSettings) {
        var dropdownListSettings = [];
        var i = 0;
        defaultHourSettings.forEach(function (x) {
            dropdownListSettings.push({ item_id: i++, item_text: x.name });
        });
        console.log(dropdownListSettings);
        return dropdownListSettings;
    };
    GenerateChartComponent.prototype.getListOfTimes = function (defaultHourSettings) {
        var listOfTimes = [];
        defaultHourSettings.forEach(function (x) { return listOfTimes.push({ time: x.name }); });
        return listOfTimes;
    };
    GenerateChartComponent.prototype.createWorkersInDay = function (date) {
        var _this = this;
        this.workers.forEach(function (worker) {
            _this.workerInDay.workerId = worker.id;
            _this.workerInDay.date = date;
            _this.saveWorkerInDay();
            _this.cancelWorkerInDay();
        });
    };
    GenerateChartComponent.prototype.saveSelectedHourSettings = function () {
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        }
    };
    GenerateChartComponent.prototype.tabChangeHandler = function (event) {
        var _this = this;
        this.saveSelectedHourSettings();
        //this.selectHourEvent = event;
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
    GenerateChartComponent.prototype.loadDefaultHourSettings = function (cb) {
        var _this = this;
        this.dataService.getDefaultSlots().subscribe(function (data) {
            _this.defaultHourSettings = data;
            //console.log(this.defaultHourSettings)
            if (cb)
                cb();
        });
        if (this.defaultHourSettings.length == 0) {
            //this.dataService.createDefaultHourSettings();
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
        return arr;
    };
    GenerateChartComponent.prototype.getMonth = function (monthNumber) {
        var monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return (monthNumber < monthNames.length - 1) ? monthNames[monthNumber - 1] : null;
    };
    GenerateChartComponent.prototype.dateChangeHandler = function (date) {
        this.cancelWorker();
        this.day = date.day;
        this.month = this.getMonth(date.month);
        //this.isNewDay = true;
        this.saveSelectedHourSettings();
        localStorage.setItem('date', JSON.stringify({
            year: date.year, month: date.month, day: date.day
        }));
        this.selectedDate = moment.utc([date.year, date.month - 1, date.day]);
        this.getWorkersInfo();
        this.loadWorkerInDay();
        this.loadAllSpecialHoursInDay();
        this.tabChangeHandler({ nextId: this.lastSelectedHourName });
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
        //this.saveSelectedHourSettings();
        this.tabChangeHandler({ nextId: this.lastSelectedHourName });
        this.spinner.show();
        this.dataService.getFilledSlots(this.selectedDate).subscribe(function (data) {
            _this.slots = data;
            console.log(data);
            _this.loadHours(function () {
                _this.chartData = _this.selectedDateHours;
                console.log(_this.selectedDateHours);
                _this.getWorkersInfo();
                _this.spinner.hide();
            });
            _this.tabChangeHandler({ nextId: _this.lastSelectedHourName });
        });
    };
    GenerateChartComponent.prototype.getWorkerName = function (workerId) {
        var worker = this.workers ? this.workers.find(function (w) { return w.id == workerId; }) : null;
        return worker ? worker.name : "";
    };
    GenerateChartComponent.prototype.getWorkerColor = function (workerId) {
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.color : "";
    };
    GenerateChartComponent.prototype.getWorkerFontColor = function (workerId) {
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        if (worker == null) {
            return "";
        }
        return (worker.fontColor == null) ? "#000000" : worker.fontColor;
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
        this.workerColorToExport = [];
        this.workerFontColorToExport = [];
        this.workerNameToExport = [];
        var dutyWorkers = ["Сменник:"];
        var dutyOnPlanning = ["Дежурный по планерке:"];
        var dutyOnLetters = ["Дежурный на письмах:"];
        this.workersInDay.forEach(function (w) {
            if (w.isDuty) {
                dutyWorkers.push(_this.getWorkerName(w.workerId));
            }
            if (w.isDutyOnWedn) {
                dutyOnPlanning.push(_this.getWorkerName(w.workerId));
            }
            if (w.isDutyOnLetters) {
                dutyOnLetters.push(_this.getWorkerName(w.workerId));
            }
        });
        this.workersInfoToExport.push(dutyWorkers);
        this.workersInfoToExport.push(dutyOnPlanning);
        this.workersInfoToExport.push(dutyOnLetters);
        this.selectedDateHours.forEach(function (hour) {
            var workersInHour = [];
            var colors = [];
            var fontColors = [];
            workersInHour.push(hour.name);
            colors.push("FF99FF99");
            fontColors.push("00000000");
            hour.slots.forEach(function (s) {
                workersInHour.push(_this.getWorkerName(s.workerId));
                colors.push(_this.getWorkerColor(s.workerId));
                fontColors.push(_this.getWorkerFontColor(s.workerId));
            });
            _this.workerColorToExport.push(colors);
            _this.workerFontColorToExport.push(fontColors);
            _this.workerNameToExport.push(workersInHour);
        });
    };
    GenerateChartComponent.prototype.isPlanning = function () {
        this.isPlanningToday = (this.selectedDate.day() == this.palanningDay) ? true : false;
    };
    GenerateChartComponent.prototype.exportGraph = function () {
        this.saveSelectedHourSettings();
        var fileName = 'dutyChart';
        var data = [];
        this.getDataToExport();
        this.excelService.generateExcel(this.workerNameToExport, this.workerColorToExport, this.workersInfoToExport, this.workerFontColorToExport);
    };
    GenerateChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        if ('date' in localStorage) {
            var saved_date = JSON.parse(localStorage.getItem('date'));
            this.selectedDate = moment.utc([saved_date.year, saved_date.month - 1, saved_date.day - 1]);
        }
        else {
            this.selectedDate = moment();
        }
        console.log(localStorage.getItem('date'));
        this.loadWorkers();
        this.loadGroups();
        this.loadDefaultHourSettings(function () {
            _this.timeArr = _this.getListOfTimes(_this.defaultHourSettings);
            _this.dropdownList = _this.getDropdownListSettings(_this.defaultHourSettings);
        });
        //console.log(this.defaultHourSettings)
        var date = { year: this.selectedDate.year(), month: this.selectedDate.month() + 1, day: this.selectedDate.date() + 1 };
        //this.selectedHour.name = this.firstHour;
        this.dateChangeHandler(date);
    };
    GenerateChartComponent.prototype.saveDutyWorker = function () {
        /*if (this.workerInDay.isDuty) {
            this.dataService.getWorkersInDayByGroup(this.selectedDate, 4).subscribe((data: WorkerInDay[]) => this.dutyWorkers = data);
            this.dutyWorkers.forEach((w) => {
                w.isDuty = false;
                
            });
            this.saveWorkersInDay();
        }*/
        this.saveWorkerInDay();
    };
    GenerateChartComponent.prototype.updateData = function () {
        var _this = this;
        this.dataService.deleteWorkerInDay(this.selectedDate).subscribe(function (data) {
            _this.clearData();
            _this.loadWorkerInDay();
            _this.cancelWorker();
            _this.slots = [];
            _this.selectedDateHours = [];
        });
    };
    GenerateChartComponent.prototype.saveWorkersInDay = function () {
        var _this = this;
        this.dataService.updateWorkersInDay(this.dutyWorkers)
            .subscribe(function (data) { return _this.loadWorkerInDay(); });
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
    GenerateChartComponent.prototype.loadAllSpecialHoursInDay = function () {
        this.dataService.getAllSpecialHoursInDay(this.selectedDate)
            .subscribe(function (data) { return console.log(data); });
    };
    GenerateChartComponent.prototype.loadGroups = function () {
        var _this = this;
        this.dataService.getGroups().subscribe(function (data) {
            return _this.groups = data;
        });
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
        this.lastSelectedHourName = this.selectedHour.name;
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
    GenerateChartComponent.prototype.cancelWorker = function () {
        this.selectedWorkerId = null;
        this.cancelWorkerInDay();
        //this.cancelSlot;
    };
    GenerateChartComponent.prototype.cancel = function () {
        this.selectedHour = new Hour();
    };
    GenerateChartComponent.prototype.cancelSlot = function () {
        this.slot = new Slot();
    };
    GenerateChartComponent.prototype.cancelWorkerInDay = function () {
        this.workerInDay = new WorkerInDay();
        this.selectedDesirableSlots = [];
        this.specialHoursInDay = [];
        this.selectedUnwantedSlots = [];
    };
    GenerateChartComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    GenerateChartComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.saveSelectedHourSettings();
        this.cancelWorkerInDay();
        if (this.workers) {
            this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        }
        this.workerInDay = this.workersInDay.find(function (w) { return w.workerId == _this.selectedWorkerId; });
        this.loadSpecialHourInDay(this.selectedDate, this.worker, function () {
            _this.splitSpecialHours(_this.specialHoursInDay);
            if (_this.desirableSlots.length > 0)
                _this.selectedDesirableSlots = _this.getSelectedHours(_this.desirableSlots);
            if (_this.unwantedSlots.length > 0)
                _this.selectedUnwantedSlots = _this.getSelectedHours(_this.unwantedSlots);
        });
        this.isReplacementWorker = (this.worker.idGroup == 4) ? true : false;
        this.tabChangeHandler({ nextId: this.lastSelectedHourName });
        this.isDisableSettings = false;
    };
    GenerateChartComponent.prototype.updateWorker = function () {
        var _this = this;
        this.dataService.updateWorker(this.worker)
            .subscribe(function (data) { return _this.loadWorkers(); });
    };
    GenerateChartComponent.prototype.changeWorkerGroup = function (worker) {
        //this.cancelWorkerInDay();
        this.saveSelectedHourSettings();
        this.updateWorker();
        this.isReplacementWorker = (this.worker.idGroup == 4) ? true : false;
    };
    GenerateChartComponent.prototype.loadWorkers = function () {
        var _this = this;
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.urlWorker)
            .subscribe(function (data) {
            _this.workers = data;
            _this.workers.sort(_this.compare);
        });
    };
    GenerateChartComponent.prototype.loadSlots = function () {
        var _this = this;
        this.dataService.getSlots()
            .subscribe(function (data) { return _this.slots = data; });
    };
    GenerateChartComponent.prototype.loadSpecialHourInDay = function (date, worker, cb) {
        var _this = this;
        var isDerisableSlot = true;
        this.selectedDesirableSlots = [];
        this.selectedUnwantedSlots = [];
        this.dataService.getSpecialHoursInDay(date, worker.id)
            .subscribe(function (data) {
            //console.log(data);
            _this.specialHoursInDay = data;
            if (cb)
                cb();
        });
    };
    GenerateChartComponent.prototype.getSelectedHours = function (selectedSlots) {
        var _this = this;
        console.log(selectedSlots);
        var selectedSpecialHours = [];
        selectedSlots.forEach(function (slot) {
            selectedSpecialHours.push(_this.dropdownList.find(function (s) { return s.item_id == slot.hourNumber; }));
        });
        return selectedSpecialHours;
    };
    GenerateChartComponent.prototype.splitSpecialHours = function (specialHours) {
        var _this = this;
        this.desirableSlots = [];
        this.unwantedSlots = [];
        specialHours.forEach(function (x) {
            switch (x.type) {
                case true: {
                    _this.desirableSlots.push(x);
                    break;
                }
                case false: {
                    _this.unwantedSlots.push(x);
                    break;
                }
            }
        });
    };
    GenerateChartComponent.prototype.deleteSlots = function (id) {
        var _this = this;
        this.dataService.deleteSlotsInHour(id)
            .subscribe(function (data) { console.log(data); _this.loadSlots(); });
    };
    /*updateDesirableSlots(selectedItems: any) {
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = true;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedItems.data;
        this.dataService.createSpecialHourInDay(this.specialHourInDay)
            .subscribe((data: SpecialHourInDay) => this.specialHoursInDay.push(data));
        console.log(this.specialHourInDay);
    }*/
    GenerateChartComponent.prototype.updateDesirableSlots = function (selectedData) {
        var _this = this;
        this.saveSelectedHourSettings();
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = true;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedData.data;
        switch (selectedData.operation) {
            case "select": {
                this.dataService.createSpecialHourInDay(this.specialHourInDay)
                    .subscribe(function (data) { return _this.specialHoursInDay.push(data); });
                break;
            }
            case "unSelect": {
                this.dataService.getSpecialHourInDayForWorker(this.selectedDate, this.selectedWorkerId, true, selectedData.data).subscribe(function (data) {
                    _this.selectedHour = data;
                    _this.dataService.deleteSpecialHourInDay(_this.selectedHour.id).subscribe(function (data) { return console.log(data); });
                });
            }
        }
    };
    GenerateChartComponent.prototype.updateUnwantedSlots = function (selectedData) {
        var _this = this;
        this.saveSelectedHourSettings();
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = false;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedData.data;
        switch (selectedData.operation) {
            case "select": {
                this.dataService.createSpecialHourInDay(this.specialHourInDay)
                    .subscribe(function (data) { return _this.specialHoursInDay.push(data); });
                break;
            }
            case "unSelect": {
                this.dataService.getSpecialHourInDayForWorker(this.selectedDate, this.selectedWorkerId, false, selectedData.data).subscribe(function (data) {
                    _this.selectedHour = data;
                    _this.dataService.deleteSpecialHourInDay(_this.selectedHour.id).subscribe(function (data) { return console.log(data); });
                });
            }
        }
    };
    /*updateUnwantedSlots(selectedItems: any) {
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = false;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedItems.data;
        this.dataService.createSpecialHourInDay(this.specialHourInDay)
            .subscribe((data: SpecialHourInDay) => this.specialHoursInDay.push(data));
        console.log(this.specialHourInDay);
    }*/
    GenerateChartComponent.prototype.addDesirableSlots = function (slotId) {
        this.worker.desirableSlots.push(slotId);
        this.saveWorker();
        console.log(this.worker);
    };
    GenerateChartComponent = __decorate([
        Component({
            templateUrl: '../html/generateChart.component.html',
            styleUrls: ['../css/generateChart.css'],
            providers: [DataService, ExcelService, DatePipe]
        }),
        __metadata("design:paramtypes", [DataService, NgxSpinnerService, ExcelService])
    ], GenerateChartComponent);
    return GenerateChartComponent;
}());
export { GenerateChartComponent };
//# sourceMappingURL=generateChart.component.js.map