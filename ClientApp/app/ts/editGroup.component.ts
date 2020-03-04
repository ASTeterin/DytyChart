import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Group } from './group';
import { NgbdModalStacked } from './modalWindow.component';



@Component({
    templateUrl: '../html/editGroup.component.html',
    styleUrls: ['../css/editWorker.css'],
    providers: [DataService, NgbdModalStacked]
})
export class EditGroupComponent implements OnInit {

    groups: Group[] = [];
    selectedGroup: Group = new Group();
    selectedGroupId: number;
    isDisableSettings: boolean = true;

    constructor(private dataService: DataService, private modal: NgbdModalStacked) { }

    ngOnInit() {
        this.loadGroups();
    }

    loadGroups() {
        this.dataService.getGroups().subscribe((data: Group[]) => {
            this.groups = data;
            //this.workers.sort(this.compare);
            console.log(this.groups)
        });
    }

    cancel() {
        this.selectedGroup = new Group();
    }

    isAllInfoEntered() {
        return ((!this.selectedGroup.name) || (!this.selectedGroup.numberDutyHours)) ? false : true;
    }

    saveGroup() {
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

        if (!this.selectedGroup.id) {
            this.dataService.createGroup(this.selectedGroup)
                .subscribe((data: Group) => {
                    this.groups.push(data);
                });
        } else {
            this.dataService.updateGroup(this.selectedGroup)
                .subscribe(data => this.loadGroups());
        }
    }

    changeGroup() {
        this.cancel();
        this.selectedGroup = this.groups.find(x => x.id == this.selectedGroupId);
        this.isDisableSettings = false;
    }

    createNewGroup() {
        this.isDisableSettings = false;
        this.cancel();
    }

    deleteGroup() {
        this.dataService.deleteGroup(this.selectedGroup.id).subscribe(data => this.loadGroups());
        this.cancel();
    }

}