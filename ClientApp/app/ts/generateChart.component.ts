import { Component, OnInit, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';
import { WorkerInDay } from './WorkerInDay';
import { Hour } from './hour';
import { Slot } from './slot';
import { Group } from './group';
import { SpecialHourInDay } from './specialHourInDay';
import { ChartData } from './chartData';
import { WorkersFreeSlots } from './countFreeSlotsForWorker';
import { NgbdTabset } from './tabset.component';
import { NgMultiselect } from './multiselect.component';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepicker } from './datepicker.component';
import { tsXLXS } from 'ts-xlsx-export';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { ExcelService } from './excel.service';
import { DatePipe } from '@angular/common';
import { SlotToExport } from './slotToExport';
import { DefaultSlots } from './defaultSlots';

@Component({
    templateUrl: '../html/generateChart.component.html',
    styleUrls: ['../css/generateChart.css'],
    providers: [DataService, ExcelService, DatePipe]
})

export class GenerateChartComponent implements OnInit {
    private datepicker: NgbdDatepicker;
    calendar: NgbCalendar;
    currentDate: NgbDateStruct;
    day: number;
    month: string;
    worker: Worker = new Worker();
    workers: Worker[];
    workerInDay: WorkerInDay = new WorkerInDay();
    workersInDay: WorkerInDay[] = [];
    dutyWorkers: WorkerInDay[] = [];
    defaultHourSettings: DefaultSlots[] = [];
    selectedWorkerId: number;
    selectHourEvent: any;
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    groups: Group[] = [];
    //groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }, { id: 4, name: "Сменники" }];
    currenStaffIsDutyCheck: boolean;
    desiredTimeId: number[];
    unwantedTimeId: number[];
    isFirstHour: boolean = true;
    isNewDay: boolean = true;
    isDisableSettings: boolean = true;
    isReplacementWorker: boolean = false;
    isPlanningToday: boolean = false;
    palanningDay = 3;
    firstHour: string = "08:00";

    timeArr: any[] = [
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

    selectedDate: moment.Moment;
    selectedHour: Hour = new Hour();
    selectedDateHours: Hour[] = [];
    chartData: Hour[] = [];

    slot: Slot = new Slot();
    slots: Slot[] = [];
    newHour: Hour = new Hour();
    countFreeSlotsForWorker: WorkersFreeSlots[] = [];
    absentWorkers: Worker[] = [];
    slotToExport: SlotToExport;
    workerNameToExport: string[][] = [];
    workerColorToExport: string[][] = [];
    workersInfoToExport: string[][] = [];
    specialHourInDay: SpecialHourInDay = new SpecialHourInDay();
    specialHoursInDay: SpecialHourInDay[] = [];
    unwantedSlots: SpecialHourInDay[] = [];
    desirableSlots: SpecialHourInDay[] = [];
    selectedDesirableSlots: any[] = [];
    selectedUnwantedSlots: any[] = [];
    dropdownList = [
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



    constructor(private dataService: DataService, private spinner: NgxSpinnerService, private excelService: ExcelService) {
    }

    createWorkersInDay(date: moment.Moment) {
        this.workers.forEach((worker) => {
            this.workerInDay.workerId = worker.id;
            this.workerInDay.date = date;
            this.saveWorkerInDay();
            this.cancelWorkerInDay();
        });
    }

    tabChangeHandler(event: any) {
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        }
        this.selectHourEvent = event;
        this.loadHours(() => {
            let hour: Hour = new Hour();
            if (!this.isNewDay) {
                hour = this.selectedDateHours.find(x => x.name == event.nextId);
            } else {
                this.isNewDay = false;
                hour = this.selectedDateHours.find(x => x.name == this.firstHour);
            }
            this.selectedHour = hour;
        });
    }

    loadDefaultHourSettings() {

        this.dataService.getDefaultSlots().subscribe((data: DefaultSlots[]) => this.defaultHourSettings = data);
        if (this.defaultHourSettings.length == 0) {
            //this.dataService.createDefaultHourSettings();
        }
    }

    minSlotChangeHandler(count: number) {
        this.newHour.minCount = count;
    }

    maxSlotChangeHandler(count: number) {
        this.newHour.maxCount = count;
    }

    getArray(countElem: number) {
        var arr: number[] = [];
        for (var i = 1; i <= countElem; i++) {
            arr.push(i);
        }
        return arr;
    }

    getMonth(monthNumber: number) {
        let monthNames: string[] = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return (monthNumber < monthNames.length - 1)? monthNames[monthNumber - 1]: null;
    }

    dateChangeHandler(date: NgbDateStruct) {
        this.cancelWorker();
        this.day = date.day;
        this.month = this.getMonth(date.month);
        this.isNewDay = true;
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        };

        this.selectedDate = moment.utc([date.year, date.month - 1, date.day]);
        this.getWorkersInfo();
        this.loadWorkerInDay();
        this.loadAllSpecialHoursInDay();
        this.tabChangeHandler(this.isNewDay);
    }

    compare(a: Hour, b: Hour) {
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }


    generateGraph(): void {
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        };
        this.spinner.show();
        this.dataService.getFilledSlots(this.selectedDate).subscribe((data: Slot[]) => {
            this.slots = data;
            this.loadHours(() => {
                this.chartData = this.selectedDateHours;
                this.getWorkersInfo();
                this.spinner.hide();
            });
        });
        
    }

    getWorkerName(workerId: any): string {
        let worker = this.workers ? this.workers.find(w => w.id == workerId) : null;
        return worker ? worker.name : "";
    }

    getWorkerColor(workerId: any): string {
        let worker = this.workers.find(w => w.id == workerId);
        return worker ? worker.color : "";
    }

    getWorkersInfo(): void {
        this.dataService.getAbsentWorkers(this.selectedDate).subscribe((data: Worker[]) => this.absentWorkers = data);
        this.dataService.getCountFreeSlotsForWorkers(this.selectedDate).subscribe((data: WorkersFreeSlots[]) => this.countFreeSlotsForWorker = data);
    }

    clearData(): void {
        this.countFreeSlotsForWorker = [];
        this.absentWorkers = [];
    }


    getDataToExport(): void {
        this.workerColorToExport = [];
        this.workerNameToExport = [];
        let dutyWorkers: any[] | string[] = ["Сменник:"];
        let dutyOnPlanning: any[] | string[] = ["Дежурный по планерке:"];
        let dutyOnLetters: any[] | string[] = ["Дежурный на письмах:"];

        this.workersInDay.forEach((w) => {
            if (w.isDuty) {
                dutyWorkers.push(this.getWorkerName(w.workerId));
            }
            if (w.isDutyOnWedn) {
                dutyOnPlanning.push(this.getWorkerName(w.workerId));
            }
            if (w.isDutyOnLetters) {
                dutyOnLetters.push(this.getWorkerName(w.workerId));
            }
        });

        this.workersInfoToExport.push(dutyWorkers);
        this.workersInfoToExport.push(dutyOnPlanning);
        this.workersInfoToExport.push(dutyOnLetters);

        this.selectedDateHours.forEach((hour) => {
            let workersInHour: string[] = [];
            let colors: string[] = [];

            workersInHour.push(hour.name);
            colors.push("FF99FF99");

            hour.slots.forEach((s) => {
                workersInHour.push(this.getWorkerName(s.workerId));
                colors.push(this.getWorkerColor(s.workerId));
            });
            this.workerColorToExport.push(colors);
            this.workerNameToExport.push(workersInHour);
        })
    }

    isPlanning(): void {
        this.isPlanningToday = (this.selectedDate.day() == this.palanningDay) ? true : false;
    }

    exportGraph(): void {
        let fileName = 'dutyChart';
        let data: ChartData[] = [];
        this.getDataToExport();

        this.excelService.generateExcel(this.workerNameToExport, this.workerColorToExport, this.workersInfoToExport);
    }

    ngOnInit() {
        this.loadWorkers();
        this.loadGroups();
        this.loadDefaultHourSettings();
        this.selectedDate = moment();
        var date = { year: this.selectedDate.year(), month: this.selectedDate.month() + 1, day: this.selectedDate.date() };
        this.dateChangeHandler(date);
    }

    saveDutyWorker() {
        /*if (this.workerInDay.isDuty) {
            this.dataService.getWorkersInDayByGroup(this.selectedDate, 4).subscribe((data: WorkerInDay[]) => this.dutyWorkers = data);
            this.dutyWorkers.forEach((w) => {
                w.isDuty = false;
                
            });
            this.saveWorkersInDay();
        }*/
        this.saveWorkerInDay();
    }

    saveWorkersInDay() {
        this.dataService.updateWorkersInDay(this.dutyWorkers)
            .subscribe(data => this.loadWorkerInDay());
    }

    saveWorkerInDay() {
        if (this.workerInDay.id) {
            this.dataService.updateWorkerInDay(this.workerInDay)
                .subscribe(data => this.loadWorkerInDay());
        }
        else {
            this.dataService.createWorkerInDay(this.workerInDay)
                .subscribe(data => this.loadWorkerInDay());
        }   
    }

    loadWorkerInDay() {
        this.dataService.getWorkersInDay(this.selectedDate)
            .subscribe((data: WorkerInDay[]) => this.workersInDay = data);
    }

    loadAllSpecialHoursInDay() {
        this.dataService.getAllSpecialHoursInDay(this.selectedDate)
            .subscribe((data: SpecialHourInDay[]) => console.log(data));
    }

    loadGroups() {
        this.dataService.getGroups().subscribe((data: Group[]) =>
            this.groups = data);
    }

    saveWorker() {
        console.log(this.workerInDay);
        this.dataService.updateWorkerInDay(this.workerInDay)
            .subscribe(data => this.loadWorkerInDay());
    }

    saveSlot() {
        this.dataService.createSlot(this.slot)
            .subscribe((data: Slot) => this.slots.push(data));
        this.cancelSlot();
    }

    saveHour() {
        this.selectedHour.date = this.selectedDate;//moment();
        console.log(this.selectedHour.date);
        if (!this.selectedHour.id) {
            this.dataService.createHour(this.selectedHour)
                .subscribe((data: Hour) => this.selectedDateHours.push(data));
        } else {
            this.dataService.updateHour(this.selectedHour)
                .subscribe(data => this.loadHours(null));
        }
        this.cancel();
    }

    loadHours(cb: any) {
        this.dataService.getHours(this.selectedDate)
            .subscribe((data: Hour[]) => {
                this.selectedDateHours = data;
                if (cb) cb();
            });
    }

    cancelWorker() {
        this.selectedWorkerId = null;
        this.cancelWorkerInDay();
        //this.cancelSlot;
    }

    cancel() {
        this.selectedHour = new Hour();

    }

    cancelSlot() {
        this.slot = new Slot();
    }

    cancelWorkerInDay() {
        this.workerInDay = new WorkerInDay();
        this.selectedDesirableSlots = [];
        this.specialHoursInDay = [];
        this.selectedUnwantedSlots = [];
    }

    isFind(itemId: number, item: any) {
        return itemId == item.id;
    }

    changeStaff(worker: any) {
        this.cancelWorkerInDay();

        if (this.workers) {
            this.worker = this.workers.find(x => x.id == this.selectedWorkerId);
        }
        this.workerInDay = this.workersInDay.find((w) => w.workerId == this.selectedWorkerId);
        this.loadSpecialHourInDay(this.selectedDate, this.worker, () => {
            this.splitSpecialHours(this.specialHoursInDay);
            if (this.desirableSlots.length > 0)
                this.selectedDesirableSlots = this.getSelectedHours(this.desirableSlots);
            if (this.unwantedSlots.length > 0)
                this.selectedUnwantedSlots = this.getSelectedHours(this.unwantedSlots);
        });
        
        this.isReplacementWorker = (this.worker.idGroup == 4) ? true : false;
        this.isDisableSettings = false;
    }

    loadWorkers() {
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.urlWorker)
            .subscribe((data: Worker[]) =>
            {
                this.workers = data;
                this.workers.sort(this.compare);
            })
    }

    loadSlots() {
        this.dataService.getSlots()
            .subscribe((data: Slot[]) => this.slots = data);
    }

    loadSpecialHourInDay(date: moment.Moment, worker: Worker, cb: any) {
        var isDerisableSlot = true;
        this.selectedDesirableSlots = [];
        this.selectedUnwantedSlots = [];
        this.dataService.getSpecialHoursInDay(date, worker.id)
            .subscribe((data: SpecialHourInDay[]) => {
                //console.log(data);
                this.specialHoursInDay = data;
                if (cb)
                    cb();
            });
    }

    getSelectedHours(selectedSlots: SpecialHourInDay[]) {
        console.log(selectedSlots);
        let selectedSpecialHours: any[] | { item_id: number; item_text: string; }[] = [];
        selectedSlots.forEach((slot) => {
            selectedSpecialHours.push(
                this.dropdownList.find((s) => s.item_id == slot.hourNumber));
        });
        return selectedSpecialHours;
    }

    splitSpecialHours(specialHours: SpecialHourInDay[]) {
        this.desirableSlots = [];
        this.unwantedSlots = [];
        specialHours.forEach(x => {
            switch (x.type) {
                case true: {
                    this.desirableSlots.push(x);
                    break;
                }
                case false: {
                    this.unwantedSlots.push(x);
                    break;
                }
            }
        });
    }



    deleteSlots(id: number) {
        this.dataService.deleteSlotsInHour(id)
            .subscribe(data => { console.log(data); this.loadSlots() });
    }

    /*updateDesirableSlots(selectedItems: any) {
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = true;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedItems.data;
        this.dataService.createSpecialHourInDay(this.specialHourInDay)
            .subscribe((data: SpecialHourInDay) => this.specialHoursInDay.push(data));
        console.log(this.specialHourInDay);
    }*/

    updateDesirableSlots(selectedData: any) {
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = true;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedData.data;
        switch (selectedData.operation) {
            case "select": {

                this.dataService.createSpecialHourInDay(this.specialHourInDay)
                    .subscribe((data: SpecialHourInDay) => this.specialHoursInDay.push(data));
                break;
            }
            case "unSelect": {
                this.dataService.getSpecialHourInDayForWorker(this.selectedDate, this.selectedWorkerId, true, selectedData.data).subscribe((data: SpecialHourInDay) => {
                    this.selectedHour = data;
                    this.dataService.deleteSpecialHourInDay(this.selectedHour.id).subscribe((data) => console.log(data));
                });
            }
        }

    }

    updateUnwantedSlots(selectedData: any) {
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = false;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedData.data;
        switch (selectedData.operation) {
            case "select": {
                this.dataService.createSpecialHourInDay(this.specialHourInDay)
                    .subscribe((data: SpecialHourInDay) => this.specialHoursInDay.push(data));
                break;
            }
            case "unSelect": {
                this.dataService.getSpecialHourInDayForWorker(this.selectedDate, this.selectedWorkerId, false, selectedData.data).subscribe((data: SpecialHourInDay) => {
                    this.selectedHour = data;
                    this.dataService.deleteSpecialHourInDay(this.selectedHour.id).subscribe((data) => console.log(data));
                });
            }
        }

    }

    /*updateUnwantedSlots(selectedItems: any) {
        this.specialHourInDay.date = this.selectedDate;
        this.specialHourInDay.type = false;
        this.specialHourInDay.workerId = this.selectedWorkerId;
        this.specialHourInDay.hourNumber = selectedItems.data;
        this.dataService.createSpecialHourInDay(this.specialHourInDay)
            .subscribe((data: SpecialHourInDay) => this.specialHoursInDay.push(data));
        console.log(this.specialHourInDay);
    }*/

    addDesirableSlots(slotId: number) {
        this.worker.desirableSlots.push(slotId);
        this.saveWorker();
        console.log(this.worker);
    }



}
