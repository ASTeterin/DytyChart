var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.url = "/api/Workers";
    }
    DataService.prototype.getWorker = function () {
        console.log('2');
        return this.http.get(this.url);
    };
    DataService.prototype.createWorker = function (worker) {
        return this.http.post(this.url, worker);
    };
    DataService.prototype.updateWorker = function (worker) {
        return this.http.put(this.url + '/' + worker.id, worker);
    };
    DataService.prototype.deleteProduct = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    DataService.prototype.getWorkers = function () {
        return [
            { id: 1, name: "Ivan Ivanov", isDuty: true, isDutyByLetters: false, isDutyOnWednesday: false },
            { id: 2, name: "Vasiliy Uhov", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 3, name: "Elena Petrova", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 4, name: "Vlad Konev", isDuty: true, isDutyByLetters: false, isDutyOnWednesday: false },
            { id: 5, name: "Igor Maksimov", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: true },
            { id: 6, name: "Igor Nikolaev", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 7, name: "Sergey Bobkov", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 8, name: "Yuliya Voz", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
        ];
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map