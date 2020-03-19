import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker-range-popup',
    templateUrl: '../html/rangeSelectionDatepicker.html',
    styles: [`
    .absent_period {
        display: inline-flex;
        margin-right 20px;
    }
    .form-group.hidden {
      width: 0;
      margin: 0;
      border: none;
      padding: 0;
    }
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class NgbdDatepickerRangePopup {

    hoveredDate: NgbDate;

    fromDate: NgbDate;
    toDate: NgbDate;
    @Output() onChanged = new EventEmitter<any>()
    @Input() from: NgbDate;

    constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
        var period = {
            fromDate:this.fromDate,
            todate: this.toDate
        };
        
        this.onChanged.emit(period);
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }

    validateInput(currentValue: NgbDate, input: string): NgbDate {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }


}