import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './worker';

@Component({
    templateUrl: './editWorker.component.html',
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
    isDisableSettings: boolean = true;
    groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }];
    constructor(private dataService: DataService) { }

    compare(a: Worker, b: Worker) {
        //console.log(a);
        //console.log(b);
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
    }

    saveWorker() {
        if (!this.currentWorker.id) {
            this.dataService.createWorker(this.currentWorker)
                .subscribe((data: Worker) => this.workers.push(data));
        } else {
            this.dataService.updateWorker(this.currentWorker)
                .subscribe(data => this.loadWorkers());
        }
        this.cancel();
    }

    createNewWorker() {
        this.isDisableSettings = false;
    }

    changeStaff(worker: Worker) {
        this.currentWorker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.isDisableSettings = false;
        console.log(this.currentWorker);
    }
}