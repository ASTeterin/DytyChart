import { Component, OnInit, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';
import { Hour } from './hour';
import { NgbdTabset } from './tabset';
import { NgMultiselect } from './multiselect';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepicker } from './datepicker';


@Component({
    templateUrl: '../html/generateChart.component.html',
    //styleUrls: ['./app.component.css'],
    styles: [` 
            .form-group {width: 100%;}
            .worker_info_item {display: inline-block;}
    `],
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
    minSlotsCount: String;
    maxSlotsCount: Number;
    tableMode: boolean = true;
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];

    currenStaffIsDutyCheck: boolean;
    desiredTimeId: number[];
    unwantedTimeId: number[];
    isFirstHour: boolean = true;
    isNewDay: boolean = true;
    isDisableSettings: boolean = true;
    //dutyWorkerArr: Worker[];
    //dutyWorkerByLetterArr: Worker[];
    //dutyWorkerInWednesday: Worker[];
    timeArr: any[] = [
        { time: "08:00", minSlots: 1, maxSlots: 2 },
        { time: "09:00", minSlots: 1, maxSlots: 3 },
        { time: "10:00", minSlots: 2, maxSlots: 3 },
        { time: "11:00", minSlots: 3, maxSlots: 4 },
        { time: "12:00", minSlots: 4, maxSlots: 6 },
        { time: "13:00", minSlots: 4, maxSlots: 6 },
        { time: "14:00", minSlots: 5, maxSlots: 7 },
        { time: "15:00", minSlots: 6, maxSlots: 7 },
        { time: "16:00", minSlots: 4, maxSlots: 5 },
        { time: "17:00", minSlots: 4, maxSlots: 4 },
        { time: "18:00", minSlots: 2, maxSlots: 4 },
        { time: "19:00", minSlots: 1, maxSlots: 2 },
    ];


    //timeArr: string[] = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
    firstTabSelectEvent: any = { activeId: "09:00", nextId: "09:00", preventDefault: "ƒ" };
    activeIdString: string = "09:00";

    //slots: number[] = [1, 2, 3];
    selectedDate: Date;
    selectedHour: Hour = new Hour;
    selectedDateHours: Hour[] = [];
    chartData: Hour[] = [];

    newHour: Hour = new Hour;


    constructor(private dataService: DataService) {
        //this.datepicker = new NgbdDatepicker(this.calendar);
        //this.today = calendar.getToday();
        //this.date = this.datepicker.model;
        //this.day = this.date.day;
        //this.month = this.date.month;
    }
    tabChangeHandler(t: any) {
        console.log(t);
        if (this.selectedHour.name) {
            this.saveHour();
        }
        this.loadHours();

        if (!this.isNewDay) {
            let hour = this.selectedDateHours.find(x => x.name == t.nextId);
            if (!hour) {
                this.selectedHour.name = t.nextId;
                this.selectedHour.date = this.selectedDate;
            } else {
                this.selectedHour = hour;
            }
            console.log(this.selectedHour);
        } else {
            this.isNewDay = false;
            this.selectedHour.name = this.timeArr[0];
            this.selectedHour.date = this.selectedDate;
            console.log(this.selectedHour);
        }
    }

    minSlotChangeHandler(count: number) {
        this.newHour.minCount = count;
        //this.slots = this.getArray(count);
        //console.log(count);
    }

    maxSlotChangeHandler(count: number) {
        this.newHour.maxCount = count;
        //console.log(count);
    }

    getArray(countElem: number) {
        var arr: number[] = [];
        for (var i = 1; i <= countElem; i++) {
            arr.push(i);
        }
        console.log(arr);
        return arr;
    }

    dateChangeHandler(date: NgbDateStruct) {
        this.day = date.day;
        this.month = date.month;
        this.activeIdString = this.timeArr[0].time;
        if (this.selectedHour.name) {
            this.saveHour();
        };

        this.selectedDate = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);

        this.dataService.getHours(this.selectedDate).subscribe((data: Hour[]) => {
            if (data.length == 0) {
                this.isNewDay = true;
                this.creareAllHoursInDay(this.selectedDate);
                //this.tabChangeHandler(this.firstTabSelectEvent);
                //this.selectedHour.date = new Date (Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), 0, 0, 0, 0));
            } else {
                this.selectedHour = data[0];
                this.selectedDateHours = data;
                this.isNewDay = false;
                console.log(this.selectedDateHours);
                //console.log(this.workers);
            }

        });
    }

    compare(a: Hour, b: Hour) {
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }

    creareAllHoursInDay(date: Date) {
        let hours: Hour[] = [];
        this.timeArr.forEach((item, i, arr) => {
            let hour: Hour = new Hour();
            //console.log(item);
            hour.date = date;
            hour.name = item.time;
            hour.maxCount = item.maxSlots;
            hour.minCount = item.minSlots;
            this.selectedHour = hour;
            this.saveHour();
            //console.log(hour);
            //hours.push(hour);

        });
        //return hours;
    }


    generateGraph(): void {
        /*this.dataService.getHours(this.selectedHour.date).subscribe((data: Hour[]) => {

            this.selectedDateHours = data;
            this.selectedDateHours.sort(this.compare);
            console.log(this.selectedDateHours);
            console.log(this.workers);
        });*/
        this.selectedDateHours.sort(this.compare);
        this.chartData = this.selectedDateHours;
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
        this.loadHours();
    }

    save() {
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(data => this.loadWorkers());
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
        /*this.dataService.getAllHours()
            .subscribe((data: Hour[]) => { console.log(data); });*/
        this.dataService.getHours(this.selectedDate)
            .subscribe((data: Hour[]) => { console.log(data); this.selectedDateHours = data });
        //console.log('s');
        //
        console.log(this.selectedDateHours);
    }

    cancel() {
        this.selectedHour = new Hour();
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
        this.dataService.getData(this.dataService.url)
            .subscribe((data: Worker[]) => this.workers = data);

    }

}

