var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
var NgbdDatepicker = /** @class */ (function () {
    function NgbdDatepicker(calendar) {
        this.calendar = calendar;
        this.onChanged = new EventEmitter();
        this.today = calendar.getToday();
        this.model = this.today;
        this.getDate(this.today);
    }
    NgbdDatepicker.prototype.getDate = function ($event) {
        console.log(this.model.day);
        this.onChanged.emit(this.model);
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgbdDatepicker.prototype, "onChanged", void 0);
    NgbdDatepicker = __decorate([
        Component({
            selector: 'ngbd-datepicker',
            templateUrl: 'datepicker.html'
        }),
        __metadata("design:paramtypes", [NgbCalendar])
    ], NgbdDatepicker);
    return NgbdDatepicker;
}());
export { NgbdDatepicker };
//# sourceMappingURL=datepicker.js.map