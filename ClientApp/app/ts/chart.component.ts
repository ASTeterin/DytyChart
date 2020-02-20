import { Input, Component } from '@angular/core';
import { Hour } from "./hour"
import { log } from 'util';

@Component({
    selector: 'chart',
    templateUrl: '../html/chart.component.html',
    styleUrls: ['../css/chart.css']
})
export class ChartComponent {
    @Input() slots: any[];
    @Input() workers: any[];
    @Input() selectedDateHours: any[];
    maxSlotsArray: number[];
    minSlotsArray: number[];
    //@Input() minSlotsCount: number;
    //@Input() maxSlotsCount: number;
    @Input() hour: Hour;

    getWorkerName(workerId: any) {
        if (!this.workers) {
            return "";
        }
        let worker = this.workers.find(w => w.id == workerId);
        return worker ? worker.name : "";
    }

    getWorkerColor(workerId: any) {
        if (!this.workers) {
            return "";
        }
        let worker = this.workers.find(w => w.id == workerId);
        return worker ? worker.color : "";
    }

    constructor() {
    }
}