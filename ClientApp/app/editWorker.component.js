var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './worker';
var EditWorkerComponent = /** @class */ (function () {
    function EditWorkerComponent(dataService) {
        this.dataService = dataService;
        this.currentWorker = new Worker;
    }
    EditWorkerComponent.prototype.compare = function (a, b) {
        //console.log(a);
        //console.log(b);
        if (a.name > b.name)
            return 1; // если первое значение больше второго
        if (a.name == b.name)
            return 0; // если равны
        if (a.name < b.name)
            return -1; // если первое значение меньше второго
    };
    EditWorkerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getData(this.dataService.url).subscribe(function (data) { _this.workers = data; console.log(data); });
        //console.log(this.workers);
        //this.workers.sort();
        //this.currentWorker = this.workers[0];
        //console.log(this.currentWorker);
    };
    EditWorkerComponent.prototype.changeStaff = function () {
    };
    EditWorkerComponent = __decorate([
        Component({
            templateUrl: './editWorker.component.html',
            styles: [" \n            .worker_item {  margin-top: 5px;\n                            font-size: 20px; }\n    "],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], EditWorkerComponent);
    return EditWorkerComponent;
}());
export { EditWorkerComponent };
//# sourceMappingURL=editWorker.component.js.map