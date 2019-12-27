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
        this.urlHour = "/api/Hours";
        this.urlSlot = "/api/Slot";
        this.urlFiledSlot = "/api/Slot/get-filled-slots";
        this.urlAbsentPeriods = "/api/AbsentPeriod";
    }
    DataService.prototype.getData = function (url) {
        return this.http.get(url);
    };
    DataService.prototype.getSlotsByHourId = function (hourId) {
        return this.http.get(this.urlSlot + "?hourId=" + hourId);
    };
    DataService.prototype.getSlots = function () {
        return this.http.get(this.urlSlot);
    };
    DataService.prototype.createSlot = function (slot) {
        return this.http.post(this.urlSlot, slot);
    };
    DataService.prototype.updateSlot = function (slot) {
        return this.http.put(this.urlSlot + '/' + slot.id, slot);
    };
    DataService.prototype.deleteSlotsInHour = function (id) {
        return this.http.delete(this.urlSlot + '/' + id);
    };
    DataService.prototype.createWorker = function (worker) {
        return this.http.post(this.url, worker);
    };
    DataService.prototype.updateWorker = function (worker) {
        return this.http.put(this.url + '/' + worker.id, worker);
    };
    DataService.prototype.deleteWorker = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    DataService.prototype.getHours = function (date) {
        return this.http.get(this.urlHour + "?date=" + date.toISOString());
        //return this.http.get(`${this.urlHour}?date=${date}`);
    };
    DataService.prototype.getAllHours = function () {
        return this.http.get("" + this.urlHour);
    };
    DataService.prototype.createHour = function (hour) {
        return this.http.post(this.urlHour, hour);
    };
    DataService.prototype.updateHour = function (hour) {
        return this.http.put(this.urlHour + '/' + hour.id, hour);
    };
    DataService.prototype.getAbsentPeriod = function (workerId) {
        return this.http.get(this.urlAbsentPeriods + "?workerId=" + workerId);
    };
    DataService.prototype.getAbsentPeriods = function () {
        return this.http.get("" + this.urlAbsentPeriods);
    };
    DataService.prototype.createAbsentPeriod = function (absentPeriod) {
        return this.http.post(this.urlAbsentPeriods, absentPeriod);
    };
    DataService.prototype.updateAbsentPeriod = function (absentPeriod) {
        return this.http.put(this.urlAbsentPeriods + '/' + absentPeriod.id, absentPeriod);
    };
    DataService.prototype.getFilledSlots = function (date) {
        return this.http.get(this.urlFiledSlot + "?date=" + date.toISOString());
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map