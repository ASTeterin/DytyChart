import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './worker';

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
        //this.workers.sort();
        //this.currentWorker = this.workers[0];
        //console.log(this.currentWorker);
        
    }

    loadWorkers() {
        this.dataService.getData(this.dataService.url).subscribe((data: Worker[]) => {
            this.workers = data;
            this.workers.sort(this.compare);
            console.log(this.workers)
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
        //this.cancel();
        //this.periods = [];
    }

    createNewWorker() {
        this.isDisableSettings = false;
        this.cancel();
        this.currentWorker.countAbsencePeriod = 0;
    }

    addAbsencePeriod() {
        this.currentWorker.countAbsencePeriod++;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
    }

    changeStaff(worker: Worker) {
        this.cancel();
        
        this.currentWorker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.isDisableSettings = false;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
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