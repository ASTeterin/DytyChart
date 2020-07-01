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
    test = [
        { item_id: 0, item_text: '08:00' },
        { item_id: 1, item_text: '09:00' }];
    selectedDesirableSlots: any[] = [];
    selectedUnwantedSlots: any[] = [];
    unwantedSlots: SpecialHour[] = [];
    desirableSlots: SpecialHour[] = [];
    specialHour: SpecialHour = new SpecialHour();
    selectedHour: SpecialHour = new SpecialHour();
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
        //localStorage.getItem('date');
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
        this.absentPeriod = new AbsentPeriod();
        this.selectedDesirableSlots = [];
        this.selectedUnwantedSlots = [];
        this.desirableSlots = [];
        this.unwantedSlots = [];
        this.periods = [];
        this.absentPeriods = [];
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
        this.modal.open(isErrorWhenSaving);
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
        if (!this.absentPeriod.start) {
            var now = moment();
            this.absentPeriod.start = moment.utc([now.year(), now.month(), now.date() + 1]);
            this.absentPeriod.end = moment.utc([now.year(), now.month(), now.date() + 2]);
        }
        this.saveAbsentPeriod();
        this.loadAbsentPeriods(this.currentWorker);
    }

    deleteAbsencePeriod(period: AbsentPeriod) {
        this.dataService.deleteAbsentPeriod(period.id).subscribe(data => this.loadAbsentPeriods(this.currentWorker));
        this.loadAbsentPeriods(this.currentWorker);
        this.currentWorker.countAbsencePeriod--;
    }
    showDate($date: any) {
        this.absentPeriod.start = moment.utc([$date.fromDate.year, $date.fromDate.month - 1, $date.fromDate.day]);
        if ($date.todate)
            this.absentPeriod.end = moment.utc([$date.todate.year, $date.todate.month - 1, $date.todate.day]);
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
        this.loadSpecialHours(this.currentWorker, () => {
            console.log(this.specialHours);
            this.splitSpecialHours(this.specialHours);
            if (this.desirableSlots.length != 0)
                this.selectedDesirableSlots = this.getSelectedHours(this.desirableSlots);
            if (this.unwantedSlots.length != 0)
                this.selectedUnwantedSlots = this.getSelectedHours(this.unwantedSlots);
            //this.getSelectedHours(this.desirableSlots);

        }); 
        console.log(this.specialHours);       
    }

    deleteWorker(id: number) {
        this.dataService.deleteWorker(id).subscribe(data => this.loadWorkers());
        this.cancel();
    }

    onColorPickerSelected(event: any) {
        console.log(event);
    }

    splitSpecialHours(specialHours: SpecialHour[]) {
        specialHours.forEach(x => {
            switch (x.type) {
                case true: {
                    this.desirableSlots.push(x);
                    break;
                }
                case false: {
                    this.unwantedSlots.push(x);
                    break;
                }
            }
        }); 
    }

    loadSpecialHours(worker: Worker, cb: any) {
        var isDerisableSlot = true;
        this.dataService.getSpecialHours(worker.id)
            .subscribe((data: SpecialHour[]) => {  
                this.specialHours = data;
                if (cb) cb();
            });
    }

    getSelectedHours(selectedSlots: SpecialHour[]): any {
        let selectedSpecialHours: any[] | { item_id: number; item_text: string; }[] = [];
        selectedSlots.forEach((slot) => {
            selectedSpecialHours.push(
                this.dropdownList.find((s) => s.item_id == slot.hourNumber));
        });
        return selectedSpecialHours;
    }

    updateUnwantedSlots(selectedData: any) {
        console.log(selectedData);
        this.specialHour.type = false;
        this.specialHour.workerId = this.selectedWorkerId;
        this.specialHour.hourNumber = selectedData.data;
        switch (selectedData.operation) {
            case "select": {
                this.dataService.createSpecialHour(this.specialHour)
                    .subscribe((data: SpecialHour) => this.specialHours.push(data));
                break;
            }
            case "unSelect": {
                this.dataService.getSpecialHour(false, this.selectedWorkerId, selectedData.data).subscribe((data: SpecialHour) => {
                    this.selectedHour = data;
                    this.dataService.deleteSpecialHour(this.selectedHour.id).subscribe((data) => console.log(data));
                });
            }
        }
    }

    updateDesirableSlots(selectedData: any) {
        console.log(selectedData);
        //this.selectedHour = new SpecialHour();
        this.specialHour.type = true;
        this.specialHour.workerId = this.selectedWorkerId;
        this.specialHour.hourNumber = selectedData.data;    
        switch(selectedData.operation) {
            case "select": {
                
                this.dataService.createSpecialHour(this.specialHour)
                    .subscribe((data: SpecialHour) => this.specialHours.push(data));
                break;
            }
            case "unSelect": {
                this.dataService.getSpecialHour(true, this.selectedWorkerId, selectedData.data).subscribe((data: SpecialHour) => {
                    this.selectedHour = data;
                    this.dataService.deleteSpecialHour(this.selectedHour.id).subscribe((data) => console.log(data));
                }); 
            }
        }
     
    }

}
