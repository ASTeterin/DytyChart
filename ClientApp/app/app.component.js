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
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
        this.myOptions = [
            { id: 1, name: '09:00' },
            { id: 2, name: '10:00' },
            { id: 3, name: '11:00' },
            { id: 4, name: '12:00' },
            { id: 5, name: '13:00' },
            { id: 6, name: '14:00' },
            { id: 7, name: '15:00' },
        ];
    };
    AppComponent.prototype.onChange = function () {
        console.log(this.optionsModel);
    };
    // получаем данные через сервис
    AppComponent.prototype.loadWorkers = function () {
        this.workers = this.dataService.getWorkers();
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map