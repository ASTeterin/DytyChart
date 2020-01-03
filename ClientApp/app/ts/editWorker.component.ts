import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './worker';
import { AbsentPeriod } from './absentPeriod';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: '../html/editWorker.component.html',
    styles: [` 
            .worker_item {  margin-top: 5px;
                            font-size: 20px; }
    `],
    providers: [DataService]
})
export class EditWorkerComponent implements OnInit {

    workers: Worker[];
    currentWorker: Worker = new Worker();
    selectedWorkerId: number;
    color: string;
    isDisableSettings: boolean = true;
    periods: number[] = [];
    groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];
    absentPeriod: AbsentPeriod = new AbsentPeriod();
    absentPeriods: AbsentPeriod[];
    fromDate: NgbDate;
    public model: any;
   


    constructor(private dataService: DataService) { }

    createArray(countElement: number): number[] {
        var arr: number[] = [];
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    }

    compare(a: Worker, b: Worker) {
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }

    ngOnInit() {
        this.loadWorkers();
        this.fromDate.day = 14;
        this.fromDate.month = 2;
        this.fromDate.year = 2020;
        //this.loadAbsentPeriods();
        //this.workers.sort();
        //this.currentWorker = this.workers[0];
        //console.log(this.currentWorker);
        
    }

    loadWorkers() {
        this.dataService.getData(this.dataService.url).subscribe((data: Worker[]) => {
            this.workers = data;
            this.workers.sort(this.compare);
            //console.log(this.workers)
        });
    }

    cancel() {
        this.currentWorker = new Worker();
        this.periods = [];
    }

    saveWorker() {
        console.log(this.currentWorker);
        if (!this.currentWorker.id) {
            this.dataService.createWorker(this.currentWorker)
                .subscribe((data: Worker) => this.workers.push(data));
        } else {
            this.dataService.updateWorker(this.currentWorker)
                .subscribe(data => this.loadWorkers());
        }
        this.saveAbsentPeriod();
        this.loadAbsentPeriods(this.currentWorker);
        //this.cancel();
        //this.periods = [];
    }

    saveAbsentPeriod() {
        console.log(this.absentPeriod);
        if (!this.absentPeriod.id) {
            this.dataService.createAbsentPeriod(this.absentPeriod)
                .subscribe((data: AbsentPeriod) => this.absentPeriods.push(data));
        } else {
            this.dataService.updateAbsentPeriod(this.absentPeriod)
                .subscribe(data => this.loadAbsentPeriods(this.currentWorker));
        }
    }

    createNewWorker() {
        this.isDisableSettings = false;
        this.cancel();
        this.currentWorker.countAbsencePeriod = 0;
    }

    addAbsencePeriod() {
        this.currentWorker.countAbsencePeriod++;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        this.absentPeriod.WorkerId = this.selectedWorkerId;
        this.absentPeriods.push(this.absentPeriod);

        //this.saveAbsentPeriod();
        console.log(this.periods);
        console.log(this.absentPeriod);
        //this.absentPeriod.start = 

    }

    deleteAbsencePeriod() {
        this.currentWorker.countAbsencePeriod--;
        console.log(this.periods);
        //this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        //this.absentPeriod.start = 

    }
    showDate($event: any) {
        this.absentPeriod.start = new Date($event.fromDate.year, $event.fromDate.month - 1, $event.fromDate.day, 0, 0, 0, 0);
        if ($event.todate)
            this.absentPeriod.end = new Date($event.todate.year, $event.todate.month - 1, $event.todate.day, 0, 0, 0, 0);
        console.log(this.absentPeriod);
        console.log($event);
    }

    loadAbsentPeriods(worker: Worker) {
        this.dataService.getAbsentPeriodsForWorker(worker.id).subscribe((data: AbsentPeriod[]) => this.absentPeriods = data);
    }

    loadAllAbsentPeriods() {
        this.dataService.getAbsentPeriods().subscribe((data: AbsentPeriod[]) => this.absentPeriods = data);
    }

    changeStaff(worker: Worker) {
        this.cancel();  
        this.currentWorker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.isDisableSettings = false;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        this.loadAbsentPeriods(this.currentWorker);
        console.log(this.absentPeriods);
        console.log(this.currentWorker);
    }

    deleteWorker(id: number) {
        this.dataService.deleteWorker(id).subscribe(data => this.loadWorkers());
        this.cancel();
    }

    onColorPickerSelected(event: any) {
        console.log(event);
    }
}