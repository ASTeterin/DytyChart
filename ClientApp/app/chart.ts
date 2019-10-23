import { Input, Component } from '@angular/core';

@Component({
    selector: 'duty-chart',
    templateUrl: 'chart.html'
})
export class DutyChart {
    maxSlotsArray: number[];
    minSlotsArray: number[];
    @Input() minSlotsCount: number;
    @Input() maxSlotsCount: number;

    createArray(countElement: number): number[] {
        var arr: number[];
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    }

    getChartParam() {
        this.maxSlotsArray = this.createArray(this.maxSlotsCount);
        this.minSlotsArray = this.createArray(this.minSlotsCount);
    }

    constructor() {
        this.getChartParam();
    }
}