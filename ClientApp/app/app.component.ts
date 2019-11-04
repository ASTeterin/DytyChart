import { Component, OnInit, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';
import { NgMultiselect } from './multiselect';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepicker } from './datepicker';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css'],
    providers: [DataService]    
})

export class AppComponent implements OnInit {
    @ViewChild(NgbdDatepicker, { static: false })
    private datepicker: NgbdDatepicker;
    date: NgbDateStruct;
    day: number;
    month: number;
    worker: Worker = new Worker();   
    workers: Worker[];
    selectedWorkerId: number;//Worker = new Worker();
    minSlotsCount: String;
    maxSlotsCount: Number;
    tableMode: boolean = true;  
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    currenStaffIsDutyCheck: boolean;
    desiredTimeId: number[];
    unwantedTimeId: number[];
    dutyWorkerArr: Worker[];
    dutyWorkerByLetterArr: Worker[];
    dutyWorkerInWednesday: Worker[];
    timeArr: string[] = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
   

    constructor(private dataService: DataService, private calendar: NgbCalendar) {
        //this.today = calendar.getToday();
    }

    ngOnInit() {
        this.loadWorkers();
        //this.date = this.datepicker.model;
        //this.date = this.datepicker.today;
        //console.log(this.date);
    }

    ngAfterViewChecked() {
        this.date = this.datepicker.model;
        this.day = this.date.day;
        this.month = this.date.month;

    }

    isFind(itemId: number, item: any) {
        return itemId == item.id;
    }

    changeStaff(worker: any) {
        this.worker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.currenStaffIsDutyCheck = this.worker.isDuty;
        console.log(this.worker);
        console.log(this.currenStaffIsDutyCheck);
        this.date = this.datepicker.model;
        console.log(this.date);
    }   

    loadWorkers() {
        //this.workers = this.dataService.getWorkers();
        console.log('1');
        this.dataService.getWorker()
            .subscribe((data: Worker[]) => this.workers = data);
        //this.selectedWorker = this.workers[1];
    }

    generateGraph() {

    }
}

