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
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
var NgbdDatepickerRangePopup = /** @class */ (function () {
    function NgbdDatepickerRangePopup(calendar, formatter) {
        this.calendar = calendar;
        this.formatter = formatter;
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }
    NgbdDatepickerRangePopup.prototype.onDateSelection = function (date) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        }
        else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        }
        else {
            this.toDate = null;
            this.fromDate = date;
        }
    };
    NgbdDatepickerRangePopup.prototype.isHovered = function (date) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    };
    NgbdDatepickerRangePopup.prototype.isInside = function (date) {
        return date.after(this.fromDate) && date.before(this.toDate);
    };
    NgbdDatepickerRangePopup.prototype.isRange = function (date) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    };
    NgbdDatepickerRangePopup.prototype.validateInput = function (currentValue, input) {
        var parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    };
    NgbdDatepickerRangePopup = __decorate([
        Component({
            selector: 'ngbd-datepicker-range-popup',
            templateUrl: '../html/rangeSelectionDatepicker.html',
            styles: ["\n    .form-group.hidden {\n      width: 0;\n      margin: 0;\n      border: none;\n      padding: 0;\n    }\n    .custom-day {\n      text-align: center;\n      padding: 0.185rem 0.25rem;\n      display: inline-block;\n      height: 2rem;\n      width: 2rem;\n    }\n    .custom-day.focused {\n      background-color: #e6e6e6;\n    }\n    .custom-day.range, .custom-day:hover {\n      background-color: rgb(2, 117, 216);\n      color: white;\n    }\n    .custom-day.faded {\n      background-color: rgba(2, 117, 216, 0.5);\n    }\n  "]
        }),
        __metadata("design:paramtypes", [NgbCalendar, NgbDateParserFormatter])
    ], NgbdDatepickerRangePopup);
    return NgbdDatepickerRangePopup;
}());
export { NgbdDatepickerRangePopup };
//# sourceMappingURL=rangeSelectionDatepicker.js.map