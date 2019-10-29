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
import { Worker } from './Worker';
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.worker = new Worker();
        this.tableMode = true;
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
    };
    AppComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    AppComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        //console.log(this.selectedWorkerId);
        this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        console.log(this.worker);
    };
    AppComponent.prototype.loadWorkers = function () {
        this.workers = this.dataService.getWorkers();
        //this.selectedWorker = this.workers[1];
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            //styleUrls: ['./app.component.css'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map