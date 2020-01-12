import { Component , EventEmitter, Output} from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker',
    templateUrl: '../html/datepicker.html',
    styleUrls: ['../css/datapicker.css']

})
export class NgbdDatepicker {

    model: NgbDateStruct;
    today: NgbDateStruct;

    constructor(private calendar: NgbCalendar) {
        this.today = calendar.getToday();
        this.model = this.today;
        this.getDate(this.today);
    }

    @Output() onChanged = new EventEmitter<NgbDateStruct>()

    getDate($event: any): void {
        //console.log(this.model.day);
        this.onChanged.emit(this.model);
    }
    
}