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
var ChartComponent = /** @class */ (function () {
    function ChartComponent() {
        //this.getChartParam();
    }
    ChartComponent.prototype.createArray = function (countElement) {
        var arr;
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    };
    ChartComponent.prototype.getChartParam = function () {
        //this.maxSlotsArray = this.createArray(this.maxSlotsCount);
        this.minSlotsArray = (this.hour && this.hour.minCount) ? this.createArray(this.hour.minCount) : [1, 2, 3];
    };
    ChartComponent.prototype.getWorkerName = function (workerId) {
        if (!this.workers) {
            return "";
        }
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.name : "";
        //return worker.name;
    };
    ChartComponent.prototype.getWorkerColor = function (workerId) {
        if (!this.workers) {
            return "";
        }
        var worker = this.workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.color : "";
        //return worker.color;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ChartComponent.prototype, "slots", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ChartComponent.prototype, "workers", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ChartComponent.prototype, "selectedDateHours", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Hour)
    ], ChartComponent.prototype, "hour", void 0);
    ChartComponent = __decorate([
        Component({
            selector: 'chart',
            templateUrl: '../html/chart.component.html',
            styleUrls: ['../css/chart.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChartComponent);
    return ChartComponent;
}());
export { ChartComponent };
//# sourceMappingURL=chart.component.js.map