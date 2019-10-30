import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';
import { NgMultiselect } from './multiselect';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css'],
    providers: [DataService]
})

export class AppComponent implements OnInit {

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

    ngOnInit() {
        this.loadWorkers();    
    }

    isFind(itemId: number, item: any) {
        return itemId == item.id;
    }

    changeStaff(worker: any) {
        //console.log(this.selectedWorkerId);
        this.worker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.currenStaffIsDutyCheck = this.worker.isDuty;
        console.log(this.worker);
        console.log(this.currenStaffIsDutyCheck);
    }   

    constructor(private dataService: DataService) { }

    loadWorkers() {
        this.workers = this.dataService.getWorkers();
        //this.selectedWorker = this.workers[1];
    }

    generateGraph() {

    }
}

