import { Component, OnInit, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';
import { Hour } from './hour';
import { Slot } from './slot';
import { ChartData } from './chartData';
import { WorkersFreeSlots } from './countFreeSlotsForWorker';
import { NgbdTabset } from './tabset';
import { NgMultiselect } from './multiselect';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepicker } from './datepicker';
import { tsXLXS } from 'ts-xlsx-export';


@Component({
    templateUrl: '../html/generateChart.component.html',
    styleUrls: ['../css/generateChart.css'],
    providers: [DataService]
})

export class GenerateChartComponent implements OnInit {
    private datepicker: NgbdDatepicker;
    calendar: NgbCalendar;
    currentDate: NgbDateStruct;
    day: number;
    month: number;
    worker: Worker = new Worker();
    workers: Worker[];
    selectedWorkerId: number;
    activeIdString: string;

    //tableMode: boolean = true;
    //optionsModel: number[];
    //myOptions: IMultiSelectOption[];
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];

    currenStaffIsDutyCheck: boolean;
    desiredTimeId: number[];
    unwantedTimeId: number[];
    isFirstHour: boolean = true;
    isNewDay: boolean = true;
    isDisableSettings: boolean = true;
    isPlanningToday: boolean = false;
    palanningDay = 3;

    timeArr: any[] = [
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

    selectedDate: Date;
    selectedHour: Hour = new Hour();
    selectedDateHours: Hour[] = [];
    chartData: Hour[] = [];

    slot: Slot = new Slot();
    slots: Slot[] = [];
    newHour: Hour = new Hour();
    countFreeSlotsForWorker: WorkersFreeSlots[] = [];
    absentWorkers: Worker[] = [];


    constructor(private dataService: DataService)
    {
    }

    tabChangeHandler(t: any) {
        if (this.selectedHour.name) {
            this.saveHour();
        }
        this.loadHours();
        //console.log(t);
        let hour: Hour = new Hour();
        if (!this.isNewDay) {
            hour = this.selectedDateHours.find(x => x.name == t.nextId);
            console.log(this.selectedDateHours);
        }
        else
        {
            this.isNewDay = false;
            /*hour.date = this.selectedDate;
            hour.name = this.timeArr[0].time;
            hour.minCount = 1;*/
            //hour = this.selectedDateHours.find(x => x.name == this.timeArr[0].time);
        }
        this.selectedHour = hour;
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
        console.log(date);
        this.day = date.day;
        this.month = date.month;
        this.isNewDay = true;

        this.activeIdString = this.timeArr[0].time;
        if (this.selectedHour.name) {
            this.saveHour();
        };

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
    }

    compare(a: Hour, b: Hour) {
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }

    createSlots(): void {
        let countSlotsInDay: number = 0;
        //var h: any;
        let slotIndex: number = 1;
        let countWorker = this.workers.length;
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

        this.dataService.getFilledSlots(this.selectedDate).subscribe((data: Slot[]) => this.slots = data);
        console.log(this.slots);
        
        
    }

    generateGraph(): void {
        this.dataService.getFilledSlots(this.selectedDate).subscribe((data: Slot[]) => this.slots = data);
        this.loadHours();
        console.log(this.selectedDateHours);
        this.chartData = this.selectedDateHours;
        this.getWorkersInfo();
        console.log(this.absentWorkers);
        console.log(this.countFreeSlotsForWorker);
    }

    getWorkerName(workerId: any) {
        let worker = this.workers.find(w => w.id == workerId);
        return worker ? worker.name : "";
    }

    getWorkersInfo(): void {
        this.dataService.getAbsentWorkers(this.selectedDate).subscribe((data: Worker[]) => this.absentWorkers = data);
        this.dataService.getCountFreeSlotsForWorkers(this.selectedDate).subscribe((data: WorkersFreeSlots[]) => this.countFreeSlotsForWorker = data);
    }

    clearData(): void {
        this.countFreeSlotsForWorker = [];
        this.absentWorkers = [];
    }


    getDataToExport(): any {
        let dataToExport: string[][] = [];
        this.selectedDateHours.forEach((hour) => {
            let hourData: string[] = [];
            hourData.push(hour.name);
            hour.slots.forEach((s) => {
                hourData.push(this.getWorkerName(s.workerId));
            });
            dataToExport.push(hourData);       
        })
        return dataToExport;
    }

    isPlanning(): void {
        this.isPlanningToday = (this.selectedDate.getDay() == this.palanningDay) ? true : false; 
    }

    exportGraph(): void {
        let fileName = 'dutyChart';
        let data: ChartData[] = [];
        data = this.getDataToExport();
        console.log(data);
        tsXLXS().exportAsExcelFile(data).saveAsExcelFile(fileName);   
    }

    getToday(): Date {
        var today: Date;
        today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    ngOnInit() {
        this.loadWorkers();
        this.selectedDate = this.getToday();
        //this.loadHours();
        //console.log(this.selectedDateHours);
        //this.tabChangeHandler(this.isNewDay);
        //this.loadHours();
    }

    ngAfterContentInit() {
        //this.selectedDate = this.getToday();
        //console.log(this.selectedDate);
        var date = { year: this.selectedDate.getFullYear(), month: this.selectedDate.getMonth() + 1, day: this.selectedDate.getDate() };
        this.dateChangeHandler(date);
    }

    //ngAfterContentInit()
    //{
        //this.loadHours();
    //}

    saveWorker() {
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(data => this.loadWorkers());
    }

    saveSlot() {
        this.dataService.createSlot(this.slot)
            .subscribe((data: Slot) => this.slots.push(data));
        this.calcelSlot();
    }

    saveHour() {
        this.selectedHour.date = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), 0, 0, 0, 0));
        if (!this.selectedHour.id) {
            this.dataService.createHour(this.selectedHour)
                .subscribe((data: Hour) => this.selectedDateHours.push(data));
        } else {
            this.dataService.updateHour(this.selectedHour)
                .subscribe(data => this.loadHours());
        }
        this.cancel();
    }

    loadHours() {
        this.dataService.getHours(this.selectedDate)
            .subscribe((data: Hour[]) => this.selectedDateHours = data );
        //console.log(this.selectedDateHours);
    }

    cancel() {
        this.selectedHour = new Hour();
    }

    calcelSlot() {
        this.slot = new Slot();
    }

    isFind(itemId: number, item: any) {
        return itemId == item.id;
    }

    changeStaff(worker: any) {
        this.worker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.isDisableSettings = false;
        console.log(this.worker);
    }

    loadWorkers() {
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.urlWorker)
            .subscribe((data: Worker[]) => this.workers = data);
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
        //console.log("111111111");
        this.worker.desirableSlots.push(slotId);
        this.saveWorker();
        console.log(this.worker);
        //console.log(s);
    }



}

