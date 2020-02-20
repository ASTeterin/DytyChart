import { Component, OnInit, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';
import { WorkerInDay } from './WorkerInDay';
import { Hour } from './hour';
import { Slot } from './slot';
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
    month: number;
    worker: Worker = new Worker();
    workers: Worker[];
    workerInDay: WorkerInDay = new WorkerInDay();
    workersInDay: WorkerInDay[] = [];
    dutyWorkers: WorkerInDay[] = [];
    selectedWorkerId: number;
    selectHourEvent: any;
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }, { id: 4, name: "Сменники" }];
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

    dateChangeHandler(date: NgbDateStruct) {
        this.day = date.day;
        this.month = date.month;
        this.isNewDay = true;
        if ((this.selectedHour) && (this.selectedHour.name)) {
            this.saveHour();
        };

        this.selectedDate = moment.utc([date.year, date.month - 1, date.day]);
        
        this.getWorkersInfo();
        this.loadWorkerInDay();
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

        this.excelService.generateExcel(this.workerNameToExport, this.workerColorToExport);
    }

    ngOnInit() {
        this.loadWorkers();
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
        
        //console.log(t);
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

    cancel() {
        this.selectedHour = new Hour();
    }

    cancelSlot() {
        this.slot = new Slot();
    }

    cancelWorkerInDay() {
        this.workerInDay = new WorkerInDay();
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

    deleteSlots(id: number) {
        this.dataService.deleteSlotsInHour(id)
            .subscribe(data => { console.log(data); this.loadSlots() });
    }

    //addUnwantedSlots(slotId: number) {
    //    //console.log("111111111");
    //    this.worker.unwantedSlots.push(slotId);
    //    this.saveWorker();
    //    console.log(this.worker);
    //    //console.log(s);
    //}

    updateUnwantedSlots(selectedItems: any) {
        console.log(selectedItems);
    }

    addDesirableSlots(slotId: number) {
        this.worker.desirableSlots.push(slotId);
        this.saveWorker();
        console.log(this.worker);
    }



}
