import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Group } from './group';
import { DefaultSlots } from './defaultSlots'
import { NgbdModalStacked } from './modalWindow.component';



@Component({
    templateUrl: '../html/editDefaultSlots.component.html',
    styleUrls: ['../css/editWorker.css'],
    providers: [DataService, NgbdModalStacked]
})
export class EditDefaultSlotsComponent implements OnInit {

    defaultHourSettings: DefaultSlots[] = [];
    selectedHourSettings: DefaultSlots = new DefaultSlots();
    selectedHourSettingsId: number;
    isDisableSettings: boolean = true;

    constructor(private dataService: DataService, private modal: NgbdModalStacked) { }

    ngOnInit() {
        this.loadDefaultSlots();
    }

    loadDefaultSlots() {
        this.dataService.getDefaultSlots().subscribe((data: DefaultSlots[]) => {
            this.defaultHourSettings = data;
            //this.workers.sort(this.compare);
            console.log(this.defaultHourSettings)
        });
    }

    cancel() {
        this.selectedHourSettings = new DefaultSlots();
    }

    isAllInfoEntered() {
        return ((!this.selectedHourSettings.name) || (!this.selectedHourSettings.minCount)) ? false : true;
    }

    saveHoursettings() {
        var isErrorWhenSaving: boolean = false;
        if (this.isAllInfoEntered()) {
            this.saveChanges();
        }
        else {
            isErrorWhenSaving = true;
        }
        this.modal.open(isErrorWhenSaving);
    }

    saveChanges() {

        if (!this.selectedHourSettings.id) {
            this.dataService.createDefaultSlots(this.selectedHourSettings)
                .subscribe((data: Group) => {
                    this.defaultHourSettings.push(data);
                });
        } else {
            this.dataService.createDefaultSlots(this.selectedHourSettings)
                .subscribe(data => this.loadDefaultSlots());
        }
    }

    changeHourSettings() {
        this.cancel();
        this.selectedHourSettings = this.defaultHourSettings.find(x => x.id == this.selectedHourSettingsId);
        this.isDisableSettings = false;
    }

    createNewHourSettings() {
        this.isDisableSettings = false;
        this.cancel();
    }

    deleteHourSettings() {
        this.dataService.deleteDefaultSlot(this.selectedHourSettings.id).subscribe(data => this.loadDefaultSlots());
        this.cancel();
    }

}