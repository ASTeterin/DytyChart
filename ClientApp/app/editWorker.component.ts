import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './worker';

@Component({
    templateUrl: './editWorker.component.html',
    styles: [` 
            .worker_item {  
                            font-size: 20px; }
    `],
    providers: [DataService]
})
export class EditWorkerComponent implements OnInit {

    workers: Worker[];
    selectedWorkerId: number;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getData(this.dataService.url).subscribe((data: Worker[]) => this.workers = data);
    }
}