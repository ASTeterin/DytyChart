import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker-basic',
    templateUrl: 'datapicker-basic.html'
})
export class NgbdDatepickerBasic {

    model: NgbDateStruct;
    date: { year: number, month: number };

    constructor(private calendar: NgbCalendar) {
    }

    selectToday() {
        this.model = this.calendar.getToday();
    }
}