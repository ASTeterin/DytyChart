import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './worker';
import { Group } from './group';
import { AbsentPeriod } from './absentPeriod';
import { SpecialHour} from './specialHour'
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
//import { NgbdModalStacked } from './modalWindow.component'
import * as moment from 'moment';
import { NgbdModalStacked } from './modalWindow.component';

@Component({
    templateUrl: '../html/editWorker.component.html',
    styleUrls: ['../css/editWorker.css'],
    providers: [DataService, NgbdModalStacked]
})
export class EditWorkerComponent implements OnInit {

    workers: Worker[];
    currentWorker: Worker = new Worker();
    selectedWorkerId: number;
    color: string;
    isDisableSettings: boolean = true;
    periods: number[] = [];
    groups: Group[] = [];
    //groups: any[] = [{ id: 1, name: "Группа поддержки VIP" }, { id: 2, name: "Группа запуска" }, { id: 3, name: "Группа поддержки" }, { id: 4, name: "Сменники" }];
    absentPeriod: AbsentPeriod = new AbsentPeriod();
    absentPeriods: AbsentPeriod[] = [];
    fromDate: NgbDate;
    dropdownList = [
        { item_id: 0, item_text: '08:00' },
        { item_id: 1, item_text: '09:00' },
        { item_id: 2, item_text: '10:00' },
        { item_id: 3, item_text: '11:00' },
        { item_id: 4, item_text: '12:00' },
        { item_id: 5, item_text: '13:00' },
        { item_id: 6, item_text: '14:00' },
        { item_id: 7, item_text: '15:00' },
        { item_id: 8, item_text: '16:00' },
        { item_id: 9, item_text: '17:00' },
        { item_id: 10, item_text: '18:00' },
        { item_id: 11, item_text: '19:00' }
    ];
    public model: any;
    selectedDesirableSlots: any[] = [];
    selectedUnwantedSlots: any[] = [];
    specialHour: SpecialHour = new SpecialHour();
    specialHours: SpecialHour[] = [];

    constructor(private dataService: DataService, private modal: NgbdModalStacked) { }

    createArray(countElement: number): number[] {
        var arr: number[] = [];
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    }

    compare(a: Worker, b: Worker) {
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }

    ngOnInit() {
        this.loadWorkers();
        this.dataService.getGroups().subscribe((data: Group[]) =>
            this.groups = data);
    }

    loadWorkers() {
        this.dataService.getData(this.dataService.urlWorker).subscribe((data: Worker[]) => {
            this.workers = data;
            this.workers.sort(this.compare);
            //console.log(this.workers)
        });
    }

    cancel() {
        this.currentWorker = new Worker();
        this.periods = [];
    }

    isAllInfoEntered() {
        return ((!this.currentWorker.color) || (!this.currentWorker.idGroup) || (!this.currentWorker.name)) ? false : true;
    }

    saveWorker() {
        var isErrorWhenSaving: boolean = true;
        if (!this.isAllInfoEntered()) {
            this.modal.open(isErrorWhenSaving);
            return;
        }
        isErrorWhenSaving = false;
        if (!this.currentWorker.id) {
            this.dataService.createWorker(this.currentWorker)
                .subscribe((data: Worker) => {
                    this.workers.push(data);
                });
        } else {
            this.dataService.updateWorker(this.currentWorker)
                .subscribe(data => this.loadWorkers());
        }
        if (this.absentPeriods.length > 0) {
            this.saveAbsentPeriod();
            this.loadAbsentPeriods(this.currentWorker);
        }
        this.modal.open(isErrorWhenSaving);

        //this.cancel();
        //this.periods = [];
    }

    saveAbsentPeriod() {
        if (!this.absentPeriod.id) {
            this.dataService.createAbsentPeriod(this.absentPeriod)
                .subscribe((data: AbsentPeriod) => this.absentPeriods.push(data));
        } else {
            this.dataService.updateAbsentPeriod(this.absentPeriod)
                .subscribe(data => this.loadAbsentPeriods(this.currentWorker));
        }
    }

    createNewWorker() {
        this.isDisableSettings = false;
        this.cancel();
        this.currentWorker.countAbsencePeriod = 0;
    }

    addAbsencePeriod() {
        this.currentWorker.countAbsencePeriod++;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        this.absentPeriod.WorkerId = this.selectedWorkerId;
        this.absentPeriod.index = this.currentWorker.countAbsencePeriod;
        this.saveAbsentPeriod();
        this.loadAbsentPeriods(this.currentWorker);
        //this.absentPeriods.push(this.absentPeriod);
        console.log(this.absentPeriods);
        //this.saveAbsentPeriod();
    }

    deleteAbsencePeriod(period: AbsentPeriod) {
        this.dataService.deleteAbsentPeriod(period.id).subscribe(data => this.loadAbsentPeriods(this.currentWorker));
        console.log(this.absentPeriods);
        this.loadAbsentPeriods(this.currentWorker);
        this.currentWorker.countAbsencePeriod--;
    }
    showDate($event: any) {
        this.absentPeriod.start = moment(new Date($event.fromDate.year, $event.fromDate.month - 1, $event.fromDate.day));
        if ($event.todate)
            this.absentPeriod.end = moment(new Date($event.todate.year, $event.todate.month - 1, $event.todate.day));
    }

    loadAbsentPeriods(worker: Worker) {
        this.dataService.getAbsentPeriodsForWorker(worker.id).subscribe((data: AbsentPeriod[]) => this.absentPeriods = data);
    }

    loadAllAbsentPeriods() {
        this.dataService.getAbsentPeriods().subscribe((data: AbsentPeriod[]) => this.absentPeriods = data);
    }

    changeStaff(worker: Worker) {
        this.cancel();
        this.currentWorker = this.workers.find(x => x.id == this.selectedWorkerId);
        this.isDisableSettings = false;
        this.periods = this.createArray(this.currentWorker.countAbsencePeriod);
        this.loadAbsentPeriods(this.currentWorker);
    }

    deleteWorker(id: number) {
        this.dataService.deleteWorker(id).subscribe(data => this.loadWorkers());
        this.cancel();
    }

    onColorPickerSelected(event: any) {
        console.log(event);
    }

    updateDesirableSlots(selectedData: any) {
        console.log(selectedData);
        switch(selectedData.x) {
            case "select": {
                this.specialHour.type = true;
                this.specialHour.workerId = this.selectedWorkerId;
                this.specialHour.hourNumber = selectedData.data;
                this.dataService.createSpecialHour(this.specialHour)
                    .subscribe((data: SpecialHour) => this.specialHours.push(data));   
                break;
            }
            case "unSelect": {
                this.dataService.deleteSpecialHour(selectedData.data.id).subscribe(data => console.log(data));   
            }
        }
     
    }

}
