import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker',
    templateUrl: 'datepicker.html'
})
export class NgbdDatepicker {

    model: NgbDateStruct;
    today: NgbDateStruct;

    constructor(private calendar: NgbCalendar) {
        this.today = calendar.getToday();
        this.model = this.today;

    }

    
}