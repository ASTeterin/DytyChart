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
    selector: 'app',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css'],
    styles: [` 
            .form-group {width: 100%;}
            .worker_info_item {display: inline-block;}
    `],
    providers: [DataService]    
})

export class AppComponent implements OnInit {
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
  
    currenStaffIsDutyCheck: boolean;
    desiredTimeId: number[];
    unwantedTimeId: number[];
    isFirstHour: boolean = true;
    isDisableSettings: boolean = true;
    //dutyWorkerArr: Worker[];
    //dutyWorkerByLetterArr: Worker[];
    //dutyWorkerInWednesday: Worker[];
    timeArr: string[] = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
    slots: number[] = [1, 2, 3];
    //selectedDate: 
    selectedDateHours: Hour[];

    newHour: Hour = new Hour;
    @ViewChild(NgbdTabset, { static: false })
    private tab: NgbdTabset;

    constructor(private dataService: DataService) {
        //this.datepicker = new NgbdDatepicker(this.calendar);
        //this.today = calendar.getToday();
        //this.date = this.datepicker.model;
        //this.day = this.date.day;
        //this.month = this.date.month;
    }
    tabChangeHandler(t: any) {
        console.log(t);
        /*if (this.isFirstHour) {
            this.newHour.name = t.activeId;
            this.isFirstHour = false;
        } else {
            this.newHour.name = t.nextId;
        }*/
        this.newHour.name = t.activeId;
        console.log(this.newHour);
    }

    minSlotChangeHandler(count: number) {
        this.newHour.minCount = count;
        this.slots = this.getArray(count);
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
        console.log(date)
        this.newHour.date = new Date(date.year, date.month-1, date.day);
    }

    generateGraph(date: Date): void {
        this.dataService.getHours(date).subscribe((data: Hour[]) => {

            this.selectedDateHours = data;
            console.log(this.selectedDateHours);
            console.log(this.workers);
        });
    }

    ngOnInit() {
        this.loadWorkers();
        this.newHour.date = new Date();
    }

    save() {
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(data => this.loadWorkers());
    }

    isFind(itemId: number, item: any) {
        return itemId == item.id;
    }

    changeStaff(worker: any) {
        this.worker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.isDisableSettings = false;
        //this.currenStaffIsDutyCheck = this.worker.isDuty;
        console.log(this.worker);
        //console.log(this.currenStaffIsDutyCheck);
        //this.date = this.datepicker.model;
        //console.log(this.date);
    }   

    loadWorkers() {
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.url)
            .subscribe((data: Worker[]) => this.workers = data);

    }

}

