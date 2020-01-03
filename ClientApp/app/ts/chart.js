var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Component } from '@angular/core';
import { Hour } from "./hour";
var DutyChart = /** @class */ (function () {
    function DutyChart() {
        //this.getChartParam();
    }
    DutyChart.prototype.createArray = function (countElement) {
        var arr;
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    };
    DutyChart.prototype.getChartParam = function () {
        //this.maxSlotsArray = this.createArray(this.maxSlotsCount);
        this.minSlotsArray = (this.hour.minCount) ? this.createArray(this.hour.minCount) : [1, 2, 3];
        console.log(this.minSlotsArray);
    };
    DutyChart.prototype.getWorkerName = function (workerId) {
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.name : "";
    };
    DutyChart.prototype.getWorkerColor = function (workerId) {
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.color : "";
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DutyChart.prototype, "slots", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DutyChart.prototype, "workers", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DutyChart.prototype, "selectedDateHours", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Hour)
    ], DutyChart.prototype, "hour", void 0);
    DutyChart = __decorate([
        Component({
            selector: 'duty-chart',
            templateUrl: '../html/chart.html'
        }),
        __metadata("design:paramtypes", [])
    ], DutyChart);
    return DutyChart;
}());
export { DutyChart };
//# sourceMappingURL=chart.js.map