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
    currentWorker: Worker = new Worker;
    selectedWorkerId: number;
    constructor(private dataService: DataService) { }

    compare(a: Worker, b: Worker) {
        //console.log(a);
        //console.log(b);
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }

    ngOnInit() {
        this.dataService.getData(this.dataService.url).subscribe((data: Worker[]) => { this.workers = data; this.workers.sort(this.compare); console.log(this.workers) });
        console.log(this.workers);
        //this.workers.sort();
        //this.currentWorker = this.workers[0];
        //console.log(this.currentWorker);
        
    }

    changeStaff() {

    }
}