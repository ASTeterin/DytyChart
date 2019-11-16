import { Input, Component } from '@angular/core';
import { Hour } from "./hour"
import { log } from 'util';

@Component({
    selector: 'duty-chart',
    templateUrl: 'chart.html'
})
export class DutyChart {
    @Input() slots: any[];
    @Input() workers: any[];
    @Input() selectedDateHours: any[];
    maxSlotsArray: number[];
    minSlotsArray: number[];
    //@Input() minSlotsCount: number;
    //@Input() maxSlotsCount: number;
    @Input() hour: Hour;


    createArray(countElement: number): number[] {
        var arr: number[];
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    }

    getChartParam() {
        //this.maxSlotsArray = this.createArray(this.maxSlotsCount);

        this.minSlotsArray = (this.hour.minCount) ? this.createArray(this.hour.minCount) : [1, 2, 3];
        console.log(this.minSlotsArray);
    }

    getWorkerName(workerId: number) {
        return this.workers.find(w => w.id == workerId).name;
    }

    constructor() {
        //this.getChartParam();
        
    }
}